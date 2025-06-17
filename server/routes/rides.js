const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

// Routes
router.get('/', rideController.getAllRides);
router.get('/:id', rideController.getRideById);
router.post('/', rideController.createRide);
router.put('/:id', rideController.updateRide);
router.delete('/:id', rideController.deleteRide);

module.exports = router;