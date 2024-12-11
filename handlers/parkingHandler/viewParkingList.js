
const ParkingModel = require('../../models/parking.model')
const BookingModel = require("../../models/booking.model")
exports.viewParkingList = async (req, res) => {
  try {
    console.log("gdhjf", req.query)
    const { latitude } = req.query
    const { longitude } = req.query
    const { outTime } = req.query
    const { inTime } = req.query
    const inDate = inTime.split("T")[0]
    console.log("inDate", inDate);
    console.log(inTime);
    const outDate = outTime.split("T")[0]
    console.log(outDate);
    console.log(outTime);

    let parkings = await ParkingModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 8000
        }
      },
      validity_ToDate: { $gte: outDate },
      status: 'active'

    }).populate('vendor_id', 'firstName lastName communicationAddress.contact communicationAddress.email');


    console.log("parkings", parkings)
    
    if (!parkings.length) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    parkings = JSON.parse(JSON.stringify(parkings))
    for (let i = 0; i < parkings.length;) {
      const el = parkings[i];
      const countCar = await BookingModel.count({
        parking: el._id, // Matching the specific parking ID from the parking object
        inTime: { $lte: outTime },  // inTime should be greater than or equal to startTime
        outTime: { $gte: inTime },   // outTime should be less than or equal to endTime
        status: "Confirmed",
        vehicle_type: "four wheeler"
      });

      const countBike = await BookingModel.count({
        parking: el._id, // Matching the specific parking ID from the parking object
        inTime: { $lte: outTime },  // inTime should be greater than or equal to startTime
        outTime: { $gte: inTime },   // outTime should be less than or equal to endTime
        status: "Confirmed",
        vehicle_type: "two wheeler"
      });

      parkings[i]['bookingData'] = {
        countBike: countBike,
        countCar: countCar,
        inTime:inTime,
        outTime:outTime,
      };
      i++;

      if(i===parkings.length){
        console.log(parkings)
        return res.status(200).json({
          success: true,
          data: parkings
        });
      }
    }
  
    // parkings.forEach(async (parking, i) => {
    //   // Assuming startTime and endTime are defined and passed to the function
    //   console.log("Parking id: ",parking._id)
    //   console.log("Parking name: ",parking.name)
    //   console.log('...............')

    //   // Query the bookings collection for the parkingId and the time window
    //   console.log(`int time= ${inTime} and outTime is : ${outTime}`)
    //   const countCar = await BookingModel.count({
    //     parking: parking._id, // Matching the specific parking ID from the parking object
    //     inTime: { $lte: outTime },  // inTime should be greater than or equal to startTime
    //     outTime: { $gte: inTime },   // outTime should be less than or equal to endTime
    //     status: "Confirmed",
    //     vehicle_type: "four wheeler"
    //   });

    //   const countBike = await BookingModel.count({
    //     parking: parking._id, // Matching the specific parking ID from the parking object
    //     inTime: { $lte: outTime },  // inTime should be greater than or equal to startTime
    //     outTime: { $gte: inTime },   // outTime should be less than or equal to endTime
    //     status: "Confirmed",
    //     vehicle_type: "two wheeler"
    //   });

    //   // console.log("countCar for parking ID", parking._id, ": ", countCar);
    //   // console.log("countBike for parking ID", parking._id, ": ", countBike);

    //   let bookingData = {
    //     countBike: countBike,
    //     countCar: countCar,
    //     inTime:inTime,
    //     outTime:outTime,
    //   }
    //   parkings[i]['bookingData'] = bookingData;
    //   if(i === parkings.length - 1) {
    //     console.log(parkings)
    //     res.status(200).json({
    //       success: true,
    //       data: parkings
    //     });
    //   }
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parking data',
      error: error.message
    });
  }
};
