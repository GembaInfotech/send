const UserModel = require('../../models/user.model');

exports.deleteVehicle = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const vehicleId = req.params.vehicleId;
  console.log(vehicleId);

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    const vehicle = user.vehicle.find(vehicle => vehicle._id == vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Request. Vehicle not found',
        data: null,
      });
    }

    vehicle.isActive = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Vehicle marked as inactive successfully',
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while marking vehicle as inactive',
      data: null,
    });
  }
};

  