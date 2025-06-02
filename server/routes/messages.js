const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Routes
router.get('/', messageController.getAllMessages);
router.get('/:user1/:user2', messageController.getMessagesBetweenUsers);
router.post('/', messageController.createMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
