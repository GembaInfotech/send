'use strict';
const router = require("express").Router();
const passport = require("passport");

const decodeToken = require("../middlewares/auth/decodeToken");
// const requireAuth = passport.authenticate("jwt", { session: false }, null);

  const parkingController = require("../controllers/parking.controller")
  
//   router.route('/api/parking/view-parking-list').get(parkingController.view_Parking_list);
  router.route('/create-new-parking').post(decodeToken, parkingController.create_new_parking);
  // router.route('/create-new-parking').post(decodeToken, parkingController.create_new_parking);

  router.route('/search').get(parkingController.view_Parking_list);



  module.exports =router