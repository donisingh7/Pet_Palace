// server/routes/orderRoutes.js

const express = require('express');
const { checkout } = require('../controllers/orderController');

const router = express.Router();

// Route to handle checkout and referral-based discounts
router.post('/checkout', checkout);

module.exports = router;
