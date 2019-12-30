var express = require('express');
var router = express.Router();
var cityController = require('../controller/cityController');
var authController = require('../controller/authController');

router.get('/get-all-cities', authController.isAuthenticated, cityController.getAllShortInfo);
router.get('/get-by-id/:destination_id', authController.isAuthenticated, cityController.getInfo)
router.get('/get-destination-by-name/:query', authController.isAuthenticated, cityController.getInfoByName)
router.get('/get-destionation-by-province/:province_id', authController.isAuthenticated, cityController.getDestinationByProvince);
router.get('/get-ten-cities/', authController.isAuthenticated, cityController.getTenCities)

module.exports = router;