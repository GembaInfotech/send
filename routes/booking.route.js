'use strict';
const router = require("express").Router();

  const bookingController = require("../controllers/booking.controller")
  const decodeToken = require("../middlewares/auth/decodeToken");

  router.route('/view-booking-list').get(bookingController.view_booking_list);
  router.route('/create-new-booking').post(decodeToken,bookingController.create_new_booking);
  // router.route('/update-booking').put(decodeToken,bookingController.update_booking);
  module.exports =router