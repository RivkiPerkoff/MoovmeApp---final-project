const {
  getAllNotificationsService,
  getNotificationsByUserService,
  createNotificationService,
  markAsReadService,
  deleteRideService,
  sendRideCancelNotificationsService
} = require('../services/notificationService');

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotificationsService();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await getNotificationsByUserService(userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בקבלת התראות' });
  }
};

const createNotification = async (req, res) => {
  try {
    const savedNotification = await createNotificationService(req.body);
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const updatedNotification = await markAsReadService(req.params.id);
    if (!updatedNotification) return res.status(404).json({ message: 'Notification not found' });
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRide = async (req, res) => {
  try {
    const result = await deleteRideService(req.params.rideId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ride' });
  }
};

const sendRideCancelNotifications = async (req, res) => {
  try {
    const { rideId, senderId } = req.body;
    const result = await sendRideCancelNotificationsService(rideId, senderId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בשליחת התראות' });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationsByUser,
  createNotification,
  markAsRead,
  deleteRide,
  sendRideCancelNotifications,
};
