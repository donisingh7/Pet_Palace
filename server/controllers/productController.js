// server/controllers/productController.js

const Product = require('../models/Product');

// 3. सब products fetch करने वाला
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();  // सारे products ले आओ
    return res.status(200).json(products);
  } catch (err) {
    console.error('ProductController.getAllProducts error:', err);
    return res.status(500).json({ error: 'Fetching products failed' });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};