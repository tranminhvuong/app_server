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

var client = net.connect(config.carskit_info.port, config.carskit_info.host);
client.write('TRAIN\n');
client.on('data', function(data) {
    console.log(data.toString());
    if(data.toString().startsWith('Update OK')) {
        client.destroy();
        http.createServer(app).listen(config.portId);
        console.log('Server đã khởi chạy tại cổng: ' + config.portId);
    }
})