const express = require('express');
const router  = express.Router();
const authController = require('../controllers/authController');
const { createGuestUser } = require('../controllers/authController');

// POST /api/auth/guest → createGuestUser()
router.post('/guest', createGuestUser);
router.post('/login', authController.login);

module.exports = router;
