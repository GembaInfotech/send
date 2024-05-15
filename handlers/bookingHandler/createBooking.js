const Booking = require('../../models/booking.model');

exports.createBooking = async (req, res) => {
  try {
    const user = req.userId;
    console.log(req.body)
    console.log(user);
    const {
      
      parking,
      parkingName,
      inTime,
      outTime
     
    
    
    } = req.body.bookingData;
    console.log(outTime)

    const newBooking = new Booking({
      user,
      parking,
    parkingName,
      inTime,
      outTime
    
   
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
