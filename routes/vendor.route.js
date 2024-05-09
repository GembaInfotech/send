'use strict';
const router = require("express").Router();
// const passport = require("passport");

const vendorController = require("../controllers/vendor.controller")

router.route('/create-new-vendor').post(vendorController.create_new_vendor);
router.route('/update-vendor/:vendorId').put(vendorController.update_vendor); 
router.route('/view-vendor-list').get(vendorController.view_vendor_list); 
router.route('/delete-vendor/:vendorId').delete( vendorController.delete_vendor);



module.exports =router