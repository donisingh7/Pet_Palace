const User = require('../models/User');

// OTP skip karte hue simple phone-based login/signup
exports.login = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number required' });
    }

    // Pehle check karo existing user
    let user = await User.findOne({ phone });
    if (!user) {
      // Naya signup
      user = await User.create({ phone });
    }

    // Always succeed (mock OTP)
    return res.json({
      success: true,
      user: {
        userId: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        dob: user.dob,
        address: user.address,
        photoUrl: user.photoUrl,
        pet: user.pet,
        referralCode: user.referralCode,
        walletCoins: user.walletCoins
      }
    });
  } catch (err) {
    console.error('AuthController.login error:', err);
    return res.status(500).json({ success: false, error: 'Login/signup failed' });
  }
};

// Guest user create karne ka function (optional)
exports.createGuestUser = async (req, res) => {
  try {
    const user = await User.create({});
    return res.status(201).json({ userId: user._id });
  } catch (err) {
    console.error('AuthController.createGuestUser error:', err);
    return res.status(500).json({ error: 'Guest user creation failed' });
  }
};
