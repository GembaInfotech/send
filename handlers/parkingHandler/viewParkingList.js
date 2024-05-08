
const ParkingModel = require('../../models/parking.model')

exports.viewParkingList = async (req, res) => {
  try {
    console.log("testing...1");
    const parkings = await ParkingModel.find();
    console.log("testing...2",parkings);
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
