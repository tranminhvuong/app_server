var userDao = require('../dao/userDao');

module.exports.register = async function(req, res) {
    try {
        try{
            await userDao.findOne(req.body.email);
            res.status(400).end('tạo thất bại')
        } catch(err) {
            let user = await userDao.createUser(req.body);
          //  console.log(user)
            res.status(200).json({id: user.insertId});
        }
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'truy vấn thất bại'});
    }
}

module.exports.getInfo = async function(req, res) {
    try {
        let user = await userDao.getUserInfo(req.id);
        user.name = user.firstname + ' ' + user.lastname;
        user.password = undefined;
        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'truy vấn thất bại'});
    }
}

module.exports.updatePass = async function(req, res) {
    try {
        let result = await userDao.updatePass(req.id, req.body.old_password, req.body.new_password);
        res.status(200).end("Đổi mật khẩu thành công");
    }
    catch(err) {
        res.status(400).end('Đổi mật khẩu thất bại');
    }
}

module.exports.updateName = function(req, res) {
    userDao.updateName(req.id, req.body.firstname, req.body.lastname, function(result) {
        if(result == null) {
            res.status(400).json({status: 'Đổi tên thất bại'});
        }
        else {
            res.status(200).json({status: 'Thành công'});
        }
    });
}

module.exports.updateImage = function(req, res) {
    userDao.updateImage(req.id, req.body.image, function(result) {
        if(result == null) {
            res.status(400).json({status: 'Đổi avatar thất bại'});
        }
        else {
            res.status(200).json({status: 'Thành công'});
        }
    });
}

module.exports.deleteImage = function(req, res) {
    userDao.updateImage(req.id, function(result) {
        if(result == null) {
            res.status(400).json({status: 'Xoá avatar thất bại'});
        }
        else {
            res.status(200).json({status: 'Thành công'});
        }
    });
} 

module.exports.deleteProfile = async function(req, res) {
    try {
        await userDao.deleteProfile(req.id);
        res.json(200).end('Xóa thành công')
    }
    catch(err) {
        console.log(err);
        res.json(400).end('Thất bại')
    }
} 