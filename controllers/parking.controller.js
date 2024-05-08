// commonController.js
const { createParking } = require('../handlers/parkingHandler/createParking');
// const {validateParking, handleValidationErrors} = require('../middlewares/parking/createParkingValidation')
const {viewParkingList} = require("../handlers/parkingHandler/viewParkingList")


// exports.create_new_parking = [ 
//   validateParking,
//   handleValidationErrors,
//   async (req, res) => {
//   try {

//     await createParking(req, res);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }];



// exports.handleUpdateParking = async (req, res) => {
//   try {
//     await updateParking(req, res);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.handleDeleteParking = async (req, res) => {
//   try {
//     await deleteParking(req, res);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

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
  