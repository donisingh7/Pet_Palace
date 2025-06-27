// server/controllers/orderController.js

const mongoose = require('mongoose');
const User     = require('../models/User');
const Doctor   = require('../models/Doctor');
const Order    = require('../models/Order');

exports.checkout = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId } = req.body;
    // 1. User और cart details ले आओ
    const user = await User.findById(userId)
      .populate('cart.product referredBy')
      .session(session);

    // 2. Subtotal, discount, total compute करो
    let subtotal = 0;
    user.cart.forEach(item => {
      subtotal += item.qty * item.product.price;
    });
    const discount = user.referredBy ? subtotal * 0.10 : 0;
    const total = subtotal - discount;

    // 3. Order create करो
    const order = await Order.create([{
      user: user._id,
      doctor: user.referredBy?._id || null,
      items: user.cart.map(item => ({
        product: item.product._id,
        qty: item.qty,
        priceAtPurchase: item.product.price
      })),
      subtotal, discount, total
    }], { session });

    // 4. Doctor को reward दो
    if (user.referredBy) {
   await User.findByIdAndUpdate(
     user.referredBy,
     { $inc: { walletCoins: subtotal * 0.05 } },
     { session }
   );
 }

    // 5. User.cart clear करो
    await User.findByIdAndUpdate(userId, { cart: [] }, { session });

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
