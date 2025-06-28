const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  phone: { type: String, unique: true, sparse: true },
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
      required: false,
      default: null
    },
    name: { type: String, default: '' },
    dob: { type: Date, default: null },
    breed: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
