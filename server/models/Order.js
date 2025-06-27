// server/models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user:              { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor:            { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null },
  items: [{
    product:         { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty:             { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true }
  }],
  subtotal:          { type: Number, required: true },
  discount:          { type: Number, required: true },
  total:             { type: Number, required: true },
  
  // 👇 New referral-related fields
  usedReferral:      { type: Boolean, default: false },
  referralUsedBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.models.Order 
  || mongoose.model('Order', OrderSchema);
