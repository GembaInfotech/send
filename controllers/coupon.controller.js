const Coupon = require('../models/CouponModel')

const applyCoupon = async (req, res) => {
  const { couponCode, parkingId, price } = req.body;
  const userId = req?.userId;
  console.log("req.body", req.body)
  try {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code.' });
    }
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTill) {
      return res.status(400).json({ message: 'Coupon has expired or is not valid yet.' });
    }
    let isApplicable = coupon.isGlobal || coupon.applicableParkings.includes(parkingId);
    if (!isApplicable) {
      return res.status(400).json({ message: 'Coupon is not valid for this parking.' });
    }

    const userUsage = coupon.usedBy.find((user) => user.userId.toString() === userId);
    if (userUsage && userUsage.usageCount >= coupon.usageLimitPerUser) {
      return res.status(400).json({ message: 'You have already used this coupon the maximum number of times.' });
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (price * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      discount = coupon.discountValue;
    }

    const finalPrice = Math.max(price - discount, 0);

    // if (userUsage) {
    //   userUsage.usageCount += 1;
    // } else {
    //   coupon.usedBy.push({ userId, usageCount: 1 });
    // }

    await coupon.save();
    console.log("result", finalPrice, discount)
    return res.json({
      message: 'Coupon applied successfully!',
      finalPrice,
      discount,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error applying coupon', error });
  }
};

const removeCoupon = async (req, res) => {
  const { couponCode, parkingId, price } = req.body;
  const userId = req?.userId;
  console.log("req.body", req.body);
  try {
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon code not found.' });
    }
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTill) {
      return res.status(400).json({ message: 'Coupon has expired or is not valid yet.' });
    }
    let isApplicable = coupon.isGlobal || coupon.applicableParkings.includes(parkingId);
    if (!isApplicable) {
      return res.status(400).json({ message: 'Coupon is not valid for this parking.' });
    }
    const userUsageIndex = coupon.usedBy.findIndex((user) => user.userId.toString() === userId);
    if (userUsageIndex === -1) {
      return res.status(400).json({ message: 'Coupon was not used by this user.' });
    }
    const userUsage = coupon.usedBy[userUsageIndex];
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (price * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      discount = coupon.discountValue;
    }
    const finalPrice = price + discount;  
    if (userUsage.usageCount > 1) {
      userUsage.usageCount -= 1;
    } else {
      coupon.usedBy.splice(userUsageIndex, 1); 
    }
    await coupon.save();
    console.log("result", finalPrice, discount);
    return res.json({
      message: 'Coupon removed successfully!',
      finalPrice,
      discount,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error removing coupon', error });
  }
};

module.exports = {
  applyCoupon,
  removeCoupon,
};