const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const rideController = require('../controllers/rideController');
router.get('/', requestController.getAllRequests);
router.get('/byRide/:rideId', requestController.getRequestsByRide); 
router.get('/byPassenger/:passengerId', requestController.getRequestsByPassenger);
router.get('/:id', requestController.getRequestById); 
router.post('/', requestController.createRequest);
router.put('/:id/increaseSeats', rideController.increaseSeats);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);
router.patch('/:requestId/status', requestController.updateRequest);
router.patch('/:id/approve', requestController.approveRequest);

module.exports = router;
