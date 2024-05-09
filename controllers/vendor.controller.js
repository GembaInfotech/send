const vendorModel = require('../models/vendor.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const vendorToken = require("../models/vendorToken.model")
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const duration = require("dayjs/plugin/duration");
const dayjs = require("dayjs");
dayjs.extend(duration);

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
    SIGN_IN_ATTEMPT: "Vendor attempting to sign in",
    SIGN_IN_ERROR: "Error occurred while signing in vendor: ",
    INCORRECT_EMAIL: "Incorrect email",
    INCORRECT_PASSWORD: "Incorrect password",
    DEVICE_BLOCKED: "Sign in attempt from blocked device",
    CONTEXT_DATA_VERIFY_ERROR: "Context data verification failed",
    MULTIPLE_ATTEMPT_WITHOUT_VERIFY:
      "Multiple sign in attempts detected without verifying identity.",
    LOGOUT_SUCCESS: "Vendor has logged out successfully",
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
      const existingVendor = await vendorModel.findOne({
        email: { $eq: email },
      });
      console.log(existingVendor);
      if (!existingVendor) {
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
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingVendor.password
      );

      console.log(isPasswordCorrect);
  
      if (!isPasswordCorrect) {
        await saveLogInfo(
          req,
          MESSAGE.INCORRECT_PASSWORD,
          LOG_TYPE.SIGN_IN,
          LEVEL.ERROR
        );
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
  
      const payload = {
        id: existingVendor._id,
        email: existingVendor.email,
      };

      console.log("testing...1");
  
      const accessToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "2m",
      });
  
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
      });
  
      try {
        const existingToken = await vendorToken.findOne({
          vendor: { $eq: existingVendor._id.toString() },
        });
  
        if (existingToken?.vendor) {
          await vendorToken.deleteOne({ _id: existingToken._id });
        }
      } catch (err) {
        console.error(err);
      }
  
      const newRefreshToken = new vendorToken({
        vendor: existingVendor._id,
        refreshToken,
        accessToken,
      });
      await newRefreshToken.save();
  
      res.status(200).json({
        accessToken,
        refreshToken,
        accessTokenUpdatedAt: new Date().toLocaleString(),
        vendor: {
          _id: existingVendor._id,
          name: existingVendor.name,
          email: existingVendor.email,
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

  const getVendor = async (req, res, next) => {
    try {
      const vendor = await vendorModel.findById(req.params.id).select("-password").lean();
  
     
  
   
      res.status(200).json(vendor);
    } catch (err) {
      next(err);
    }
  };


const addVendor = async (req, res, next) => {
    let newVendor;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    newVendor = new vendorModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
   
    });
    
    try {
      await newVendor.save();
      res.status(200).json({
       data:newVendor
      });
  
    } catch (err) {
      console.log(err)
      res.status(400).json({
        message: "Failed to add Vendor",
      });
    }
  };


 

  module.exports = {
    addVendor,
    signin,
    getVendor,
    logout
  };
