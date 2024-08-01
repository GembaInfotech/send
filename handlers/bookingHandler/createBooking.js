// const Booking = require('../../models/booking.model');
// const parkingModel = require('../../models/parking.model')
// const format = require('date-fns');
// const { generateBookingCode } = require('../codeHandler/Code');
// exports.createBooking = async (req, res) => {
//   try {
//     const user = req?.code;
//     // console.log(user)
//     // console.log(req.body.bookingData)
   
//     const {
      
//       parking,
//       parkingName,
//       inTime,
//       outTime,
//       price,
//       totalPrice,
//       sgst,
//       cgst,
//       vehicle_name,
//       vehicle_number,
//       vehicle_type,
//       transaction_id,
//       order_id,
//       parkingCode
     
    
    
//     } = req.body.bookingData;


//     const newBooking = new Booking({
//       user,
//       parking,
//     parkingName,
//     parkingCode,
//       inTime ,
//       outTime,
//       price,
//       totalPrice,
//       sgst,
//       cgst,
//       vehicle_name,
//       vehicle_number,
//       vehicle_type,
//       transaction_id,
//       order_id
    
   
//     });

//     // Save the booking
//     try{
//       const savedBooking = await newBooking.save();
//       const code = await generateBookingCode();
//       savedBooking.code = code;
//       await savedBooking.save();
//       console.log(savedBooking)
//     }
//     catch (err)
//     {
//        console.log(err)
//     }

//     // Send response
//     res.status(201).json({"message":true});
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };



const Booking = require('../../models/booking.model');
const parkingModel = require('../../models/parking.model');
const vendorModel = require('../../models/vendor.model');
const { generateBookingCode } = require('../codeHandler/Code');

exports.createBooking = async (req, res) => {
  try {
    const user = req?.code;
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
      vehicle_type,
      transaction_id,
      order_id,
      parkingCode
    } = req.body.bookingData;

    // Retrieve parking details using the parking ID
    const parkingDetails = await parkingModel.findById(parking);
    if (!parkingDetails) {
      return res.status(404).json({ error: "Parking not found" });
    }

    const vendorId = parkingDetails.vendor_id;
    const vendorDetails = await vendorModel.findById(vendorId);
    if (!vendorDetails) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    
    // Log the entire vendorDetails object to inspect its fields
    console.log('Vendor Details:', vendorDetails);
    console.log('Vendor ID:', vendorDetails._id);
    console.log('Vendor Code:', vendorDetails.code);

    // Create new booking instance
    const newBooking = new Booking({
      user,
      parking,
      parkingName: parkingDetails.name || parkingName,
      parkingCode: parkingDetails.code || parkingCode,
      vendor: vendorDetails._id,
      vendorCode: vendorDetails.code,
      vendorName: `${vendorDetails.firstName} ${vendorDetails.lastName}`,
      inTime,
      outTime,
      price,
      totalPrice,
      sgst,
      cgst,
      vehicle_name,
      vehicle_number,
      vehicle_type,
      transaction_id,
      order_id
    });

    // Generate booking code and save booking
    try {
      const savedBooking = await newBooking.save();
      const code = await generateBookingCode();
      savedBooking.code = code;
      await savedBooking.save();
      console.log(savedBooking);
    } catch (err) {
      console.error("Error saving booking:", err);
      return res.status(500).json({ error: "Error saving booking" });
    }

    // Send response
    res.status(201).json({ message: true });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


