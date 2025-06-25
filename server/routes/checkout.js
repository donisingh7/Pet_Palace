// PET_PALACE/server/routes/checkout.js

const express = require('express');
const router  = express.Router();
const { checkout } = require('../controllers/orderController');

// POST /api/checkout → checkout()
router.post('/', checkout);

module.exports = router;
