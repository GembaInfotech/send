const Booking = require('../../models/booking.model');
const parkingModel = require('../../models/parking.model');
const vendorModel = require('../../models/vendor.model');
const FCMTokens= require('../../models/FCMToken.model')
const { generateBookingCode } = require('../codeHandler/Code');
const {sendAndSaveNotification} = require('../../controllers/notification.controller')

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
      vehicle_type,
    } = req.body.bookingData;

    console.log("vehicle_type", vehicle_type)

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
      vehicle_type,
    });

    try {
      const savedBooking = await newBooking.save();
      const code = await generateBookingCode();
      savedBooking.code = code;
      await savedBooking.save();
      // await fetch("http://localhost:4005/send-notification", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     userId,
      //     title: "Booking Confirmed",
      //     body: `Your booking for ${parkingDetails.name} is confirmed!`,
      //   }),
      // });
      const tokens = await FCMTokens.find({ userId }).select("token");
	    const tokenList = tokens.map((token) => token.token);

      sendAndSaveNotification(userId, "Booking Confirmed",`Your booking for ${parkingDetails.name} has been confirmed.`, "booking_confirmed", { bookingId: savedBooking._id, description:"description" }, tokenList[1])

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


