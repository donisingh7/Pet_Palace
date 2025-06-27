// PET_PALACE/server/routes/products.js
const { getAllProducts, getProductById } = require('../controllers/productController');
const express = require('express');
const router  = express.Router();


// GET /api/products → getAllProducts()
router.get('/', getAllProducts);
router.get('/:id', getProductById);
module.exports = router;
