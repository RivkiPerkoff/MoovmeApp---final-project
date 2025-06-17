const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  ride_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  
  passenger_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  note: String,
  requested_at: { type: Date, default: Date.now },
  responded_at: Date,
  seats_requested: { type: Number, required: true }
});


module.exports = mongoose.model('Request', requestSchema);
