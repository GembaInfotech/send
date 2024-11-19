const forgetPassword = require("../../models/forgetPassword.model")
const User = require('../../models/user.model')
const crypto = require("crypto")
const log = require('../../middlewares/utils/log')
const response = require("../../middlewares/utils/responseHandle")
const { sendVerificationEmail } = require('../../middlewares/utils/nodeMailerr.js');
const {ForgotPasswordTemplate} = require('../../emailTemplate/ForgetPassword.js')

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            email: { $eq: email },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const forgetToken = crypto.randomBytes(20).toString('hex');
        await forgetPassword.create({ userId: user._id, email: email, token: forgetToken, verified: '0' });
        const resetUrl = "http://know2parking.com:4005/#/reset-password/" + forgetToken + "/";
        try {
            const customizedTemplate = ForgotPasswordTemplate
                .replace('%NAME%', user.name)
                .replace('%RESET_LINK%', resetUrl);
            sendVerificationEmail(user, customizedTemplate);
            return res.status(200).json({ message: 'Password reset email sent successfully' });
        } catch (error) {
            log.dev(error);
            return response.throw(202, "Something went please try again!", error, res)

        }
    } catch (error) {
        console.error('Error initiating password reset:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



