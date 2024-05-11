const Booking = require('../../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const user = req.userId;
    console.log(user);
    const {
      
      parking,
      inTime,
      outTime,
      actualInTime,
      actualOutTime,
      duration,
      actualDuration,
      BookingDate,
      exceedTime,
      vehicleNumber,
      parkingName,
      price,
      cgst,
      sgst,
      exceedPrice,
      exceedCGST,
      exceedSGST,
      exceedTotalPrice,
      totalPrice,
      bookingPrice,
      paymentId,
      status
    } = req.body;

    const newBooking = new Booking({
      user,
      parking,
      parkingName,
      inTime,
      outTime,
      actualInTime,
      actualOutTime,
      duration,
      actualDuration,
      BookingDate,
      exceedTime,
      vehicleNumber,
      price,
      cgst,
      sgst,
      exceedPrice,
      exceedCGST,
      exceedSGST,
      exceedTotalPrice,
      totalPrice,
      bookingPrice,
      paymentId,
      status
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
