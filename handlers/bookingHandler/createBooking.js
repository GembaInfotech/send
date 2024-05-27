const Booking = require('../../models/booking.model');
const format = require('date-fns')
exports.createBooking = async (req, res) => {
  try {
    const user = req.userId;
    console.log(req.body.bookingData)
   
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
      vehicle_number,
      transaction_id,
      order_id
     
    
    
    } = req.body.bookingData;


    const newBooking = new Booking({
      user,
      parking,
    parkingName,
      inTime ,
      outTime,
      price,
      totalPrice,
      sgst,
      cgst,
      vehicle_name,
      vehicle_number,
      transaction_id,
      order_id
    
   
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
