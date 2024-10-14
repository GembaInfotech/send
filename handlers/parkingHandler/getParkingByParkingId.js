const ParkingModel = require('../../models/parking.model')
const Booking = require('../../models/booking.model')

exports.getParkingByParkingId = async (req, res) => {
  try {
    const { parkingId } = req.params; // Assuming the parking ID is passed in the URL params
    console.log(req.query);
    let available = 0;
    const parking = await ParkingModel.findOne({ _id: parkingId });
    if (!parking) {
      return res.status(404).json({
        success: false,
        message: 'Parking not found'
      });
    }
    parking.persistTotalCapacity = 29;
    await parking.save();
    console.log("heoolo");


    try {



      const startOfDay = new Date();

      const int = '2024-10-15T02:00'   // need to be replaced by query parameter
      const out = '2024-10-15T04:00'  // need to be replaced by query parameter

      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const currentTime = new Date();

      const results = await Booking.find({
        parking: parkingId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
        inTime: { $gte: int },





      });
      console.log(" dffds", results.length);
      if (results.length < parking.persistTotalCapacity) {
        available = parking.persistTotalCapacity - results.length;
      }




    }
    catch (err) {
      console.log(err);

    }

    res.status(200).json({
      success: true,
      data: parking,
      available: available
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parking data',
      error: error.message
    });
  }
};
