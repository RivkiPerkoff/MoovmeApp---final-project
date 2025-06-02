const Notification = require('../models/Notification');

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('user');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get notifications for a specific user
const getNotificationsByUser = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByUser,
  createNotification,
  markAsRead,
};
