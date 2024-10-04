const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const Post = require("../models/post.model");
const Community = require("../models/community.model");
const UserPreference = require("../models/preference.model");
const formatCreatedAt = require("../utils/timeConverter");
const { verifyContextData, types } = require("./auth.controller");
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const duration = require("dayjs/plugin/duration");
const dayjs = require("dayjs");
const path = require('path');
const { generateUserCode } = require("../handlers/codeHandler/Code");
dayjs.extend(duration);
const nodemailer = require('nodemailer')

const LOG_TYPE = {
  SIGN_IN: "sign in",
  LOGOUT: "logout",
};

const LEVEL = {
  INFO: "info",
  ERROR: "error",
  WARN: "warn",
};

const MESSAGE = {
  SIGN_IN_ATTEMPT: "User attempting to sign in",
  SIGN_IN_ERROR: "Error occurred while signing in user: ",
  INCORRECT_EMAIL: "Incorrect email",
  INCORRECT_PASSWORD: "Incorrect password",
  DEVICE_BLOCKED: "Sign in attempt from blocked device",
  CONTEXT_DATA_VERIFY_ERROR: "Context data verification failed",
  MULTIPLE_ATTEMPT_WITHOUT_VERIFY:
    "Multiple sign in attempts detected without verifying identity.",
  LOGOUT_SUCCESS: "User has logged out successfully",
};

