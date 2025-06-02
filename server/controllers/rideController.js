const Ride = require('../models/Ride');

// Get all rides
const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('driver');
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get ride by ID
const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driver');
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create ride
const createRide = async (req, res) => {
  const newRide = new Ride(req.body);
  try {
    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update ride
const updateRide = async (req, res) => {
  try {
    const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRide) return res.status(404).json({ message: 'Ride not found' });
    res.json(updatedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete ride
const deleteRide = async (req, res) => {
  try {
    const deleted = await Ride.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ride not found' });
    res.json({ message: 'Ride deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
};
