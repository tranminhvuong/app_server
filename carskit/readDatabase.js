var fs = require('fs')
var config = require('../configs/config')
var db = require('../dao/ConnectToDatabase')
var util = require('util')

readSql = function(conn, val) {
    return new Promise((resolve, reject) => { 
        let sql = util.format("SELECT * FROM %s;", val);
        console.log(sql)
        conn.query(sql, (err, result) =>{
            if(err) return reject(err);
            return resolve(result);
        })
    })
}

readVariables = function (conn) {
    return new Promise(async (resolve, reject) => {
        try {
            let map = new Object;
            map.weather = await readSql(conn, 'weather');
            map.companion = await readSql(conn, 'companion');
            map.season= await readSql(conn, 'season');
            map.daytime = await readSql(conn, 'daytime');
            map.temperature = await readSql(conn, 'temperature');
            return resolve(map);
        }
        catch(err) {
            return reject(err);
        }
    })
}

module.exports.getMap = function() {
    return new Promise((resolve, reject) =>{
        db.getInstance(async (conn)=>{
            try {
                let res = await readVariables(conn);
                resolve(res);
            }
            catch(err) {
                reject(err);
            }
        })
    })
}

module.exports.readDatabase = function() {
    return new Promise((resolve, reject) => {
        db.getInstance(async (conn) => { 
            try {
                let map = await readVariables(conn);
                let sql = util.format("SELECT * FROM trip WHERE rate!=0;");

                conn.query(sql, (err, result) => {
                    if(err) return reject(err);
                    let dest;
                    if(result.length > 0) dest = result[0].destination;
                    
                    let content = 'userid,itemid,rating';
                    for(let header in map) content += ',' + header;
                    content += '\n';

                    for(let line of result) {
                        content += line.user + ',';
                        content += line.destination + ',';
                        content += line.rate;
                        for(let header in map) {
                            content += ',' + map[header][line[header]-1].code;
                        }
                        content += '\n';
                    }
                    console.log(content)
                    fs.writeFileSync(__dirname + '\\' + config.ratingFile, content);
                    resolve(map);
                })
            }
            catch(err) {
                return reject(err);
            }
        })
    })
}

module.exports.writeStdinTest = function (userId, body) {
    return new Promise((resolve, reject) => {
        db.getInstance(async (conn) => { 
            try {
                let map = await readVariables(conn);
                let sql = util.format("SELECT * FROM trip ORDER BY RAND() LIMIT 1;");

                conn.query(sql, (err, result) => {
                    if(err) return reject(err);
                    let dest;
                    if(result.length > 0) dest = result[0].destination;
                    else return reject('lỗi');
                    
                    let content = 'userid,itemid,rating';
                    for(let header in map) content += ',' + header;
                    content += '\n';
                    content += userId + ',';
                    content += dest + ',';
                    content += body.rate;
                    for(let header in map) {
                        content += ',' + map[header][body[header]-1].code;
                    }
                    content += '\n';
                    resolve(content);
                })
            }
            catch(err) {
                return reject(err);
            }
        })
    })
}

module.exports.readRecommend = function(data) {
    return new Promise((resolve, reject) => {
        try {
            let res = [];

            let dsplit = data.split(': ');
            let line = dsplit[1];
            line = '), ' + line + ', (';
            let recs = line.split('), (');
        
            for(let i=1; i<recs.length-1; i++) {
                let line = recs[i].split(', ');
                res.push({id:line[0], rate: line[1]});
            }

            resolve(res);
        }
        catch(err){
            reject(err);
        }
    })
}