const signin = async (req, res, next) => {
  await saveLogInfo(
    req,
    MESSAGE.SIGN_IN_ATTEMPT,
    LOG_TYPE.SIGN_IN,
    LEVEL.INFO
  );

  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(email, 'i') },
    });

    
    
    if (!existingUser) {
      await saveLogInfo(
        req,
        MESSAGE.INCORRECT_EMAIL,
        LOG_TYPE.SIGN_IN,
        LEVEL.ERROR
      );

      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    // Check if the account is activated
    if (!existingUser.isActivated) {
      await saveLogInfo(
        req,
        "Account not activated",
        LOG_TYPE.SIGN_IN,
        LEVEL.ERROR
      );

      return res.status(403).json({
        message: "Account not activated. Please check your email to activate your account.",
      });
    }

    // const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    // if (!isPasswordCorrect) {
    //   await saveLogInfo(
    //     req,
    //     MESSAGE.INCORRECT_PASSWORD,
    //     LOG_TYPE.SIGN_IN,
    //     LEVEL.ERROR
    //   );

    //   return res.status(400).json({
    //     message: "Invalid credentials",
    //   });
    // }

    const isContextAuthEnabled = await UserPreference.findOne({
      user: existingUser._id,
      enableContextBasedAuth: true,
    });

    if (isContextAuthEnabled) {
      const contextDataResult = await verifyContextData(req, existingUser);

      if (contextDataResult === types.BLOCKED) {
        await saveLogInfo(
          req,
          MESSAGE.DEVICE_BLOCKED,
          LOG_TYPE.SIGN_IN,
          LEVEL.WARN
        );

        return res.status(401).json({
          message: "You've been blocked due to suspicious login activity. Please contact support for assistance.",
        });
      }

      if (contextDataResult === types.NO_CONTEXT_DATA || contextDataResult === types.ERROR) {
        await saveLogInfo(
          req,
          MESSAGE.CONTEXT_DATA_VERIFY_ERROR,
          LOG_TYPE.SIGN_IN,
          LEVEL.ERROR
        );

        return res.status(500).json({
          message: "Error occurred while verifying context data",
        });
      }

      if (contextDataResult === types.SUSPICIOUS) {
        await saveLogInfo(
          req,
          MESSAGE.MULTIPLE_ATTEMPT_WITHOUT_VERIFY,
          LOG_TYPE.SIGN_IN,
          LEVEL.WARN
        );
        return res.status(401).json({
          message: `You've temporarily been blocked due to suspicious login activity. We have already sent a verification email to your registered email address. 
          Please follow the instructions in the email to verify your identity and gain access to your account.

          Please note that repeated attempts to log in without verifying your identity will result in this device being permanently blocked from accessing your account.
          
          Thank you for your cooperation`,
        });
      }

      if (contextDataResult.mismatchedProps) {
        const mismatchedProps = contextDataResult.mismatchedProps;
        const currentContextData = contextDataResult.currentContextData;
        if (
          mismatchedProps.some((prop) =>
            [
              "ip",
              "country",
              "city",
              "device",
              "deviceLOG_TYPE",
              "os",
              "platform",
              "browser",
            ].includes(prop)
          )
        ) {
          req.mismatchedProps = mismatchedProps;
          req.currentContextData = currentContextData;
          req.user = existingUser;
          return next();
        }
      }
    }

    try {
      const existingToken = await Token.findOne({
        user: { $eq: existingUser._id.toString() },
      });
      if (existingToken?.user) {
        await Token.deleteOne({ _id: existingToken._id });
      }
    } catch (err) {
      res.json({
        success: "false",
        err: err,
      });
    }

    const payload = {
      id: existingUser._id,
      code: existingUser?.code,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });
    const newRefreshToken = new Token({
      user: existingUser._id,
      refreshToken,
      accessToken,
    });
    await newRefreshToken.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar,
      },
    });
  } catch (err) {
    await saveLogInfo(
      req,
      MESSAGE.SIGN_IN_ERROR + err.message,
      LOG_TYPE.SIGN_IN,
      LEVEL.ERROR
    );

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


/**
 * Retrieves a user's profile information, including their total number of posts,
 * the number of communities they are in, the number of communities they have posted in,
 * and their duration on the platform.

 * @param req - Express request object
 * @param res - Express response object
 * @param {Function} next - Express next function
 * 
 * 
 * 
 */



const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    const totalPosts = await Post.countDocuments({ user: user._id });

    const communities = await Community.find({ members: user._id });
    const totalCommunities = communities.length;

    const postCommunities = await Post.find({ user: user._id }).distinct(
      "community"
    );
    const totalPostCommunities = postCommunities.length;

    const createdAt = dayjs(user.createdAt);
    const now = dayjs();
    const durationObj = dayjs.duration(now.diff(createdAt));
    const durationMinutes = durationObj.asMinutes();
    const durationHours = durationObj.asHours();
    const durationDays = durationObj.asDays();

    user.totalPosts = totalPosts;
    user.totalCommunities = totalCommunities;
    user.totalPostCommunities = totalPostCommunities;
    user.duration = "";

    if (durationMinutes < 60) {
      user.duration = `${Math.floor(durationMinutes)} minutes`;
    } else if (durationHours < 24) {
      user.duration = `${Math.floor(durationHours)} hours`;
    } else if (durationDays < 365) {
      user.duration = `${Math.floor(durationDays)} days`;
    } else {
      const durationYears = Math.floor(durationDays / 365);
      user.duration = `${durationYears} years`;
    }
    const posts = await Post.find({ user: user._id })
      .populate("community", "name members")
      .limit(20)
      .lean()
      .sort({ createdAt: -1 });

    user.posts = posts.map((post) => ({
      ...post,
      isMember: post.community?.members
        .map((member) => member.toString())
        .includes(user._id.toString()),
      createdAt: formatCreatedAt(post.createdAt),
    }));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * Adds a new user to the database with the given name, email, password, and avatar.
 *
 * @description If the email domain of the user's email is "mod.Parkar.com", the user will be
 * assigned the role of "moderator" by default, but not necessarily as a moderator of any community.
 * Otherwise, the user will be assigned the role of "general" user.
 *
 * @param {Object} req.files - The files attached to the request object (for avatar).
 * @param {string} req.body.isConsentGiven - Indicates whether the user has given consent to enable context based auth.
 * @param {Function} next - The next middleware function to call if consent is given by the user to enable context based auth.
 * 
 * 
 */

const addUser = async (req, res) => {
  try {
    if (!req.body.isConsentGiven) {
      return res.status(400).json({
        message: "Your consent for the signup is mandatory.",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const code = await generateUserCode();
      
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      code:code
    });

    const savedUser = await newUser.save();
    
    if (!savedUser) {
      throw new Error("Failed to add user");
    }

    const activationToken = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.SECRET,
      { expiresIn: "1d" }  // Token valid for 1 day
    );
    savedUser.activationToken = activationToken
    savedUser.activationExpires = Date.now() + 3600000
    await savedUser.save()
    const activationLink = `http://vistaerp.gembainfotech.com:4005/activate/activate-account/${activationToken}`;

    // Send the activation email
    await sendActivationEmail(savedUser.email, activationLink);

    res.status(201).json({
      message: "User added successfully. Please check your email to activate your account.",
    });
  } catch (err) {
    console.error('Error during user addition:', err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

const sendActivationEmail = async (email, link) => {
  // Add your email sending logic here
  // For example, using Nodemailer:
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "prashantrana9516@gmail.com",
      pass: "qqjsatrjwvbynknu",
    },
  });

  const mailOptions = {
    from: "prashantrana9516@gmail.com",
    to: email,
    subject: 'Activate Your Account',
    html: `<p>Please click the following link to activate your account:</p><a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

 const UploadUserProfile = async(req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file.' });
  }

  const profileType = req.body.profileType || 'user'; // Default to 'vendor' if not provided
  let folder = '';

  if (profileType === 'user') {
      folder = 'UserProfileImg';
  } else if (profileType === 'vendor') {
      folder = 'VendorProfileImg';
  } else {
      return res.status(400).send({ message: 'Invalid profile type.' });
  }

  res.send({
      message: 'File uploaded successfully!',
      fileName: req.file.filename,
      filePath: path.join('ProfileImage', folder, req.file.filename)
  });
};


const changePassword = async (req, res) => {
  try {
    const userId = req.userId; // Assume `userId` is set in `req` by some middleware
    const { currentPassword, newPassword } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user with the new password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.headers.authorization?.split(" ")[1] ?? null;
    console.log(req.headers.authorization)
    if (refreshToken) {
      await Token.deleteOne({ refreshToken });
      await saveLogInfo(
        null,
        MESSAGE.LOGOUT_SUCCESS,
        LOG_TYPE.LOGOUT,
        LEVEL.INFO
      );
    }
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    await saveLogInfo(null, err.message, LOG_TYPE.LOGOUT, LEVEL.ERROR);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const existingToken = await Token.findOne({
      refreshToken: { $eq: refreshToken },
    });
    if (!existingToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
    const existingUser = await User.findById(existingToken.user);
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return res.status(401).json({
        message: "Expired refresh token",
      });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route GET /users/moderator
 */
const getModProfile = async (req, res) => {
  try {
    const moderator = await User.findById(req.userId);
    if (!moderator) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const moderatorInfo = {
      ...moderator._doc,
    };
    delete moderatorInfo.password;
    moderatorInfo.createdAt = moderatorInfo.createdAt.toLocaleString();

    res.status(200).json({
      moderatorInfo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @route PUT /users/:id
 */
const updateInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, contact, address, city, pincode, state, country, licence_no } = req.body;

    user.name = name;
    user.contact = contact;
    user.address = address;
    user.city = city;
    user.pincode = pincode;
    user.state = state;
    user.country = country;
    user.licence_no = licence_no;



    await user.save();

    res.status(200).json({
      message: "User info updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user info",
    });
  }
};

module.exports = {
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
  UploadUserProfile, 
  changePassword,
};
