'use strict';
const router = require("express").Router();

  const bookingController = require("../controllers/booking.controller")
  
  router.route('/api/v1/booking/view-booking-list').get(bookingController.view_booking_list);
  module.exports =router