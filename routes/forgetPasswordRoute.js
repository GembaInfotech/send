'use strict';
const router = require("express").Router();
const passport = require("passport");

// const decodeToken = require("../middlewares/auth/decodeToken");
// const requireAuth = passport.authenticate("jwt", { session: false }, null);

// const vehicleController = require('../controllers/vehicle.controller')
const forgetPasswordController = require('../controllers/forgetPassword.controller')

router.route('/forgot-password').post(forgetPasswordController.forget_password);
router.route('/reset-password/:token').post(forgetPasswordController.reset_password_redirect);




module.exports =router