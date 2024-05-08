'use strict';
const router = require("express").Router();

  const bookingController = require("../controllers/booking.controller")

  router.route('/api/booking/view-booking-list').get(bookingController.view_booking_list);
  router.route('/api/booking/create-new-booking').post(bookingController.create_new_booking);
  module.exports =router