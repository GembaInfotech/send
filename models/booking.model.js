const mongoose = require("mongoose");

// Define booking schema
const bookingSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    // required: true
  },
  parkingid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking", // Reference to the Parking model
    required: true,
  },
  parkingName: {
    type: String,
  },
  inTime: {
    type: Date,
    // required: true
  },
  outTime: {
    type: Date,
    // required: true
  },
  exceedTime: Number,
  vehicleNumber: String,
  price: Number,
  cgst: Number,
  sgst: Number,
  exceedPrice: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ["Incoming", "Parked", "Completed"],
    default: "Incoming",
  },
});

// Create Booking model
module.exports = mongoose.model("Booking", bookingSchema);
