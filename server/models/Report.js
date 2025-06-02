const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reported_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reported_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ride_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
  reason: { type: String, required: true },
  details: String,
  created_at: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Report', reportSchema);
