const { createParking } = require('../handlers/parkingHandler/createParking');
const {viewParkingList} = require("../handlers/parkingHandler/viewParkingList")

exports.view_Parking_list = async (req, res) => {
  try {
    await viewParkingList(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.create_new_parking = async (req, res) => {
    try {
      await createParking(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  