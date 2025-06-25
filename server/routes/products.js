// PET_PALACE/server/routes/products.js

const express = require('express');
const router  = express.Router();
const { getAllProducts } = require('../controllers/productController');

// GET /api/products → getAllProducts()
router.get('/', getAllProducts);

module.exports = router;
