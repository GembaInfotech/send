const Coupon = require('../models/CouponModel')
const applyCoupon = async (req, res) => {
    const { couponCode, parkingId, totalPrice } = req.body;
    const userId = req?.userId;
  
    try {
      const coupon = await Coupon.findOne({ code: couponCode });
  
      if (!coupon) {
        return res.status(404).json({ message: 'Invalid coupon code.' });
      }
  
      // Check if the coupon is valid
      const now = new Date();
      if (now < coupon.validFrom || now > coupon.validTill) {
        return res.status(400).json({ message: 'Coupon has expired or is not valid yet.' });
      }
  
      // Check if the coupon is applicable to this parking
      let isApplicable = coupon.isGlobal || coupon.applicableParkings.includes(parkingId);
      if (!isApplicable) {
        return res.status(400).json({ message: 'Coupon is not valid for this parking.' });
      }
  
      // Check if the user has used this coupon
      const userUsage = coupon.usedBy.find((user) => user.userId.toString() === userId);
      if (userUsage && userUsage.usageCount >= coupon.usageLimitPerUser) {
        return res.status(400).json({ message: 'You have already used this coupon the maximum number of times.' });
      }
  
      // Calculate discount
      let discount = 0;
      if (coupon.discountType === 'percentage') {
        discount = (totalPrice * coupon.discountValue) / 100;
      } else if (coupon.discountType === 'fixed') {
        discount = coupon.discountValue;
      }
  
      // Ensure total price doesn’t go below zero
      const finalPrice = Math.max(totalPrice - discount, 0);
  
      // Update usage count for the user
      if (userUsage) {
        userUsage.usageCount += 1;
      } else {
        coupon.usedBy.push({ userId, usageCount: 1 });
      }
  
      await coupon.save();
  
      return res.json({
        message: 'Coupon applied successfully!',
        finalPrice,
        discount,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error applying coupon', error });
    }
  };
  
  module.exports = {
    applyCoupon,
  };