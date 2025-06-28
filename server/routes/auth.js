const express = require('express');
const router  = express.Router();
const { login, createGuestUser } = require('../controllers/authController');

// Mock login/signup via phone
router.post('/login', login);

// Create a guest user if needed
router.post('/guest', createGuestUser);

module.exports = router;
                                                                                                                                                                                                    