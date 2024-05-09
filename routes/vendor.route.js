'use strict';
const router = require("express").Router();
const vendorController = require("../controllers/vendor.controller")

router.route('/create-new-vendor').post(vendorController.addVendor);
// router.route('/update-vendor/:vendorId').put(vendorController.update_vendor); 
// router.route('/view-vendor-list').get(vendorController.view_vendor_list); 
// router.route('/delete-vendor/:vendorId').delete( vendorController.delete_vendor);
router.route('/vendor-login').post( vendorController.signin);
router.route('/get-vendor/:id').get(vendorController.getVendor);
router.post("/logout", vendorController.logout);

module.exports =router