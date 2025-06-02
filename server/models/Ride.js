const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departure_time: { type: Date, required: true },
  available_seats: { type: Number, required: true },
  car_img: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
