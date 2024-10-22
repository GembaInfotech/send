"use strict";
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    unread: {
        type: Number,
        default: 1 // assuming unread notifications are represented as 1
    },
    type: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
