var db = require('./ConnectToDatabase');
var util = require('util')

module.exports.findOne = function(username) {
    return new Promise((resolve, reject)=>{
        db.getInstance(function(connection) {
            var sql = "SELECT * FROM userlogin WHERE username = '" + username + "';";
        //    console.log(sql);
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
            var sql = util.format("SELECT * FROM userlogin WHERE username='%s' AND password='%s';",username,password);
         //   console.log(sql);
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

            let sql = util.format('INSERT INTO userlogin(username,password,firstname,lastname)'
                    + " VALUES('%s','%s','%s','%s');",username,password,firstname,lastname);
         //   console.log(sql);
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
            let sql = "SELECT * FROM userlogin WHERE id = " + userId + ";";
         //   console.log(sql);
    
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
            var sql = util.format("UPDATE userlogin SET password='%s' WHERE id=%s AND password='%s';", pnew, userId, pold);
        //    console.log(sql);
    
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
        var sql = util.format("UPDATE userlogin SET firstname='%s', lastname='%s' WHERE id=%s;", firstname, lastname, userId);
      //  console.log(sql);

        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.updateImage = function(userId, image, callback) {
    db.getInstance(function(connection) {
        var sql = util.format("UPDATE userlogin SET image='%s' WHERE id=%s;", image, userId);
      //  console.log(sql);

        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.deleteImage = function(userId, callback) {
    db.getInstance(function(connection) {
        var sql = util.format("UPDATE userlogin SET image=NULL WHERE id=%s;", userId);
     //   console.log(sql);

        connection.query(sql, function(err, result) {
            if(err || result.changedRows == 0) return callback(null);
            return callback('ok');
        });
    })
}

module.exports.deleteProfile = function(userId, callback) {
    return new Promise((resolve, reject) => {
        db.getInstance(function(connection) {
            var sql = util.format('DELETE userlogin WHERE id=%s;', userId);
      //      console.log(sql);
    
            connection.query(sql, function(err, result) {
                if(err || result.changedRows == 0) return reject(err);
                return resolve('ok');
            });
        })
    })
    
}
