'use strict';
const router = require("express").Router();
const passport = require("passport");

const decodeToken = require("../middlewares/auth/decodeToken");

  const parkingController = require("../controllers/parking.controller")
  
  router.route('/create-new-parking').post(decodeToken, parkingController.create_new_parking);
  router.route('/get-vendor-parkings').get(decodeToken, parkingController.get_vendor_parkings);
  router.route('/search').get(parkingController.view_Parking_list);
  router.route('/get-parking/:parkingId').get(parkingController.get_parking_by_parkingId);
  router.route('/update-parking/:parking_id').put(decodeToken, parkingController.update_parking);
  router.route('/letsParkAgain').get(decodeToken, parkingController.lets_park_again)

  module.exports =router