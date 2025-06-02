const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  from_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ride_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
