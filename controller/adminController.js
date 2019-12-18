var adminDao = require('../dao/adminDao')

module.exports.register = async function(req, res) {
    try {
        try{
            await adminDao.findOne(req.body.email);
            res.status(400).end('tạo thất bại')
        } catch(err) {
            let admin = await adminDao.createUser(req.body);
            res.status(200).json({id: admin.insertId});
        }
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'truy vấn thất bại'});
    }
}

module.exports.getInfo = async function(req, res) {
    try {
        let admin = await adminDao.getUserInfo(req.id);
        admin.name = admin.firstname + ' ' + admin.lastname;
        admin.password = undefined;
        res.status(200).json(admin);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'truy vấn thất bại'});
    }
}

module.exports.updatePass = async function(req, res) {
    try {
        let result = await adminDao.updatePass(req.id, req.body.old_password, req.body.new_password);
        res.status(200).end("Đổi mật khẩu thành công");
    }
    catch(err) {
        res.status(400).end('Đổi mật khẩu thất bại');
    }
}

module.exports.updateName = function(req, res) {
    adminDao.updateName(req.id, req.body.firstname, req.body.lastname, function(result) {
        if(result == null) {
            res.status(400).json({status: 'Đổi tên thất bại'});
        }
        else {
            res.status(200).json({status: 'Thành công'});
        }
    });
}

module.exports.updateImage = function(req, res) {
    adminDao.updateImage(req.id, req.body.image, function(result) {
        if(result == null) {
            res.status(400).json({status: 'Đổi avatar thất bại'});
        }
        else {
            res.status(200).json({status: 'Thành công'});
        }
    });
}

module.exports.deleteImage = function(req, res) {
    adminDao.updateImage(req.id, function(result) {
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
        await adminDao.deleteProfile(req.id);
        res.json(200).end('Xóa thành công');
    }
    catch(err) {
        console.log(err);
        res.json(400).end('Thất bại');
    }
} 

module.exports.getDestination = async function(req, res) {
    
    try {
        let destination  = await adminDao.getDestination(req.body.id);
        res.status(200).json(destination);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'truy vấn thất bại'});
    }
}

module.exports.updateDestination = function(req, res) {
    adminDao.updateDesination(req.body, function(result) {
        if(result == null) {
            res.status(400).json({status: 'Đổi thông tin điểm đến thất bại'});
        }
        else {
            res.status(200).json({status: 'Thành công'});
        }
    });
}

module.exports.deleteDestination = async function(req, res) {
    try {
        await adminDao.deleteDestination(req.id);
        res.json(200).end('Xóa thành công');
    }
    catch(err) {
        console.log(err);
        res.json(400).end('Thất bại');
    }
} 

module.exports.createDestination = async function(req, res) {
    try {
        let destination = await adminDao.createDestination(req.body);
        res.status(200).json({id: destination.insertId});
    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: 'truy vấn thất bại'});
    }
}