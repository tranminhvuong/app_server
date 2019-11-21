var express = require('express');
var router = express.Router();
var destController = require('../controller/destinationController');
var authController = require('../controller/authController');

router.get('/get-all-info', authController.isAuthenticated, destController.getAllShortInfo);
router.get('/get-by-id/:destination_id', authController.isAuthenticated, destController.getInfo)
router.get('/get-destination-by-name/:query', authController.isAuthenticated, destController.getInfoByName)
router.get('/get-destionation-by-province/:province_id', authController.isAuthenticated, destController.getDestinationByProvince);
router.post('/recommend', authController.isAuthenticated, destController.getRecommend);


module.exports = router;