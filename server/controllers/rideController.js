// const Ride = require('../models/Ride');
// const Request = require('../models/Request');
// const Notification = require('../models/Notification');

// // Get all rides
// const getAllRides = async (req, res) => {
//   try {
//     const rides = await Ride.find().populate('driver_id', '-password');
//     res.json(rides);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get ride by ID
// const getRideById = async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.id).populate('driver_id', '-password');
//     if (!ride) return res.status(404).json({ message: 'Ride not found' });
//     res.json(ride);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const createRide = async (req, res) => {
//   try {
//     const rideData = {
//       ...req.body,
//       driver_id: req.body.driver_id
//     };
//     const newRide = new Ride(rideData);
//     const savedRide = await newRide.save();
//     res.status(201).json(savedRide);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Update ride
// // const updateRide = async (req, res) => {
// //   try {
// //     const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     if (!updatedRide) return res.status(404).json({ message: 'Ride not found' });
// //     res.json(updatedRide);
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };
// const updateRide = async (req, res) => {
//   try {
//     const rideBeforeUpdate = await Ride.findById(req.params.id);
//     if (!rideBeforeUpdate) return res.status(404).json({ message: 'Ride not found' });

//     const updatedRide = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedRide) return res.status(404).json({ message: 'Ride not found' });

//     // שלב 1: מצא את כל הנוסעים שאושרו
//     const approvedRequests = await Request.find({ ride_id: req.params.id, status: 'approved' });

//     if (approvedRequests.length > 0) {
//       const changeSummary = [];

//       if (rideBeforeUpdate.departure_time.getTime() !== new Date(req.body.departure_time).getTime()) {
//         changeSummary.push(`🕒 זמן היציאה שונה ל-${new Date(req.body.departure_time).toLocaleString('he-IL')}`);
//       }
//       if (rideBeforeUpdate.from_city !== req.body.from_city) {
//         changeSummary.push(`📍 עיר המוצא שונתה ל-${req.body.from_city}`);
//       }
//       if (rideBeforeUpdate.destination_city !== req.body.destination_city) {
//         changeSummary.push(`📍 עיר היעד שונתה ל-${req.body.destination_city}`);
//       }
//       if (rideBeforeUpdate.available_seats !== req.body.available_seats) {
//         changeSummary.push(`🪑 מספר המקומות הפנויים עודכן ל-${req.body.available_seats}`);
//       }

//       const messageText = changeSummary.length > 0
//         ? `הנהג עדכן את פרטי הנסיעה מ-${updatedRide.from_city} ל-${updatedRide.destination_city}:\n${changeSummary.join('\n')}`
//         : `בוצע עדכון בפרטי הנסיעה מ-${updatedRide.from_city} ל-${updatedRide.destination_city}`;

//       const notifications = approvedRequests.map(req => ({
//         user_id: req.passenger_id,
//         message: messageText,
//         type: 'ride_updated',
//         seen: false,
//         is_read: false,
//         createdAt: new Date(),
//         link_to: `/rides/${updatedRide._id}`
//       }));

//       await Notification.insertMany(notifications);
//       console.log('📣 נשלחו התראות לנוסעים על עדכון נסיעה');
//     }

//     res.json(updatedRide);
//   } catch (err) {
//     console.error('❌ שגיאה בעדכון נסיעה:', err);
//     res.status(400).json({ message: err.message });
//   }
// };

// // Delete ride and notify passengers
// const deleteRide = async (req, res) => {
//   try {
//     const ride = await Ride.findById(req.params.id);
//     if (!ride) {
//       return res.status(404).json({ message: 'נסיעה לא נמצאה' });
//     }

//     const requesterId = req.body.userId;
//     if (!requesterId || ride.driver_id.toString() !== requesterId) {
//       return res.status(403).json({ message: 'אין הרשאה למחוק נסיעה זו' });
//     }

//     // שלב 1: מציאת כל הבקשות שאושרו לנסיעה זו
//     console.log('🔍 מחפש בקשות עבור הנסיעה:', ride._id);
//     const requests = await Request.find({ ride_id: ride._id, status: 'approved' });
//     console.log('🔔 בקשות שאושרו:', requests);

//     // שלב 2: שליחת התראה לכל נוסע שאושר
//     if (requests.length > 0) {
//       const notifications = requests.map(req => ({
//         user_id: req.passenger_id,
//         message: `הנסיעה מ-${ride.from_city} ל-${ride.destination_city} אליה הצטרפת בוטלה על ידי הנהג.`,
//         type: 'ride_cancel',
//         seen: false,
//         is_read: false,
//         createdAt: new Date(),
//         link_to: `/rides/${ride._id}`
//       }));
//       await Notification.insertMany(notifications);
//       console.log('✅ נשלחו התראות לנוסעים');
//     } else {
//       console.log('ℹ️ לא נמצאו בקשות להצטרפות. לא נשלחו התראות.');
//     }
//     await Request.deleteMany({ ride_id: ride._id });
//     // שלב 3: מחיקת הנסיעה עצמה
//     await ride.deleteOne();
//     res.status(200).json({ message: 'הנסיעה נמחקה בהצלחה' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'שגיאה במחיקת נסיעה' });
//   }
// };

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

// const updateAvailableSeats = async (rideId, change) => {
//   const ride = await Ride.findById(rideId);
//   if (!ride) throw new Error('Ride not found');
//   ride.available_seats += change;
//   if (ride.available_seats < 0) ride.available_seats = 0;
//   await ride.save();
//   return ride;
// };

// module.exports = {
//   getAllRides,
//   getRideById,
//   createRide,
//   updateRide,
//   deleteRide,
//   increaseSeats,
//   updateAvailableSeats,
// };
// === controllers/rideController.js ===
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
  updateAvailableSeats,
};
