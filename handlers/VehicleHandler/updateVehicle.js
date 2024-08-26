const User = require('../../models/user.model');

exports.updateVehicle = async (req, res) => {
  const userId = req.userId; 
  const vehicleId = req.params.vehicleId; 
  const { vehicle_name, vehicle_number, vehicle_type, isDefault } = req.body; // Include isDefault in the request body

  try {
    // Find the user by their ID
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    // Find the index of the vehicle to be updated
    const vehicleIndex = user.vehicle.findIndex(vehicle => vehicle._id == vehicleId);
    if (vehicleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found',
        data: null,
      });
    }

    // Update the vehicle's information if provided
    if (vehicle_name) user.vehicle[vehicleIndex].vehicle_name = vehicle_name.toUpperCase();
    if (vehicle_number) user.vehicle[vehicleIndex].vehicle_number = vehicle_number.toUpperCase();
    if (vehicle_type) user.vehicle[vehicleIndex].vehicle_type = vehicle_type;

    // Check if the isDefault flag is provided
    if (isDefault === true) {
      // Set all vehicles' isDefault to false, then set the selected one to true
      user.vehicle.forEach(vehicle => {
        vehicle.isDefault = vehicle._id == vehicleId;
      });
    }

    // Save the updated user document
    await user.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: isDefault === true ? 'Vehicle set as default successfully' : 'Vehicle updated successfully',
      data: user.vehicle[vehicleIndex],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};
