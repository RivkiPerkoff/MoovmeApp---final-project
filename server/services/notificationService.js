const Notification = require('../models/Notification');
const Request = require('../models/Request');
const Ride = require('../models/Ride');

const getAllNotificationsService = async () => {
  return await Notification.find().populate('user');
};

const getNotificationsByUserService = async (userId) => {
  console.log('📩 מבקש התראות עבור משתמש:', userId);
  const notifications = await Notification.find({ user_id: userId, is_read: false });
  console.log('🔔 נמצאו התראות:', notifications);
  return notifications;
};

const createNotificationService = async (notificationData) => {
  const newNotification = new Notification(notificationData);
  return await newNotification.save();
};

const markAsReadService = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { is_read: true },
    { new: true }
  );
};

const deleteRideService = async (rideId) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');

  const requests = await Request.find({ ride_id: rideId });

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

  await Request.deleteMany({ ride_id: rideId });
  await Ride.findByIdAndDelete(rideId);

  return { message: 'Ride and related requests deleted successfully' };
};

const sendRideCancelNotificationsService = async (rideId, senderId) => {
  const requests = await Request.find({ ride_id: rideId, status: 'approved' }).populate('passenger_id');

  const notifications = requests.map(req => ({
    user: req.passenger_id._id,
    message: 'הנסיעה אליה הצטרפת בוטלה על ידי הנהג.',
    type: 'ride_cancel',
    seen: false,
    timestamp: new Date(),
  }));

  await Notification.insertMany(notifications);
  return { message: 'התראות נשלחו בהצלחה.' };
};

module.exports = {
  getAllNotificationsService,
  getNotificationsByUserService,
  createNotificationService,
  markAsReadService,
  deleteRideService,
  sendRideCancelNotificationsService
};
