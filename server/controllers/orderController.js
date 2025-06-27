// server/controllers/orderController.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId, referralCode } = req.body;

    const user = await User.findById(userId)
      .populate('cart.product referredBy')
      .session(session);
    if (!user) throw new Error('User not found');

    const subtotal = user.cart.reduce(
      (sum, item) => sum + item.qty * item.product.price,
      0
    );

    let discount = 0;
    let referrer = null;
    if (referralCode && !user.referredBy) {
      referrer = await User.findOne({ referralCode }).session(session);
      if (referrer && !referrer._id.equals(user._id)) {
        user.referredBy = referrer._id;
        discount = subtotal * 0.10; // 10%
      }
    }

    const total = subtotal - discount;

    const order = await Order.create(
      [ {
        user: user._id,
        usedReferral: !!referrer,
        referralUsedBy: referrer ? referrer._id : null,
        items: user.cart.map(item => ({
          product: item.product._id,
          qty: item.qty,
          priceAtPurchase: item.product.price
        })),
        subtotal,
        discount,
        total,
      } ],
      { session }
    );

    if (referrer) {
      console.log('💰 Applying wallets, discount:', discount);
      await User.findByIdAndUpdate(
        user._id,
        { $inc: { walletCoins: discount } },
        { session }
      );
      await User.findByIdAndUpdate(
        referrer._id,
        { $inc: { walletCoins: discount } },
        { session }
      );
    }

    await User.findByIdAndUpdate(user._id, { cart: [] }, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ orderId: order[0]._id, total });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('OrderController.checkout error:', err);
    return res.status(500).json({ error: err.message || 'Checkout failed' });
  }
};
