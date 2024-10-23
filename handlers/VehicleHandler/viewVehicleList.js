const User = require('../../models/user.model');
exports.viewVehicleList = async (req, res) => {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 vehicles per page
    const skip = (page - 1) * limit; // Calculate how many vehicles to skip

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
            });
        }

        // Filter the active vehicles
        const vehicleList = user.vehicle.filter(vehicle => vehicle.isActive !== false);

        // Paginate the vehicle list
        const paginatedVehicles = vehicleList.slice(skip, skip + limit);
        
        // Send the full vehicle list and pagination info in the response
        res.status(200).json({
            success: true,
            message: 'Vehicle list retrieved successfully',
            data:{
                vehicleList: paginatedVehicles, // Only send the paginated vehicles
                total: vehicleList.length,        // Total number of vehicles
                page,
                limit,
            },
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
