const UserModel = require('../../models/user.model');

exports.createVehicle = async (req, res) => {
  const { vehicle } = req.body;
  const userId = req.userId;
  const { vehicle_name, vehicle_number, vehicle_type, isDefault } = vehicle;

  try {
    // Find the user by their ID
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    // Check if this is the first vehicle
    const isFirstVehicle = user.vehicle.length === 0;

    // If isDefault is true, make other vehicles non-default
    if (isDefault) {
      user.vehicle.forEach((v) => {
        v.isDefault = false;
      });
    }

    // Create the new vehicle
    const newVehicle = {
      vehicle_name: vehicle_name.toUpperCase(),
      vehicle_number: vehicle_number.toUpperCase(),
      vehicle_type,
      isDefault: isFirstVehicle ? true : isDefault || false, // Default to true if it's the first vehicle, otherwise use the provided value
    };

    // Add the new vehicle to the user's vehicle list
    user.vehicle.push(newVehicle);

    // Save the updated user document
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


