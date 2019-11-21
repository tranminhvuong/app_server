var express = require('express');
var router = express.Router();
var tripController = require('../controller/tripController');
var authController = require('../controller/authController');

router.get('/get-trip-by-id/:trip_id', authController.isAuthenticated, tripController.getTripById);
router.get('/get-trip-by-user', authController.isAuthenticated, tripController.getTripByUser);
router.get('/remove-trip/:trip_id', authController.isAuthenticated, tripController.removeTrip);
router.post('/update-trip-name', authController.isAuthenticated, tripController.updateTripName);
router.post('/add-trip-recommend', authController.isAuthenticated,tripController.addTripWithVar);
router.post('/vote-trip', authController.isAuthenticated, tripController.voteTrip);
router.get('/get-all-variables', authController.isAuthenticated, tripController.getAllVariables);

module.exports = router;