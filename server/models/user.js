const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

const UserSchema = new mongoose.Schema({
  // … existing fields …
  referralCode: {
    type: String,
    unique: true,
    default: () => nanoid()
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  walletCoins: { type: Number, default: 0 },
  // … cart, isGuest …
}, { timestamps: true });
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
