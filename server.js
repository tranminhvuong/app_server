var express = require('express');
var app = express();
var http = require('http');
var userRouter = require('./router/userRouter');
var destinationRouter = require('./router/destinationRouter');
var tripRouter = require('./router/tripRouter');
var adminRouter = require('./router/adminRouter')
var config = require('./configs/config');
var net = require('net');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function(req, res) {
    console.log('ok');
    res.end('Đồ án tốt nghiệp');
})

app.use('/api/user', userRouter);
app.use('/api/destination', destinationRouter);
app.use('/api/trip', tripRouter);
app.use('/api/admin', adminRouter);

// var client = net.connect(config.carskit_info.port, "ec2-13-229-83-43.ap-southeast-1.compute.amazonaws.com");
// client.write('TRAIN\n');
// client.on('data', function(data) {
//     console.log(data.toString());
//     if(data.toString().startsWith('Update OK')) {
//         client.destroy();
//         console.log('Server0 ok ');
//     }
// })
// var client1 = net.connect(config.carskit_info.port, "ec2-13-250-34-150.ap-southeast-1.compute.amazonaws.com");
// client1.write('TRAIN\n');
// client1.on('data', function(data) {
//     console.log(data.toString());
//     if(data.toString().startsWith('Update OK')) {
//         client1.destroy();
//         console.log('Server1 ok');
//     }
// })
// var client2 = net.connect(config.carskit_info.port, "ec2-18-140-63-13.ap-southeast-1.compute.amazonaws.com");
// client2.write('TRAIN\n');
// client2.on('data', function(data) {
//     console.log(data.toString());
//     if(data.toString().startsWith('Update OK')) {
//         client.destroy();
//         http.createServer(app).listen(config.portId);
//         console.log('Server2 ok');
//     }
// })

var client = net.connect(config.carskit_info.port, config.carskit_info.host);
client.write('TRAIN\n');
client.on('data', function(data) {
    console.log(data.toString());
    if(data.toString().startsWith('Update OK')) {
        client.destroy();
        http.createServer(app).listen(config.portId);
        console.log('Server2 ok');
    }
})
