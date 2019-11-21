var User = require('../dao/userDao');
var config = require('../configs/config');
var jwt = require('jsonwebtoken');
var userDao = require('../dao/userDao')

module.exports.isAuthenticated = function(req, res, next) {

    if(req.headers && req.headers.authorization) {
        var token = req.headers.authorization;
    
        jwt.verify(token, config.jwtSecret, function(err, payload) {
            if(err) {
                console.log('auth error')
                res.status(401).json({status: 'không thể xác thực'});
            }
            else {
                req.id = payload.id;
                next();
            }
        })
    }
}

module.exports.login = async function(req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        console.log('co may dang nhap ' + username);

        let result = await userDao.findUserByPassword(username, password);
        var payload = {id : result.id, 'username' : username};
        var jwtToken = jwt.sign(payload, config.jwtSecret, {expiresIn : '360 m'});
        
        res.status(200).json({'token':jwtToken , id: result.id});
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'đăng nhập thất bại'});
    }
}
