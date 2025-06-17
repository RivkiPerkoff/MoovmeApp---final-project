const Notification = require('../models/Notification');
const Request = require('../models/Request');


const deleteRide = async (req, res) => {
  const { rideId } = req.params;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });

    // מצא את כל הנוסעים שהצטרפו לנסיעה
    const requests = await Request.find({ ride_id: rideId });

    // שלח התראה לכל אחד מהם
    for (const req of requests) {
      await Notification.create({
        user_id: req.user_id,
        message: 'הנסיעה אליה הצטרפת בוטלה על ידי הנהג.',
        type: 'status_update',
        link_to: `/rides/${rideId}`,
        is_read: false,
        createdAt: new Date()
      });
    }

    // מחק את כל הבקשות
    await Request.deleteMany({ ride_id: rideId });

    // מחק את הנסיעה
    await Ride.findByIdAndDelete(rideId);

    res.status(200).json({ message: 'Ride and related requests deleted successfully' });
  } catch (error) {
    console.error('Error deleting ride:', error);
    res.status(500).json({ error: 'Failed to delete ride' });
  }
};


// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate('user');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get notifications for a specific user
const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('📩 מבקש התראות עבור משתמש:', userId);

    const notifications = await Notification.find({ user_id: userId, is_read: false });

    console.log('🔔 נמצאו התראות:', notifications);
    res.json(notifications);
  } catch (err) {
    console.error('❌ שגיאה בקבלת התראות:', err);
    res.status(500).json({ message: 'שגיאה בקבלת התראות' });
  }
};



// Create a new notification
const createNotification = async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendRideCancelNotifications = async (req, res) => {
  const { rideId, senderId } = req.body;

  try {
    const requests = await Request.find({ ride_id: rideId, status: 'approved' }).populate('passenger_id');

    const notifications = requests.map(req => ({
      user: req.passenger_id._id,
      message: 'הנסיעה אליה הצטרפת בוטלה על ידי הנהג.',
      type: 'ride_cancel',
      seen: false,
      timestamp: new Date(),
    }));

    await Notification.insertMany(notifications);
    res.status(200).json({ message: 'התראות נשלחו בהצלחה.' });
  } catch (err) {
    console.error('שגיאה בשליחת התראות על ביטול נסיעה:', err);
    res.status(500).json({ error: 'שגיאה בשליחת התראות' });
  }
};
module.exports = {
  getAllNotifications,
  getNotificationsByUser,
  createNotification,
  markAsRead,
  deleteRide,
  sendRideCancelNotifications,
};
