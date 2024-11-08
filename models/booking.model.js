const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  code:{
    type:String
  },
  parking: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicleId: { type: mongoose.Schema.Types.ObjectId },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'VendorModel' },
  vehicle_type : String,
  inTime: {
    type: String,
  },

  outTime: {
    type: String,
  },
  cancelledAt:String,
  refundId:String,
  actualInTime:String,
  actualOutTime:String,
  duration:Number,
  actualDuration:Number,
  BookingDate:String,
  exceedTime: Number,

  price: Number,
  cgst: Number,
  sgst: Number,
  exceedPrice: Number,
  exceedCGST:Number,
  exceedSGST:Number,
  exceedTotalPrice:Number,
  totalPrice: Number,
  bookingPrice:Number,
  
      transaction_id :String,
      order_id :String,
  paymentId:String,
  status: {
    type: String,
    enum: ["Pending","Incoming", "Parked", "Completed", "Confirmed", "Cancelled"],
    default: "Confirmed",
  },

},
{timestamps:true});

module.exports = mongoose.model("Booking", bookingSchema);
