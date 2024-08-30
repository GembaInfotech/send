const Booking = require('../../models/booking.model');

exports.viewBookingList = async (req, res) => {
  try {
    const user = req.userId;
    const { status, bookingId, page = 1, limit = 10 } = req.query; // Default page is 1, limit is 10
    const filter = { user: user };
    const validStatuses = ["Pending", "Incoming", "Parked", "Completed", "Confirmed", "Cancelled"];
    
    if (bookingId) {
      filter._id = bookingId; 
    } else if (status) {
      const statusArray = Array.isArray(status) ? status : [status];
      filter.status = { $in: statusArray.filter(s => validStatuses.includes(s)) };
    }

    const skip = (page - 1) * limit;

    const totalDocuments = await Booking.countDocuments(filter);

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
      .skip(skip)
      .limit(parseInt(limit))
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
      pagination: {
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
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


