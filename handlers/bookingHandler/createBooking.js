
const Booking = require('../../models/booking.model');
const parkingModel = require('../../models/parking.model');
const vendorModel = require('../../models/vendor.model');
const { generateBookingCode } = require('../codeHandler/Code');

exports.createBooking = async (req, res) => {
  try {
    const userId = req?.userId;

    const {
      parking,
      inTime,
      outTime,
      price,
      totalPrice,
      sgst,
      cgst,
      transaction_id,
      order_id,
      vehicle_id,
    } = req.body;

    // Check for available parking slot and decrement capacity atomically
    const parkingDetails = await parkingModel.findOneAndUpdate(
      { _id: parking, totalCapacity: { $gt: 0} }, // Ensure there's capacity
      { $inc: { totalCapacity: -1 } }, // Atomically decrement capacity
      { new: true } // Return the updated document
    );

    if (!parkingDetails) {
      return res.status(200).json({ msg: "No slots available" });
    }

    const vendorId = parkingDetails.vendor_id;
    const vendorDetails = await vendorModel.findById(vendorId);
    if (!vendorDetails) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const newBooking = new Booking({
      user: userId,
      parking,
      vendor: vendorId,
      vehicleId: vehicle_id,
      inTime,
      outTime,
      price,
      totalPrice,
      sgst,
      cgst,
      transaction_id,
      order_id,
    });

    try {
      const code = await generateBookingCode();
      newBooking.code = code;
      const savedBooking = await newBooking.save();
      
 console.log(parkingDetails.totalCapacity);
 
      res.status(201).json({ message: true, bookingId: savedBooking._id });
    } catch (err) {
      // If saving booking fails, we need to rollback the parking capacity manually
      await parkingModel.findByIdAndUpdate(parking, { $inc: { totalCapacity: 1 } });
      
      return res.status(500).json({ error: "Error saving booking" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



