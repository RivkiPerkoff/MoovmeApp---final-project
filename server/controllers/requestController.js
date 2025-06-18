const Request = require('../models/Request');
const Ride = require('../models/Ride');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { updateAvailableSeats } = require('./rideController');

// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('ride passenger');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getRequestsByPassenger = async (req, res) => {
  try {
    const passengerId = req.params.passengerId;
    const requests = await Request.find({ passenger_id: passengerId })
      .populate({
        path: 'ride_id',
        model: 'Ride',
      });

    // נעדכן את הפורמט שיחזור עם ride במקום ride_id
    const updatedRequests = requests.map((req) => ({
      ...req._doc,
      ride: req.ride_id, // נוסיף ride כדי שיהיה נגיש בקומפוננטה
    }));

    res.json(updatedRequests);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשליפת בקשות של נוסע', error: err.message });
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
//   try {
//     const { ride_id, passenger_id, seats_requested } = req.body;

//     if (!ride_id || !passenger_id || !seats_requested) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const ride = await Ride.findById(ride_id);
//     if (!ride) return res.status(404).json({ message: 'Ride not found' });

//     if (ride.available_seats < seats_requested) {
//       return res.status(400).json({ message: 'אין מספיק מקומות פנויים בנסיעה' });
//     }

//     // עדכון מקומות פנויים
//     ride.available_seats -= seats_requested;
//     await ride.save();

//     const request = new Request({
//       ride_id,
//       passenger_id,
//       seats_requested,
//       status: 'pending'
//     });

//     await request.save();
//     res.status(201).json(request);

//   } catch (err) {
//     console.error("❌ שגיאה ביצירת בקשה:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
const createRequest = async (req, res) => {
  console.log('📦 נתונים שהתקבלו ב־POST /api/requests:', req.body);
  try {
    const { ride_id, passenger_id, seats_requested } = req.body;

    const newRequest = new Request({
      ride_id,
      passenger_id,
      seats_requested,
      status: 'pending'
    });

    const savedRequest = await newRequest.save();

    // שלב א: שלוף את פרטי הנסיעה כולל שם הנהג
    const ride = await Ride.findById(ride_id).populate('driver_id', 'username');
    const passenger = await User.findById(passenger_id);

    if (ride && passenger) {
      // שלב ב: צור התראה לנהג
      const notification = new Notification({
        user_id: ride.driver_id._id,
        message: `המשתמש ${passenger.username} ביקש להצטרף לנסיעה מ-${ride.from} ל-${ride.to}`,
        type: 'join_request',
        request_id: savedRequest._id,  // ← זה חשוב
        is_read: false,
        createdAt: new Date(),
        link_to: `/rides/${ride._id}`
      });


      await notification.save();
      console.log('🔔 נשלחה התראה לנהג');
    }

    res.status(201).json(savedRequest);
  } catch (err) {
    console.error('❌ שגיאה ביצירת בקשה:', err);
    res.status(500).json({ message: 'שגיאה ביצירת בקשה' });
  }
};


// Update request status
// const updateRequest = async (req, res) => {
//   try {
//     const updated = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Request not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
const updateRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: 'הבקשה לא נמצאה' });

    const ride = await Ride.findById(request.ride_id);
    if (!ride) return res.status(404).json({ message: 'הנסיעה לא נמצאה' });

    // אם מאשרים - עדכן סטטוס, עדכן מקומות ושלח התראה לנוסע
    if (status === 'approved') {
      if (ride.available_seats < request.seats_requested) {
        return res.status(400).json({ message: 'אין מספיק מקומות פנויים בנסיעה' });
      }

      // הפחתה של מספר המקומות הפנויים
      ride.available_seats -= request.seats_requested;
      await ride.save();

      // שליחת התראה לנוסע
      const notification = new Notification({
        user_id: request.passenger_id,
        message: `הבקשה שלך להצטרף לנסיעה מ-${ride.from} ל-${ride.to} אושרה.`,
        type: 'request_approved',
        seen: false,
        is_read: false,
        createdAt: new Date(),
        link_to: `/rides/${ride._id}`
      });
      await notification.save();
    }

    // עדכון סטטוס הבקשה
    request.status = status;
    await request.save();

    res.json({ message: 'סטטוס הבקשה עודכן', request });
  } catch (err) {
    console.error('שגיאה בעדכון סטטוס הבקשה:', err);
    res.status(500).json({ message: 'שגיאה בעדכון סטטוס' });
  }
};

const approveRequest = async (req, res) => {
const { id } = req.params;

  try {
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: 'הבקשה לא נמצאה' });

    const ride = await Ride.findById(request.ride_id);
    if (!ride) return res.status(404).json({ message: 'נסיעה לא נמצאה' });

    // עדכון סטטוס
    request.status = 'approved';
    await request.save();

    // הפחתת מקומות
    ride.available_seats -= request.seats_requested;
    await ride.save();

    // שליחת התראה לנוסע
    const passenger = await User.findById(request.passenger_id);
    const notification = new Notification({
      user_id: request.passenger_id,
      message: `הבקשה שלך להצטרפות לנסיעה מ-${ride.from} ל-${ride.to} אושרה!`,
      type: 'request_approved',
      seen: false,
      is_read: false,
      createdAt: new Date(),
      link_to: `/rides/${ride._id}`
    });
    await notification.save();

    res.json({ message: 'הבקשה אושרה והנסיעה עודכנה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה באישור בקשה' });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    console.log('--- מחיקת בקשה ---');
    console.log('params.id:', req.params.id);
    console.log('body:', req.body);

    const deleted = await Request.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log('לא נמצאה בקשה למחיקה');
      return res.status(404).json({ message: 'Request not found' });
    }
    console.log('הבקשה נמחקה בהצלחה');
    res.json({ message: 'Request deleted' });
  } catch (err) {
    console.error('שגיאה במחיקת בקשה:', err);
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

// const increaseSeats = async (req, res) => {
//   const rideId = req.params.id;
//   const { seatsToAdd } = req.body;

//   try {
//     const ride = await Ride.findById(rideId);
//     if (!ride) {
//       return res.status(404).json({ message: 'Ride not found' });
//     }

//     ride.available_seats += seatsToAdd;
//     await ride.save();

//     res.json({ message: 'Seats updated successfully', ride });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  getRequestsByRide,
  getRequestsByPassenger,
  approveRequest,
};
