const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  referralCode: { type: String, unique: true, index: true },
  walletCoins:  { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Doctor 
  || mongoose.model('Doctor', DoctorSchema);
