'use strict';
const router = require("express").Router();

  const parkingController = require("../controllers/parking.controller")
  
  router.route('/api/v1/parking/view-parking-list').get(parkingController.view_Parking_list);
  module.exports =router