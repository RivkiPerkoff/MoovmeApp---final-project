const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes
router.get('/', notificationController.getAllNotifications);
router.get('/user/:userId', notificationController.getNotificationsByUser);
router.post('/', notificationController.createNotification);
router.patch('/:id/read', notificationController.markAsRead);

module.exports = router;
