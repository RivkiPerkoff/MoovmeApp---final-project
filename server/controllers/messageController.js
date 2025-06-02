const Message = require('../models/Message');

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender receiver');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get messages between two users
const getMessagesBetweenUsers = async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMessages,
  getMessagesBetweenUsers,
  createMessage,
  deleteMessage,
};
