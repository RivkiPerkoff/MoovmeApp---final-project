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

// Create ride
// const createRide = async (req, res) => {
//   try {
//     const rideData = {
//       ...req.body,
//       driver_id: req.user._id // להגדיר את הנהג אוטומטית לפי המשתמש המחובר
//     };
//     const newRide = new Ride(rideData);
//     const savedRide = await newRide.save();
//     res.status(201).json(savedRide);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
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

    if (ride.driver_id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'אין הרשאה למחוק נסיעה זו' });
    }

    await ride.deleteOne();
    res.status(200).json({ message: 'הנסיעה נמחקה בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה במחיקת נסיעה' });
  }
};



module.exports = {
  getAllRides,
  getRideById,
  createRide,
  updateRide,
  deleteRide,
};
