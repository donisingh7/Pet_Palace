const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  imageUrl:    { type: String },
  stockQty:    { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Product 
  || mongoose.model('Product', ProductSchema);
