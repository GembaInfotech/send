const Booking = require('../../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const user = req.userId;
   
    const {
      
      parking,
      parkingName,
      inTime,
      outTime,
      price,
      totalPrice,
      sgst,
      cgst,
      vehicle_name,
      vehicle_number
     
    
    
    } = req.body.bookingData;


    const newBooking = new Booking({
      user,
      parking,
    parkingName,
      inTime,
      outTime,
      price,
      totalPrice,
      sgst,
      cgst,
      vehicle_name,
      vehicle_number
    
   
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
