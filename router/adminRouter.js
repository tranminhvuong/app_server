var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController')

router.get('/ok', (req, res) => {
    res.status(200).end('abcxyz')
})

router.get('/get-row', adminController.getRowsDB)

module.exports = router;