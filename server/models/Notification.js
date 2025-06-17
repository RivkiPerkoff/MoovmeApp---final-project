const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['system', 'message', 'status_update', 'ride_cancel', 'join_request','request_approved'], // ← הוסף כאן את הערך החדש
    default: 'system'
  },
  link_to: String,
  is_read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  request_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' }
});

module.exports = mongoose.model('Notification', notificationSchema);
