
const ParkingModel = require('../../models/parking.model')

exports.viewParkingList = async (req, res) => {
  try {
    const {latitude} = req.query
    const {longitude} =req.query
    const {outTime} = req.query
    const {inTime} = req.query
    const inDate = inTime.split("T")[0]
    console.log(inDate);
    console.log(inTime);
    const outDate = outTime.split("T")[0]
    console.log(outDate);
    console.log(outTime);
    const parkings = await ParkingModel.find({
        location: {
           $near: {
              $geometry: {
                 type: "Point",
                 coordinates: [   longitude ,latitude ]
              },
              $maxDistance : 8000
           }
        },
        validity_ToDate: { $gte: outDate },
        status: 'active'

     }).populate('vendor_id', 'firstName lastName communicationAddress.contact communicationAddress.email');

     console.log("data", parkings)

    res.status(200).json({
      success: true,
      data: parkings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parking data',
      error: error.message
    });
  }
};
