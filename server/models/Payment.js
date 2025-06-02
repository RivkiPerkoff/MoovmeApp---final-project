const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
  amount: { type: Number, required: true },
  payment_status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  payment_method: String,
  paid_at: Date,
  transaction_id: String
});

module.exports = mongoose.model('Payment', paymentSchema);
