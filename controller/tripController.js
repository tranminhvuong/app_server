var tripDao = require('../dao/tripDao')
var destinationDao = require('../dao/destinationDao')
var userDao = require('../dao/userDao')
var provinceDao = require('../dao/provinceDao');
var config = require('../configs/config')

module.exports.getAllVariables = async function(req, res) {
    try {
        console.log('get all var from ' + req.id)
        let variable = new Object;
        variable.companion = await tripDao.getCompanion();
        variable.season = await tripDao.getSeason();
        variable.daytime = await tripDao.getDaytime();
        variable.weather = await tripDao.getWeather();
        variable.temperature = await tripDao.getTemperature();
    
        res.status(200).json(variable);
    }
    catch(err) {
        res.status(400).end('truy vấn thất bại');
        console.log(err);
    }
}


module.exports.getTripByUser = async function(req, res) {
    try{
        console.log('get trip by user from ' + req.id)
        let trips = await tripDao.getTripByUser(req.id);
        for(let trip of trips) {
            let destination = await destinationDao.getDestinationById(trip.destination);
            if(trip.start_date_tx == null || trip.start_date_tx == undefined)
                trip.start_date_tx = 'Chưa chọn ngày';
            else {
                trip.start_date_tx = trip.start_date_tx.toString().split(' 00:00:00')[0] ;
            }
            trip.destination = destination;
        }
        res.status(200).json(trips);
    }
    catch(err) {
        res.status(400).end('Có lỗi xảy ra');
        console.log(err);
    }
}

module.exports.getTripById = async function(req, res) {
    try {
        console.log('get trip by id from ' + req.id)
        let trip = await tripDao.getTripById(req.id, req.params.trip_id);
        let user = await userDao.getUserInfo(trip.user);
        let destination = await destinationDao.getDestinationById(trip.destination);
        
        if(trip.start_date_tx == null || trip.start_date_tx == undefined)
            trip.start_date_tx = 'Chưa chọn ngày';
        else {
            trip.start_date_tx = trip.start_date_tx.toString().split(' 00:00:00')[0] ;
        }
        
        if(trip.name == null || trip.name == undefined || trip.name == 'ten') 
            trip.name = 'Chuyến đi chưa được đặt tên'
        trip.destination = destination;
        //console.log(trip)
        res.status(200).json(trip);
    }
    catch(err) {
        console.log(err);
        res.status(400).end('truy vấn thất bại');
    }
}

module.exports.addTripWithVar = async function(req, res) {
    try {
        console.log('add trip from ' + req.id)
        await tripDao.addTrip(req.id, req.body);
        res.status(200).end('thêm thành công');
    }
    catch(err) {
        res.status(400).end('truy vấn thất bại');
        console.log(err);
    }
}

module.exports.voteTrip = async function(req, res) {
    try {
        console.log('vote trip from ' + req.id)
        await tripDao.voteTrip(req.id, req.body.trip_id, req.body.rating);
        var net = require('net');
        var client = net.connect(config.carskit_info.port, config.carskit_info.host);
        client.write('TRAIN\n');
        client.on('data', function(data) {
            console.log(data.toString());
            if(data.toString().startsWith('Update OK')) {
                client.destroy();
            }
        })
        res.status(200).end('vote thành công');
    }
    catch(err) {
        console.log(err);
        res.status(400).end('update thất bại');
    } 
}

module.exports.removeTrip = async function(req, res) {
    try {
        console.log('remove trip from  ' + req.id)
        await tripDao.removeTrip(req.id, req.params.trip_id);
        res.status(200).end('xóa thành công');
    }
    catch(err) {
        console.log(err);
        res.status(400).end('truy vấn thất bại')
    }
}


module.exports.updateTripName =  async function(req, res) {
    try {
        console.log('update trip name from ' + req.id)
        await tripDao.updateTripName(req.id, req.body.trip_id, req.body.name);
        res.status(200).end('Đổi tên thành công')
    }
    catch(err) {
        console.log(err);
        res.status(400).end('Thất bại')
    }
}