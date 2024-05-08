
const {viewBookingList} = require("../handlers/bookingHandler/viewBookingList")


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

exports.view_booking_list = async (req, res) => {
  try {
    await viewBookingList(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
