var db = require('./ConnectToDatabase');
var util = require('util');

module.exports.findOne = function(username) {
    return new Promise((resolve, reject)=>{
        db.getInstance(function(connection) {
            var sql = "SELECT * FROM adminlogin WHERE username = '" + username + "';";
            connection.query(sql,function(err, result) {
                if(err) return reject(err);
                if(result.length > 0) return resolve(result[0]);
                reject('không tìm thấy');
            });
        });
    })
}


module.exports.findUserByPassword = function(username, password) {
    return new Promise((resolve, reject)=>{
        db.getInstance(function(connection) {
            var sql = util.format("SELECT * FROM adminlogin WHERE username='%s' AND password='%s';",username,password);
            connection.query(sql, function(err, result) {
                if(err) return reject(err);
                if(result.length > 0) return resolve(result[0]);
                reject('truy vân thất bại');
            });
        });
    })
}

module.exports.createUser = function(body) {
    return new Promise((resolve, reject)=>{
        db.getInstance((conn) => {
            var username = body.email;
            var password = body.password;
            var firstname = body.firstname;
            var lastname = body.lastname;

            let sql = util.format('INSERT INTO adminlogin(username,password,firstname,lastname)'
                    + " VALUES('%s','%s','%s','%s');",username,password,firstname,lastname);
            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
                if(result.affectedRows == 0) return reject('lỗi truy vấn');
                resolve(result);
            })
        })
    })
}

module.exports.getUserInfo = function(userId) {
    return new Promise((resolve, reject)=>{
        db.getInstance(function(connection) {
            let sql = "SELECT * FROM adminlogin WHERE id = " + userId + ";";
            connection.query(sql, function(err, result) {
                if(err) return reject(err);
                if(result.length > 0) {
                    result[0].password = undefined;
                    return resolve(result[0]);  
                } 
                reject('không tìm thấy');
            });
        });
    })
    
}

module.exports.updatePass = function(userId, pold, pnew) {
    return new Promise((resolve, reject) => {
        db.getInstance(function(connection) {
            var sql = util.format("UPDATE adminlogin SET password='%s' WHERE id=%s AND password='%s';", pnew, userId, pold);
            connection.query(sql, function(err, result) {
                if(err) {
                    console.log('co loi')
                    return reject(err);
                }
                
                if(result.changedRows == 0) return reject('truy vấn thất bại');
                resolve(result);
            });
        })
    })
}

module.exports.updateName = function(userId, firstname, lastname, callback) {
    db.getInstance(function(connection) {
        var sql = util.format("UPDATE adminlogin SET firstname='%s', lastname='%s' WHERE id=%s;", firstname, lastname, userId);
        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.updateImage = function(userId, image, callback) {
    db.getInstance(function(connection) {
        var sql = util.format("UPDATE adminlogin SET image='%s' WHERE id=%s;", image, userId);
        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.deleteImage = function(userId, callback) {
    db.getInstance(function(connection) {
        var sql = util.format("UPDATE adminlogin SET image=NULL WHERE id=%s;", userId);
        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.deleteProfile = function(userId, callback) {
    return new Promise((resolve, reject) => {
        db.getInstance(function(connection) {
            var sql = util.format('DELETE FROM adminlogin WHERE id=%s;', userId);
            connection.query(sql, function(err, result) {
                if(err) return reject(err);
                return resolve('ok');
            });
        })
    })
    
}

module.exports.getDestination = function(id){
    return new Promise((resolve, reject)=>{
        db.getInstance(function(connection) {
            let sql = "SELECT * FROM destination WHERE id = " +id + ";";
            connection.query(sql, function(err, result) {
                if(err) return reject(err);
                if(result.length > 0) {
                    return resolve(result[0]);  
                } 
                reject('không tìm thấy');
            });
        });
    })
}

module.exports.updateDesination = function(body, callback){
    db.getInstance(function(connection) {
        var sql = util.format("UPDATE destination SET name='%s', image='%s', background='%s', description='%s', province='%s' WHERE id=%s;", body.name, body.image, body.background, body.description, body.province, body.id);
        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.deleteDestination = function(id, callback) {
    return new Promise((resolve, reject) => {
        db.getInstance(function(connection) {
            var sql = util.format('DELETE FROM destination WHERE id=%s;', idId);
            connection.query(sql, function(err, result) {
                if(err) return reject(err);
                return resolve('ok');
            });
        })
    })
    
}

module.exports.createDestination = function(body) {
    return new Promise((resolve, reject)=>{
        db.getInstance((conn) => {
            var name = body.name;
            var image = body.image;
            var description = body.description;
            var province = body.province;
            var background = body.background;

            let sql = util.format('INSERT INTO destination(name,image,description,province,background)'
                    + " VALUES('%s','%s','%s','%s', '%s');",name, image, description, province, background);
            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
                if(result.affectedRows == 0) return reject('lỗi truy vấn');
                resolve(result);
            })
        })
    })
}