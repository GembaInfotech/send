

const {viewBookingList} = require("../handlers/bookingHandler/viewBookingList");
const {createBooking} = require('../handlers/bookingHandler/createBooking');
const {updateBooking} = require('../handlers/bookingHandler/updateBooking')
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

exports.create_new_booking = async (req, res) => {
    try {
      await createBooking(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.update_booking = async (req, res) => {
    try {
      await updateBooking(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
