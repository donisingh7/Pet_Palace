const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor:   { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null },
  items: [{
    product:         { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty:             { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true }
  }],
  subtotal: Number,
  discount: Number,
  total:    Number
}, { timestamps: true });

module.exports = mongoose.models.Order 
  || mongoose.model('Order', OrderSchema);
