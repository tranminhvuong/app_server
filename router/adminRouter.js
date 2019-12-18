var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController');
var authController = require('../controller/authController');

router.post('/sign-in', authController.adminlogin);
router.post('/sign-up', adminController.register);
router.get('/get-info', authController.isAuthenticated, adminController.getInfo);

router.post('/update-password', authController.isAuthenticated, adminController.updatePass);
router.post('/update-name', authController.isAuthenticated, adminController.updateName);
router.post('/update-profile-image', authController.isAuthenticated, adminController.updateImage);
router.get('/delete-profile-image', authController.isAuthenticated, adminController.deleteImage);
router.delete('/delete-profile', authController.isAuthenticated, adminController.deleteProfile);

router.get('/get-destination', authController.isAuthenticated, adminController.getDestination);
router.put('/update-destination', authController.isAuthenticated, adminController.updateDestination);
router.delete('/delete-destination', authController.isAuthenticated, adminController.deleteDestination);
router.post('/create-destination', authController.isAuthenticated, adminController.createDestination);

module.exports = router;