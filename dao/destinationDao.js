var db = require('./ConnectToDatabase');
var util = require('util')

module.exports.getDestinationById = function(destId) {
    return new Promise((resolve, reject) => {
        db.getInstance(function(connection) {
            var sql = util.format('SELECT * FROM destination WHERE id=%s;', destId);
           // console.log(sql);
    
            connection.query(sql,function(err, result) {
                if(err)  return reject(err);
    
                if(result.length > 0) {
                    return resolve(result[0]);
                }
                reject('không tìm thấy');
            });
        });
    })
}

module.exports.getAllDestination = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance(function(connection) {
            let sql = util.format('SELECT * FROM destination LIMIT 10;');
           // console.log(sql);
    
            connection.query(sql,function(err, result) {
                if(err) return reject(err);
                resolve(result);
            });
        });
    })
}

module.exports.getAllShortDestination = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance(function(connection) {
            let sql = util.format('SELECT id,name,image FROM destination;');
           // console.log(sql);
    
            connection.query(sql,function(err, result) {
                if(err) reject(null);
                resolve(result);
            });
        });
    })
}

module.exports.getDestinationByName = function(query) {
    return new Promise((resolve, reject)=>{
        db.getInstance(function(connection) {
            let sql = util.format("SELECT * FROM destination WHERE name LIKE '%"+query+"%';");
           // console.log(sql);
    
            connection.query(sql,function(err, result) {
                if(err) reject(null);   
                resolve(result);
            });
        });
    })
}


module.exports.getDestinationByProvince = function(provinceId) {
    return new Promise((resolve, reject)=> {
        db.getInstance(function(connection) {
            let sql = util.format("SELECT * FROM destination WHERE province_id = %s;", provinceId);
            
          //  console.log(sql);
            connection.query(sql, function(err, result) {
                if(err) reject(null);
                resolve(result);
            })
        })
    })
}

//--------------------------------------------

module.exports.getHistoryById = function(id) {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = util.format("SELECT * FROM history WHERE id=%s;",id);
          //  console.log(sql)

            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
                if(result.length == 0) return reject('khong tim thay')
                return resolve(result[0]);
            })
        })
    })
}


module.exports.getHistoryByDest = function(id) {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = util.format("SELECT * FROM history WHERE destination=%s;",id);
          //  console.log(sql)

            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
                let histories = new Object;
               // console.log(result)
                for(var x of result) {
                    histories[x.heading] = x.content;
                }
               resolve(histories);
            })
        })
    })
}

module.exports.getImageByDestination = function(destinationId) {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = util.format("SELECT `url` FROM image WHERE destination = %s;", destinationId);
           // console.log(sql);
            conn.query(sql, (err, result) =>{
                if(err) reject(err);
                resolve(result);
            })
        })
    })
}

