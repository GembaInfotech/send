const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  code:{
    type:String
  },
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
  
  parkingCode:String,
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
      transaction_id :String,
      order_id :String,
  paymentId:String,
  status: {
    type: String,
    enum: ["Pending","Incoming", "Parked", "Completed", "Confirmed"],
    default: "Confirmed",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
