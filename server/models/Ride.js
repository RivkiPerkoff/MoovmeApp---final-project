const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from_city: { type: String, required: true },
  from_address: { type: String, required: true },
  destination_city: { type: String, required: true },
  destination_address: { type: String, required: true },
  departure_time: { type: Date, required: true },
  available_seats: { type: Number, required: true },
  car_img: String,
  notes: String,
  gender: { type: String, enum: ['נהג', 'נהגת'], default: 'נהג' }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
