const ParkingModel = require('../../models/parking.model')
const BookingModel = require('../../models/booking.model')
exports.getParkingByParkingId = async (req, res) => {
  try {
    console.log("req.body", req.query)
    const inTime = req.query.inT;
    const outTime = req.query.ouT;
    const {parkingId} = req.params; // Assuming the parking ID is passed in the URL params
    const parking = await ParkingModel.findOne({_id:parkingId});
    if (!parking) {
      return res.status(404).json({
        success: false,
        message: 'Parking not found'
      });
    }
    
    const countCar = await BookingModel.count({
      parking: parkingId, 
      inTime: { $lte: outTime }, 
      outTime: { $gte: inTime },   
      status: "Confirmed",
      vehicle_type: "four wheeler"
    });

    const countBike = await BookingModel.count({
      parking: parkingId, 
      inTime: { $lte: outTime },  
      outTime: { $gte: inTime },  
      status: "Confirmed",
      vehicle_type: "two wheeler"
    });

    parking.bookingData = {
      countBike: countBike,
      countCar: countCar,
      inTime: inTime,
      outTime: outTime,
    };
    res.status(200).json({
      success: true,
      data: parking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parking data',
      error: error.message
    });
  }
};
