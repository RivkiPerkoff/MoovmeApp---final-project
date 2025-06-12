const Request = require('../models/Request');
const Ride = require('../models/Ride');



// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('ride passenger');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('ride passenger');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new request
// const createRequest = async (req, res) => {
//   const request = new Request(req.body);
//   try {
//     const saved = await request.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
const createRequest = async (req, res) => {
  try {
    const { ride_id, passenger_id, seats_requested } = req.body;

    if (!ride_id || !passenger_id || !seats_requested) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ride = await Ride.findById(ride_id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.available_seats < seats_requested) {
      return res.status(400).json({ message: 'אין מספיק מקומות פנויים בנסיעה' });
    }

    // עדכון מקומות פנויים
    ride.available_seats -= seats_requested;
    await ride.save();

    const request = new Request({
      ride_id,
      passenger_id,
      seats_requested,
      status: 'pending'
    });

    await request.save();
    res.status(201).json(request);

  } catch (err) {
    console.error("❌ שגיאה ביצירת בקשה:", err);
    res.status(500).json({ message: err.message });
  }
};



// Update request status
const updateRequest = async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRequestsByRide = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    const requests = await Request.find({ ride_id: rideId }).populate('passenger_id', 'username email');
    res.json(requests);
  } catch (err) {
    console.error('שגיאה בשליפת בקשות לפי נסיעה:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  getRequestsByRide,
};
