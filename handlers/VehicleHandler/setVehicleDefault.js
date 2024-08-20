const User = require('../../models/user.model');

exports.setVehicleDefault = async (req, res) => {
    // const userId = req.userId; 
    // const vehicleId = req.params.vehicleId; 
    // const { vehicle_name, vehicle_number, vehicle_type } = req.body;

    // try {
    //     // Find the user by their ID
    //     const user = await User.findOne({ _id: userId });
    //     if (!user) {
    //         return res.status(404).json({
    //             success: false,
    //             message: 'User not found',
    //             data: null,
    //         });
    //     }

    //     // Find the index of the vehicle to be updated
    //     const vehicleIndex = user.vehicle.findIndex(vehicle => vehicle._id == vehicleId);
    //     if (vehicleIndex === -1) {
    //         return res.status(404).json({
    //             success: false,
    //             message: 'Vehicle not found',
    //             data: null,
    //         });
    //     }

    //     // Update the vehicle's information
    //     user.vehicle[vehicleIndex].vehicle_name = vehicle_name.toUpperCase();
    //     user.vehicle[vehicleIndex].vehicle_number = vehicle_number.toUpperCase();
    //     user.vehicle[vehicleIndex].vehicle_type = vehicle_type;

    //     // Set all vehicles' isDefault to false, then set the selected one to true
    //     user.vehicle.forEach(vehicle => {
    //         vehicle.isDefault = vehicle._id == vehicleId;
    //     });

    //     // Save the updated user document
    //     await user.save();

    //     // Respond with success
    //     res.status(200).json({
    //         success: true,
    //         message: 'Vehicle set as default successfully',
    //         data: user.vehicle[vehicleIndex],
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'Internal server error',
    //         data: null,
    //     });
    // }
};
