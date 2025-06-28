const express = require('express');
const { claimReferral, updateProfile } = require('../controllers/userController');
const router = express.Router();

// Claim referral code
router.post('/referral/claim', claimReferral);

// Update user profile (add/edit)
router.put('/update-profile', updateProfile);

module.exports = router;
    