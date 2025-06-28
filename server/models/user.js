const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  phone: { type: String, required: true, unique: true },
  password: { type: String },
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
  photoUrl: { type: String, default: '/default-avatar.png' },

  dob: { type: Date },
  email: { type: String, default: "" },
  address: { type: String, default: "" },

  pet: {
    type: {
      type: String,
      enum: ['dog', 'cat'],
      default: ''
    },
    name: { type: String, default: '' },
    dob: { type: Date },
    breed: { type: String, default: '' }
  },

  // … existing fields (e.g., cart, isGuest) …
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
