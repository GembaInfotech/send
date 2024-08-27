'use strict';
const router = require("express").Router();
  const activateAccountController = require("../controllers/activateAccount.controller")
router.route('/activate-account/:token').get(activateAccountController.activate_account);
module.exports =router