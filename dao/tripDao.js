var db = require('./ConnectToDatabase');
var util = require('util')

module.exports.getTripByUser = function(userId) {
    return new Promise((resolve, reject) =>{
        db.getInstance(function(connection) {
            let sql = util.format("SELECT * FROM trip WHERE user = %s LIMIT 10;", userId);
            
           //     console.log(sql);
                connection.query(sql, function(err, trip) {
                    if(err) return reject(err);
                    resolve(trip);
                })
        })
    });
}

module.exports.getTripById = function(userId, tripId, callback) {
    return new Promise((resolve, reject) => {
        db.getInstance(function(connection) {
            var sql = util.format("SELECT * FROM trip WHERE user = %s AND id=%s;", userId, tripId);
            
            //    console.log(sql);
                connection.query(sql, function(err, result) {
                    if(err || result.length==0) return reject(err);
                    return resolve(result[0]);
                })
        })
    })
    
}

module.exports.addTrip = function(userId, body) {
    return new Promise((resolve, reject)=>{
        db.getInstance((conn) => {
            let name = body.name;
            let destination = body.destination_id;
            let date = body.start_date_tx.split('/');
            let date_start_tx = date[2] + '-' + date[1] + '-' + date[0];
            let companion = body.companion;
            let season = body.season;
            let weather = body.weather;
            let daytime = body.daytime;
            let temperature = body.temperature;

            let sql = util.format("INSERT INTO trip(name,user,destination,start_date_tx,"
                            + "companion,season,weather,daytime,temperature" + ") VALUES " 
                            + "('%s',%s,%s,'%s',%s,%s,%s,%s,%s);",name,userId,destination,
                            date_start_tx,companion,season,weather,daytime,temperature);
            
           // console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
               // console.log(result)
                if(result.effectRows == 0) return reject('thêm thất bại');
                resolve('thêm thành công');
            })
        })
    })
}

module.exports.voteTrip = function(id, tripId, rating) {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = util.format("UPDATE trip SET rate=%s WHERE id=%s AND user=%s;",rating,tripId,id);
         //   console.log(sql);

            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
                if(result.changedRows == 0) return reject('không thể update');
                return resolve('thành công');
            })
        })
    })
}

//----------------------------------------------

module.exports.removeTrip = function(id, tripId) {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = util.format("DELETE FROM trip WHERE user=%s AND id=%s;",id,tripId)
         //   console.log(sql)

            conn.query(sql,(err, result) => {
                if(err) return reject(err);
                console.log(result);
                resolve('xóa thành công')
            })
        })
    })
}

module.exports.updateTripName = function(id, tripId, name) {
    return new Promise((resolve, reject) =>{
        db.getInstance((conn) => {
            let sql = util.format("UPDATE trip SET name='%s' WHERE id=%s AND user=%s;",name,tripId,id);
          //  console.log(sql)

            conn.query(sql, (err, result) =>{
                if(err) return reject(err);
                if(result.changedRows == 0) return reject('cập nhật thất bại');
                resolve('cập nhật thành công')
            })
        })
    })
}

//------------------------------------

module.exports.getSeason = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM season;");
           // console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err) return reject(err);
                resolve(result);
            })
        })        
    })
}

module.exports.getCompanion = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM companion;");
           // console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result);
            })
        })        
    })
}

module.exports.getWeather = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM weather;");
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result);
            })
        })        
    })
}


module.exports.getDaytime = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM daytime;");
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result);
            })
        })        
    })
}

module.exports.getTemperature = function() {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM temperature;");
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result);
            })
        })        
    })
}


//----------------------------------

module.exports.getSeasonById = function(seasonId) {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM season WHERE id=%s;", seasonId);
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result[0]);
            })
        })        
    })
}

module.exports.getCompanionById = function(compId) {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM companion WHERE id=%s;", compId);
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result[0]);
            })
        })        
    })
}

module.exports.getWeatherById = function(weatherId) {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM weather WHERE id=%s;", weatherId);
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result[0]);
            })
        })        
    })
}


module.exports.getDaytimeById = function(daytimeId) {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM daytime WHERE id=%s;", daytimeId);
            //console.log(sql);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result[0]);
            })
        })        
    })
}

module.exports.getTemperatureById = function(tempId) {
    return new Promise((resolve, reject)=> {
        db.getInstance((conn)=>{
            let sql = util.format("SELECT * FROM temperature WHERE id=%s;", tempId);
            conn.query(sql, (err, result)=>{
                if(err)  return reject(err);
                resolve(result[0]);
            })
        })        
    })
}
