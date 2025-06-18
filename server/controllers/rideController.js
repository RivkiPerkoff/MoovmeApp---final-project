const {
  getAllRidesService,
  getRideByIdService,
  createRideService,
  updateRideService,
  deleteRideService,
  increaseSeatsService,
  updateAvailableSeatsService
} = require('../services/rideService');

const getAllRides = async (req, res) => {
  try {
    const rides = await getAllRidesService();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRideById = async (req, res) => {
  try {
    const ride = await getRideByIdService(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRide = async (req, res) => {
  try {
    const savedRide = await createRideService(req.body);
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRide = async (req, res) => {
  try {
    const updatedRide = await updateRideService(req.params.id, req.body);
    res.json(updatedRide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRide = async (req, res) => {
  try {
    const result = await deleteRideService(req.params.id, req.body.userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה במחיקת נסיעה' });
  }
};

const increaseSeats = async (req, res) => {
  try {
    const ride = await increaseSeatsService(req.params.id, req.body.seatsToAdd);
    res.json({ message: 'Seats updated successfully', ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAvailableSeats = async (rideId, change) => {
  return await updateAvailableSeatsService(rideId, change);
};

module.exports = {
  getAllRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
  increaseSeats,
  updateAvailableSeats
};