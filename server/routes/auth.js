// // server/routes/auth.js
// import express        from 'express';//import { registerUser, authUser } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/signup', registerUser);
// router.post('/login', authUser);

// export default router;
// PET_PALACE/server/routes/auth.js

const express = require('express');
const router  = express.Router();
const { createGuestUser } = require('../controllers/authController');

// POST /api/auth/guest → createGuestUser()
router.post('/guest', createGuestUser);

module.exports = router;
