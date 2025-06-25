// server/controllers/referralController.js

const User = require('../models/User');
const Doctor = require('../models/Doctor');

// 2. Referral code save karne wala function
exports.setReferral = async (req, res) => {
  try {
    const { userId, referralCode } = req.body;

    // doctor ढूंढो code से
    const doctor = await Doctor.findOne({ referralCode });
    if (!doctor) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    // user document में referredBy set करो
    await User.findByIdAndUpdate(userId, { referredBy: doctor._id });

    return res.status(200).json({ message: 'Referral applied' });
  } catch (err) {
    console.error('ReferralController.setReferral error:', err);
    return res.status(500).json({ error: 'Setting referral failed' });
  }
};
