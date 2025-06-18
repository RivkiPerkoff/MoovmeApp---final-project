const Ride = require('../models/Ride');
const Request = require('../models/Request');
const Notification = require('../models/Notification');

const getAllRidesService = async () => {
  return await Ride.find().populate('driver_id', '-password');
};

const getRideByIdService = async (rideId) => {
  return await Ride.findById(rideId).populate('driver_id', '-password');
};

const createRideService = async (rideData) => {
  const newRide = new Ride({ ...rideData, driver_id: rideData.driver_id });
  return await newRide.save();
};

const updateRideService = async (rideId, updateData) => {
  const rideBeforeUpdate = await Ride.findById(rideId);
  if (!rideBeforeUpdate) throw new Error('Ride not found');

  const updatedRide = await Ride.findByIdAndUpdate(rideId, updateData, { new: true });
  if (!updatedRide) throw new Error('Ride not found');

  const approvedRequests = await Request.find({ ride_id: rideId, status: 'approved' });

  if (approvedRequests.length > 0) {
    const changeSummary = [];

    // השוואת שעת יציאה (אם קיימת בעדכון)
    if (
      updateData.departure_time &&
      new Date(rideBeforeUpdate.departure_time).getTime() !== new Date(updateData.departure_time).getTime()
    ) {
      changeSummary.push(`🕒 זמן היציאה שונה ל-${new Date(updateData.departure_time).toLocaleString('he-IL')}`);
    }

    // השוואת עיר מוצא
    if (updateData.from_city && rideBeforeUpdate.from_city !== updateData.from_city) {
      changeSummary.push(`📍 עיר המוצא שונתה ל-${updateData.from_city}`);
    }

    // השוואת עיר יעד
    if (updateData.destination_city && rideBeforeUpdate.destination_city !== updateData.destination_city) {
      changeSummary.push(`📍 עיר היעד שונתה ל-${updateData.destination_city}`);
    }

    // השוואת מספר מקומות פנויים
    if (
      typeof updateData.available_seats !== 'undefined' &&
      rideBeforeUpdate.available_seats !== updateData.available_seats
    ) {
      changeSummary.push(`🪑 מספר המקומות הפנויים עודכן ל-${updateData.available_seats}`);
    }

    // אם באמת היה שינוי – שולחים התראות
    if (changeSummary.length > 0) {
      const messageText = `הנהג עדכן את פרטי הנסיעה מ-${updatedRide.from_city} ל-${updatedRide.destination_city}:\n${changeSummary.join('\n')}`;

      const notifications = approvedRequests.map(req => ({
        user_id: req.passenger_id,
        message: messageText,
        type: 'ride_updated',
        seen: false,
        is_read: false,
        createdAt: new Date(),
        link_to: `/rides/${updatedRide._id}`
      }));

      await Notification.insertMany(notifications);
      console.log('📣 נשלחו התראות לנוסעים על עדכון נסיעה');
    } else {
      console.log('ℹ️ לא היו שינויים משמעותיים – לא נשלחו התראות');
    }
  }

  return updatedRide;
};

const deleteRideService = async (rideId, requesterId) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('נסיעה לא נמצאה');

  if (!requesterId || ride.driver_id.toString() !== requesterId) {
    throw new Error('אין הרשאה למחוק נסיעה זו');
  }

  const requests = await Request.find({ ride_id: ride._id, status: 'approved' });

  if (requests.length > 0) {
    const notifications = requests.map(req => ({
      user_id: req.passenger_id,
      message: `הנסיעה מ-${ride.from_city} ל-${ride.destination_city} אליה הצטרפת בוטלה על ידי הנהג.`,
      type: 'ride_cancel',
      seen: false,
      is_read: false,
      createdAt: new Date(),
      link_to: `/rides/${ride._id}`
    }));
    await Notification.insertMany(notifications);
  }

  await Request.deleteMany({ ride_id: ride._id });
  await ride.deleteOne();

  return { message: 'הנסיעה נמחקה בהצלחה' };
};

const increaseSeatsService = async (rideId, seatsToAdd) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  ride.available_seats += seatsToAdd;
  return await ride.save();
};

const updateAvailableSeatsService = async (rideId, change) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new Error('Ride not found');
  ride.available_seats += change;
  if (ride.available_seats < 0) ride.available_seats = 0;
  return await ride.save();
};

module.exports = {
  getAllRidesService,
  getRideByIdService,
  createRideService,
  updateRideService,
  deleteRideService,
  increaseSeatsService,
  updateAvailableSeatsService
};
