const Booking = require('../../models/booking.model');
const parkingModel = require('../../models/parking.model');
const vendorModel = require('../../models/vendor.model');
const { generateBookingCode } = require('../codeHandler/Code');

exports.createBooking = async (req, res) => {
  try {
    const userId = req?.userId;
    console.log("userId", userId);

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
    } = req.body.bookingData;

    const parkingDetails = await parkingModel.findById(parking);
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
      const savedBooking = await newBooking.save();
      const code = await generateBookingCode();
      savedBooking.code = code;
      await savedBooking.save();

      res.status(201).json({ message: true, bookingId: savedBooking._id });
    } catch (err) {
      console.error("Error saving booking:", err);
      return res.status(500).json({ error: "Error saving booking" });
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


