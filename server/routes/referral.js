// PET_PALACE/server/routes/referral.js

const express = require('express');
const router  = express.Router();
const { setReferral } = require('../controllers/referralController');

// POST /api/referral/set → setReferral()
router.post('/set', setReferral);

module.exports = router;
