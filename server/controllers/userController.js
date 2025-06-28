const mongoose = require('mongoose');
const User = require('../models/User');

// Claim a referral code
exports.claimReferral = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, referralCode } = req.body;
    const user = await User.findById(userId).session(session);
    if (!user) throw { status: 404, message: 'User not found' };
    if (user.referredBy) throw { status: 400, message: 'Referral already used' };

    const referrer = await User.findOne({ referralCode }).session(session);
    if (!referrer) throw { status: 400, message: 'Invalid referral code' };
    if (referrer._id.equals(user._id)) throw { status: 400, message: 'Cannot refer yourself' };

    // Assign referredBy
    user.referredBy = referrer._id;
    await user.save({ session });

    // Reward both users
    const rewardAmount = 10; // example reward coins
    await Promise.all([
      User.findByIdAndUpdate(user._id, { $inc: { walletCoins: rewardAmount } }, { session }),
      User.findByIdAndUpdate(referrer._id, { $inc: { walletCoins: rewardAmount } }, { session })
    ]);

    await session.commitTransaction();
    session.endSession();

    return res.json({
      message: 'Referral accepted',
      rewardGiven: rewardAmount,
      referrerId: referrer._id
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error('claimReferral error:', err);
    const status = err.status || 500;
    const message = err.message || 'Failed to claim referral';
    return res.status(status).json({ error: message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId, name, dob, email, address, photoUrl, pet } = req.body;
    const updated = await User.findByIdAndUpdate(
      userId,
      { name, dob, email, address, photoUrl, pet },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    return res.json({ success: true, user: updated });
  } catch (err) {
    console.error('updateProfile error:', err);
    return res.status(500).json({ success: false, error: 'Profile update failed' });
  }
};
