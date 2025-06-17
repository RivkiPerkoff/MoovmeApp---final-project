const Ride = require('../models/Ride');

// Get all rides
const getAllRides = async (req, res) => {
  try {
    // populate driver_id instead of driver
    const rides = await Ride.find().populate('driver_id', '-password'); // אפשר להוציא סיסמה מההחזרה
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get ride by ID
const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driver_id', '-password');
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    res.json(ride);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createRide = async (req, res) => {
  try {
    const rideData = {
      ...req.body,
      driver_id: req.body.driver_id  // השתמש ב-driver_id שמגיע בגוף הבקשה
    };
    const newRide = new Ride(rideData);
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
    const ride = await Ride.findById(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: 'נסיעה לא נמצאה' });
    }

    // החלף ל-body אם אין לך auth middleware
    const requesterId = req.body.userId;

    if (!requesterId || ride.driver_id.toString() !== requesterId) {
      return res.status(403).json({ message: 'אין הרשאה למחוק נסיעה זו' });
    }

    await ride.deleteOne();
    res.status(200).json({ message: 'הנסיעה נמחקה בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקת נסיעה' });
  }
};


const increaseSeats = async (req, res) => {
  const rideId = req.params.id;
  const { seatsToAdd } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    ride.available_seats += seatsToAdd;
    await ride.save();

    res.json({ message: 'Seats updated successfully', ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
  increaseSeats,
};
