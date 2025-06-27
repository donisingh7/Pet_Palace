const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ error: 'Mobile and password required' });
  }

  const user = await User.findOne({ phone });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid creds' });
  }

  const match = password === user.password;
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Respond with minimal user info
  return res.json({
    userId: user._id,
    name: user.name,
    mobile: user.phone,
    email: user.email,           // if applicable
    imageUrl: user.photoUrl,     // ensure this exists
    referralCode: user.referralCode,
    walletCoins: user.walletCoins
  });
};

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
