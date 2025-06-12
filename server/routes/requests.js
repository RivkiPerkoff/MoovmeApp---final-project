const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// /api/requests/
router.get('/', requestController.getAllRequests);
router.get('/byRide/:rideId', requestController.getRequestsByRide); // קודם
router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestById); // אחר כך
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);


module.exports = router;
