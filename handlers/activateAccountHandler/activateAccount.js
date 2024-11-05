const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

exports.activateAccount = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(405).json({ message: "Invalid activation link or user does not exist." });
    }
    if (user.activationExpires < Date.now()) {
      return res.status(406).json({ message: "Activation token has expired. Please request a new activation link." });
    }
    if (user.isActivated) {
      return res.status(407).json({ message: "Account is already activated." });
    }

    user.isActivated = true;
    user.activationToken = undefined;
    user.activationExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Account activated successfully!" });
  } catch (error) {
    console.error('Error activating account:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Activation token has expired. Please request a new activation link." });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: "Invalid activation token. Please request a new activation link." });
    }

    res.status(400).json({ message: "Invalid or expired token." });
  }
};
