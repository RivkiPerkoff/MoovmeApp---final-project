const Request = require('../models/Request');
const Ride = require('../models/Ride');
const User = require('../models/user');
const Notification = require('../models/Notification');

const getAllRequestsService = async () => {
  return await Request.find().populate('ride passenger');
};

const getRequestByIdService = async (id) => {
  return await Request.findById(id).populate('ride passenger');
};

const createRequestService = async ({ ride_id, passenger_id, seats_requested }) => {
  const newRequest = new Request({
    ride_id,
    passenger_id,
    seats_requested,
    status: 'pending'
  });

  const savedRequest = await newRequest.save();

  const ride = await Ride.findById(ride_id).populate('driver_id', 'username');
  const passenger = await User.findById(passenger_id);

  if (ride && passenger) {
    const notification = new Notification({
      user_id: ride.driver_id._id,
      message: `המשתמש ${passenger.username} ביקש להצטרף לנסיעה מ-${ride.from_city} ל-${ride.destination_city}`,
      type: 'join_request',
      request_id: savedRequest._id,
      is_read: false,
      createdAt: new Date(),
      link_to: `/rides/${ride._id}`
    });
    await notification.save();
  }

  return savedRequest;
};

const updateRequestService = async (requestId, status) => {
  const request = await Request.findById(requestId);
  if (!request) throw new Error('הבקשה לא נמצאה');

  const ride = await Ride.findById(request.ride_id);
  if (!ride) throw new Error('הנסיעה לא נמצאה');

  if (status === 'approved') {
    if (ride.available_seats < request.seats_requested) {
      throw new Error('אין מספיק מקומות פנויים בנסיעה');
    }

    ride.available_seats -= request.seats_requested;
    await ride.save();

    const notification = new Notification({
      user_id: request.passenger_id,
      message: `הבקשה שלך להצטרף לנסיעה מ-${ride.from_city} ל-${ride.destination_city} אושרה.`,
      type: 'request_approved',
      seen: false,
      is_read: false,
      createdAt: new Date(),
      link_to: `/rides/${ride._id}`
    });
    await notification.save();
  }

  request.status = status;
  await request.save();

  return { message: 'סטטוס הבקשה עודכן', request };
};

const approveRequestService = async (id) => {
  const request = await Request.findById(id);
  if (!request) throw new Error('הבקשה לא נמצאה');

  const ride = await Ride.findById(request.ride_id);
  if (!ride) throw new Error('נסיעה לא נמצאה');

  request.status = 'approved';
  await request.save();

  ride.available_seats -= request.seats_requested;
  await ride.save();

  const passenger = await User.findById(request.passenger_id);
  const notification = new Notification({
    user_id: request.passenger_id,
    message: `הבקשה שלך להצטרפות לנסיעה מ-${ride.from_city} ל-${ride.destination_city} אושרה!`,
    type: 'request_approved',
    seen: false,
    is_read: false,
    createdAt: new Date(),
    link_to: `/rides/${ride._id}`
  });
  await notification.save();

  return { message: 'הבקשה אושרה והנסיעה עודכנה' };
};

const deleteRequestService = async (id) => {
  const request = await Request.findById(id);
  if (!request) throw new Error('הבקשה לא נמצאה');

  const ride = await Ride.findById(request.ride_id).populate('driver_id', 'username');
  const passenger = await User.findById(request.passenger_id);

  if (ride && passenger) {
    const notification = new Notification({
      user_id: ride.driver_id._id,
      message: `המשתמש ${passenger.username} ביטל את הצטרפותו לנסיעה מ-${ride.from_city} ל-${ride.destination_city}`,
      type: 'join_cancelled',
      seen: false,
      is_read: false,
      createdAt: new Date(),
      link_to: `/rides/${ride._id}`
    });

    await notification.save();
  }

  await request.deleteOne();
  return { message: 'הבקשה נמחקה' };
};

const getRequestsByRideService = async (rideId) => {
  return await Request.find({ ride_id: rideId }).populate('passenger_id', 'username email');
};

const getRequestsByPassengerService = async (passengerId) => {
  const requests = await Request.find({ passenger_id: passengerId }).populate({
    path: 'ride_id',
    model: 'Ride',
  });

  return requests.map((req) => ({
    ...req._doc,
    ride: req.ride_id,
  }));
};

module.exports = {
  getAllRequestsService,
  getRequestByIdService,
  createRequestService,
  updateRequestService,
  deleteRequestService,
  getRequestsByRideService,
  getRequestsByPassengerService,
  approveRequestService,
};
