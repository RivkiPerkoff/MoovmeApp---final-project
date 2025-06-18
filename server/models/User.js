const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  full_name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile_img: String,
  audio: String,
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
