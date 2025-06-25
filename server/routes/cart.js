// PET_PALACE/server/routes/cart.js

const express = require('express');
const router  = express.Router();
const { addToCart, getCart, clearCart } = require('../controllers/cartController');

// POST   /api/cart/add   → addToCart()
router.post('/add', addToCart);

// GET    /api/cart?userId=… → getCart()
router.get('/', getCart);

// POST   /api/cart/clear → clearCart()
router.post('/clear', clearCart);

module.exports = router;
