const User = require('../models/User');

const getAllUsersService = async () => {
  return await User.find();
};

const getUserByIdService = async (userId) => {
  return await User.findById(userId);
};

const createUserService = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const updateUserService = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUserService = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
};
