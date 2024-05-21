const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: String
  },
  parking: {
    type: String 
  },
  parkingName:{
    type:String
  },
  inTime: {
    type: String,
  },
  outTime: {
    type: String,
  },
  actualInTime:String,
  actualOutTime:String,
  duration:Number,
  actualDuration:Number,
  BookingDate:String,
  exceedTime: Number,
  vehicleNumber: String,
  price: Number,
  cgst: Number,
  sgst: Number,
  exceedPrice: Number,
  exceedCGST:Number,
  exceedSGST:Number,
  exceedTotalPrice:Number,
  totalPrice: Number,
  bookingPrice:Number,
  vehicle_name:String,
      vehicle_number:String,
  paymentId:String,
  status: {
    type: String,
    enum: ["Pending","Incoming", "Parked", "Completed", "Confirmed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
