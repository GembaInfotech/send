const Booking = require('../../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const {
      parkingid,
      inTime,
      outTime,
      status,
      vehicleNumber,
      parkingName,
      price,
      cgst,
      sgst,
      totalPrice
    } = req.body.bookingData;

    const newBooking = new Booking({
      parkingid,
      inTime,
      outTime,
      status,
      vehicleNumber,
      parkingName,
      price,
      cgst,
      sgst,
      totalPrice
    });

    // Save the booking
    const savedBooking = await newBooking.save();

    // Send response
    res.status(201).json({ booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

