var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var authController = require('../controller/authController');

router.post('/sign-in', authController.login);
router.post('/sign-up', userController.register);
router.get('/get-info', authController.isAuthenticated, userController.getInfo);

router.post('/update-password', authController.isAuthenticated, userController.updatePass);
router.post('/update-name', authController.isAuthenticated, userController.updateName);
router.post('/update-profile-image', authController.isAuthenticated, userController.updateImage);
router.get('/delete-profile-image', authController.isAuthenticated, userController.deleteImage);
router.get('/delete-profile', authController.isAuthenticated, userController.deleteProfile);

module.exports = router;