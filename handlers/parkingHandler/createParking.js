const ParkingModel = require("../../models/parking.model")

exports.createParking = async (req, res) => {
    try {
      let parkingData = req.body;
      console.log(req.body)
      parkingData["vendor_id"] = req.userId;
      // parkingData.vendorId = req.userId;

      const newParking = new ParkingModel(parkingData);
      const savedParking = await newParking.save();
      res.status(201).json({ success: true, message: 'Parking created successfully', parking: savedParking });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating parking', error: error.message });
    }
  };