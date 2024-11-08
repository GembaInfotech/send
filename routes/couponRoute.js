'use strict';
const router = require("express").Router();

const decodeToken = require("../middlewares/auth/decodeToken");
const couponController = require('../controllers/coupon.controller')

router.route('/applyCoupon').post( decodeToken,  couponController.applyCoupon);

module.exports = router