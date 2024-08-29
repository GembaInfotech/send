const Booking = require('../../models/booking.model');

exports.viewBookingList = async (req, res) => {
  try {
    const user = req.userId;
    const { status, bookingId } = req.query;
    console.log(req.query)



//helloooxcvhjkjhgf


    console.log(`User ID: ${user}`);
    console.log(`Status Query: ${status}`);
    console.log(`Booking ID Query: ${bookingId}`);

    // Initialize filter
    const filter = { user: user };
    const validStatuses = ["Pending", "Incoming", "Parked", "Completed", "Confirmed", "Cancelled"];

    // Check if bookingId is provided
    if (bookingId) {
      // If bookingId is provided, filter by it
      filter._id = bookingId; // Ensure to include bookingId filter
    } else {
      // Only apply status filter if bookingId is not provided
      if (status) {
        const statusArray = Array.isArray(status) ? status : [status];
        filter.status = { $in: statusArray.filter(s => validStatuses.includes(s)) };
      }
    }

    // Fetch bookings based on the constructed filter
    const bookings = await Booking.find(filter)
      .populate({
        path: 'parking',
        model: 'ParkingModel',
        select: 'name location pincode address_line1 address_line2 city state country landmark mobile_no',
      })
      .populate({
        path: 'user',
        model: 'User',
        select: 'name email vehicle',
      })
      .populate({
        path: 'vendor',
        model: 'VendorModel',
        select: 'firstName lastName email communicationAddress.contact',
      })
      .exec();

    // Filter out vehicles based on vehicleId
    const filteredBookings = bookings.map(booking => {
      if (booking.vehicleId && booking.user && booking.user.vehicle) {
        const matchedVehicle = booking.user.vehicle.find(vehicle => 
          vehicle._id && vehicle._id.toString() === booking.vehicleId.toString()
        );
        return {
          ...booking.toObject(),
          vehicle: matchedVehicle || null, 
        };
      }
      return booking.toObject();
    });

    res.status(200).json({
      success: true,
      data: filteredBookings,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking data',
      error: error.message,
    });
  }
};

