// server/controllers/cartController.js

const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, qty } = req.body;

    // Validate कि product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // User's cart में item push करो
    await User.findByIdAndUpdate(userId, {
      $push: { cart: { product: productId, qty } }
    });

    return res.status(200).json({ message: 'Added to cart' });
  } catch (err) {
    console.error('CartController.addToCart error:', err);
    return res.status(500).json({ error: 'Add to cart failed' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    // Populate product details inside cart
    const user = await User.findById(userId).populate('cart.product');
    return res.status(200).json(user.cart);
  } catch (err) {
    console.error('CartController.getCart error:', err);
    return res.status(500).json({ error: 'Fetch cart failed' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndUpdate(userId, { cart: [] });
    return res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    console.error('CartController.clearCart error:', err);
    return res.status(500).json({ error: 'Clear cart failed' });
  }
};
