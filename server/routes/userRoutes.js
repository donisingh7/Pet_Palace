// server/routes/userRoutes.js

const express = require('express');
const { claimReferral } = require('../controllers/userController');

const router = express.Router();

// Claim referral code and reward both users
router.post('/referral/claim', claimReferral);

module.exports = router;
