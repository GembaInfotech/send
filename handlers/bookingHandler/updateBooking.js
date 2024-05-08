const Booking = require('../../models/booking.model');

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the booking by ID and update it with the provided data
    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updateBooking;
