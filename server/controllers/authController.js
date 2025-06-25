// // server/controllers/authController.js
// import asyncHandler from 'express-async-handler';
// import jwt          from 'jsonwebtoken';
// import User         from '../models/User.js';

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });
// };

// // @desc    Register new user
// // @route   POST /api/auth/signup
// // @access  Public
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const user = await User.create({ name, email, password });
//   if (user) {
//     res.status(201).json({
//       _id:    user._id,
//       name:   user.name,
//       email:  user.email,
//       isAdmin:user.isAdmin,
//       token:  generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Authenticate user & get token
// // @route   POST /api/auth/login
// // @access  Public
// export const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id:    user._id,
//       name:   user.name,
//       email:  user.email,
//       isAdmin:user.isAdmin,
//       token:  generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

// server/controllers/authController.js

const User = require('../models/User');

// 1. Guest user create karne ka function
exports.createGuestUser = async (req, res) => {
  try {
    // new user document बिना कोई field भेजे बना दो
    const user = await User.create({});

    // front-end को userId भेज दो
    return res.status(201).json({ userId: user._id });
  } catch (err) {
    console.error('AuthController.createGuestUser error:', err);
    return res.status(500).json({ error: 'Guest user creation failed' });
  }
};
