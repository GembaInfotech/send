const ParkingModel = require('../../models/parking.model');
const BookingModel = require('../../models/booking.model');

exports.letsParkAgain = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await BookingModel.find({ user: userId })
      .sort({ createdAt: -1 }) 
      .select('parking');
    const parkingIdsSet = new Set();
    const recentParkingIds = bookings
      .filter(booking => {
        const parkingId = booking.parking.toString();
        if (!parkingIdsSet.has(parkingId)) {
          parkingIdsSet.add(parkingId); 
          return true;
        }
        return false;
      })
      .slice(0, 5) 
      .map(booking => booking.parking); 
    const parkings = await ParkingModel.find({ _id: { $in: recentParkingIds } });

    const sortedParkings = recentParkingIds.map(parkingId =>
      parkings.find(parking => parking._id.toString() === parkingId.toString())
    );

    res.status(200).json({
      success: true,
      data: sortedParkings, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parking data',
      error: error.message,
    });
  }
};
