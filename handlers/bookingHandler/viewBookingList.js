const Booking = require('../../models/booking.model');

exports.viewBookingList = async (req, res) => {
  try {
    const user = req.userId;
    console.log(`User ID: ${user}`);

    const bookings = await Booking.find({ user: user })
      .populate({
        path: 'parking',
        model: 'ParkingModel',
        select: 'name location',
      })
      .populate({
        path: 'user',
        model: 'User',
        select: 'name email vehicle',
      })
      .populate({
        path: 'vendor',
        model: 'VendorModel',
        select: 'firstName lastName email',
      })
      .exec();

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
