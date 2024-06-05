
const {forgotPassword} = require('../handlers/passwordHandler/forgetPassword')
const {resetPasswordRedirect} = require("../handlers/passwordHandler/resetPasswordRedirect")
exports.forget_password = async (req, res) => {
  try {
    await forgotPassword(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.reset_password_redirect = async (req, res) => {
  try {
    await resetPasswordRedirect(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

