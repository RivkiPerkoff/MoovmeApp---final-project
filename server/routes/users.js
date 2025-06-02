const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Routes
router.get('/', getAllUsers);         // GET /api/users
router.get('/:id', getUserById);      // GET /api/users/:id
router.post('/', createUser);         // POST /api/users
router.put('/:id', updateUser);       // PUT /api/users/:id
router.delete('/:id', deleteUser);    // DELETE /api/users/:id

module.exports = router;
