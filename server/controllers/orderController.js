const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, referralCode } = req.body;

    // Fetch user & cart
    const user = await User.findById(userId)
      .populate('cart.product')
      .session(session);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find referrer
    const referrer = referralCode
      ? await User.findOne({ referralCode }).session(session)
      : null;

    const canUseReferral = referrer && !user.referredBy && !referrer._id.equals(user._id);

    // Calculate subtotal
    let subtotal = 0;
    user.cart.forEach(item => {
      subtotal += item.qty * item.product.price;
    });

    const discount = canUseReferral ? subtotal * 0.10 : 0;
    const total = subtotal - discount;

    // Apply referral
    if (canUseReferral) {
      user.referredBy = referrer._id;
      await user.save({ session });
    }

    // Create order
    const order = await Order.create(
      [
        {
          user: user._id,
          items: user.cart.map(it => ({
            product: it.product._id,
            qty: it.qty,
            priceAtPurchase: it.product.price
          })),
          subtotal,
          discount,
          total,
          usedReferral: canUseReferral,
          referralUsedBy: canUseReferral ? referrer._id : null
        }
      ],
      { session }
    );

    // Give coins: 10% to buyer, 10% to referrer
    if (canUseReferral) {
      const coinAmount = subtotal * 0.10;
      await User.findByIdAndUpdate(user._id, { $inc: { walletCoins: coinAmount } }, { session });
      await User.findByIdAndUpdate(referrer._id, { $inc: { walletCoins: coinAmount } }, { session });
    }

    // Clear cart
    await User.findByIdAndUpdate(user._id, { cart: [] }, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ orderId: order[0]._id, total });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('OrderController.checkout error:', err);
    return res.status(500).json({ error: 'Checkout failed' });
  }
};
