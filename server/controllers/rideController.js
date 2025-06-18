const Ride = require('../models/Ride');
const Request = require('../models/Request');
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');

// Get all rides
const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('driver_id', '-password');
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

// Create ride
const createRide = async (req, res) => {
  try {
    const rideData = {
      ...req.body,
      driver_id: req.body.driver_id
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

// Delete ride with permission check
const deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'נסיעה לא נמצאה' });

    // אימות הטוקן מה-Authorization Header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'לא סופק טוקן' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requesterId = decoded.id;
    const isAdmin = decoded.user_type === 'admin';

    if (!isAdmin && ride.driver_id.toString() !== requesterId) {
      return res.status(403).json({ message: 'אין הרשאה למחוק נסיעה זו' });
    }

    // שלב 1: מציאת בקשות שאושרו
    const requests = await Request.find({ ride_id: ride._id, status: 'approved' });

    // שלב 2: שליחת התראות לנוסעים
    if (requests.length > 0) {
      const notifications = requests.map(req => ({
        user_id: req.user_id,
        message: 'הנסיעה אליה הצטרפת בוטלה על ידי הנהג.',
        type: 'ride_cancel',
        seen: false,
        is_read: false,
        createdAt: new Date(),
        link_to: `/rides/${ride._id}`
      }));
      await Notification.insertMany(notifications);
    }

    // שלב 3: מחיקת הנסיעה
    await ride.deleteOne();
    res.status(200).json({ message: 'הנסיעה נמחקה בהצלחה' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקת נסיעה' });
  }
};

// Increase seats
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

// Utility for internal seat update
const updateAvailableSeats = async (rideId, change) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  ride.available_seats += change;
  if (ride.available_seats < 0) ride.available_seats = 0;
  await ride.save();
  return ride;
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
