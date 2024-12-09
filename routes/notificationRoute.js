'use strict';
const router = require("express").Router();
const decodeToken = require("../middlewares/auth/decodeToken");
const notificationController = require("../controllers/notification.controller");

router.route('/save-fcm-token').post(notificationController.saveFcmToekn);
router.route('/send-notification').post(notificationController.sendNotification);
router.route('/get-notification').get(decodeToken, notificationController.getNotifications);
router.route('/marked-as-read').post(decodeToken, notificationController.markAsRead);
router.route('/marked-all-as-read').post(decodeToken, notificationController.markAllAsRead);
router.route('/delete-notification').post(decodeToken, notificationController.deleteNotification);
router.route('/delete-all-notifications').post(decodeToken, notificationController.deleteAllNotifications);

module.exports = router;