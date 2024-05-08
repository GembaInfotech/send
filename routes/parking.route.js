'use strict';
const router = require("express").Router();

  const parkingController = require("../controllers/parking.controller")
  
//   router.route('/api/parking/view-parking-list').get(parkingController.view_Parking_list);
  router.route('/api/parking/create-new-parking').post(parkingController.create_new_parking);
  router.route('/search').get(parkingController.view_Parking_list);



  module.exports =router