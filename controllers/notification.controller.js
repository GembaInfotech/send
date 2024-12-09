const FCMTokens = require('../models/FCMToken.model')
const Notification = require('../models/notification.model')
const admin = require("firebase-admin");

const saveFcmToekn = async (req, res) => {
  const { userId, fcmToken } = req.body;
  if (!userId || !fcmToken) return res.status(400).send("Missing fields");
  try {
    await FCMTokens.findOneAndUpdate(
      { token: fcmToken },
      { $set: { userId, token: fcmToken, createdAt: new Date() } },
      { upsert: true, new: true }
    );
    res.status(200).send("Token saved successfully");
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send("Invalid data provided");
    }
    console.error("Error saving FCM token:", error);
    res.status(500).send("Internal Server Error");
  }
};

const sendNotification = async (fcmToken, title, body, data = {}) => {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        ...data,
      },
      token: fcmToken,
    };

    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error("Failed to send notification");
  }
};

const createNotification = async (userId, title, body, type, data = {}) => {
  try {
    const notification = new Notification({
      userId,
      title,
      body,
      type,
      data,
    });
    await notification.save();
    console.log("Notification created:", notification);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

const getNotifications = async (req, res) => {
  try {
    console.log("userId", req?.userId)
    const userId = req?.userId;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    console.log("notifications", notifications)
    res.status(201).json({ message: true, notifications: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ message: false, mesg: "Notification ID is required" });
    }
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: false, mesg: "Notification not found" });
    }
    res.status(200).json({ message: true, mesg: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: false, mesg: "Internal Server Error" });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const userId = req?.userId;
    const result = await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: false, mesg: "No unread notifications found for this user" });
    }
    res.status(200).json({
      message: true,
      mesg: `${result.modifiedCount} notifications marked as read`,
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    res.status(500).json({ message: false, mesg: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ message: false, mesg: "Notification ID is required" });
    }
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      return res.status(404).json({ message: false, mesg: "Notification not found" });
    }
    res.status(200).json({ message: true, mesg: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: false, mesg: "Internal Server Error" });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req?.userId;
    const result = await Notification.deleteMany({ userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: false, mesg: "No notifications found for this user" });
    }
    res.status(200).json({
      message: true,
      mesg: `${result.deletedCount} notifications deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    res.status(500).json({ message: false, mesg: "Internal Server Error" });
  }
};

const sendAndSaveNotification = async (userId, title, body, type, data = {}, fcmToken) => {
  await createNotification(userId, title, body, type, data);
  if (fcmToken) {
    await sendNotification(fcmToken, title, body, '');
  }
};

module.exports = {
  saveFcmToekn,
  sendNotification,
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  sendAndSaveNotification,
};
