const Notification = require("../models/notification")
const { getSocket } = require("../utils/socket");

const socketTest = async (req, res) => {
  try {
    const chatSocket = getSocket();
    chatSocket.emit("new-msg", {
      to: "req.userId"
    })
    // const notification = new Notification({
    //     user: "66cdc27b742428e3703a6fbc",
    //     subject: "Test",
    //     body: "This is a test notification.",
    //     unread: 1,
    //     type: "xyz"
    //   });
    // await notification.save().then(() => [
    //   chatSocket.emit("new-msg", {
    //     to: req.userId
    //   })
    // ])
    res.status(200).json({ success: true, msg: "notification sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = socketTest;
