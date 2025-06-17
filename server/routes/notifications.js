const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');


// Routes
router.get('/', notificationController.getAllNotifications);
// router.get('/byUser/:userId', notificationController.getNotificationsByUser);
router.get('/byUser/:userId', notificationController.getNotificationsByUser);



// router.get('/user/:userId', notificationController.getNotificationsByUser);
router.post('/', notificationController.createNotification);
router.post('/ride-cancel', notificationController.sendRideCancelNotifications);
router.patch('/:id/read', notificationController.markAsRead);

module.exports = router;
