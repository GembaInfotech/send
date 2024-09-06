const UserModel = require('../../models/user.model');

exports.createVehicle = async (req, res) => {
  const { vehicle } = req.body;
  const userId = req.userId;
  const { vehicle_name, vehicle_number, vehicle_type, isDefault } = vehicle;

  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    const isFirstVehicle = user.vehicle.length === 0;

    if (isDefault) {
      user.vehicle.forEach((v) => {
        v.isDefault = false;
      });
    }

    const newVehicle = {
      vehicle_name: vehicle_name.toUpperCase(),
      vehicle_number: vehicle_number.toUpperCase(),
      vehicle_type,
      isDefault: isFirstVehicle ? true : isDefault || false, 
    };

    user.vehicle.push(newVehicle);

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: newVehicle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while creating vehicle',
      data: null,
    });
  }
};


