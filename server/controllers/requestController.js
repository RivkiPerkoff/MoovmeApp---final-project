const {
  getAllRequestsService,
  getRequestByIdService,
  createRequestService,
  updateRequestService,
  deleteRequestService,
  getRequestsByRideService,
  getRequestsByPassengerService,
  approveRequestService,
} = require('../services/requestService');

const getAllRequests = async (req, res) => {
  try {
    const requests = await getAllRequestsService();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await getRequestByIdService(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRequest = async (req, res) => {
  try {
    const savedRequest = await createRequestService(req.body);
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה ביצירת בקשה' });
  }
};

const updateRequest = async (req, res) => {
  try {
    const result = await updateRequestService(req.params.requestId, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בעדכון סטטוס' });
  }
};

const approveRequest = async (req, res) => {
  try {
    const result = await approveRequestService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה באישור בקשה' });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const result = await deleteRequestService(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRequestsByRide = async (req, res) => {
  try {
    const requests = await getRequestsByRideService(req.params.rideId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRequestsByPassenger = async (req, res) => {
  try {
    const requests = await getRequestsByPassengerService(req.params.passengerId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשליפת בקשות של נוסע', error: err.message });
  }
};

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