// server/controllers/referralController.js

const User = require('../models/User');


// 2. Referral code save karne wala function
exports.setReferral = async (req, res) => {
  try {
    const { userId, referralCode } = req.body;

    // doctor ढूंढो code से
    const refUser = await User.findOne({ referralCode });
    if (!refUser)                                                                                                                                                                                                                                                                                                               return res.status(404).json({ error: 'Invalid referral code' });
    if (refUser._id.equals(userId))
      return res.status(400).json({ error: 'Cannot refer yourself' });
    await User.findByIdAndUpdate(userId, { referredBy: refUser._id });

    return res.status(200).json({ message: 'Referral applied' });
  } catch (err) {
    console.error('ReferralController.setReferral error:', err);
    return res.status(500).json({ error: 'Setting referral failed' });
  }
};
