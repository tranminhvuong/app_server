var db = require('./ConnectToDatabase');
var util = require('util');

module.exports.getProvinceById = function(provinceId) {
    return new Promise((resolve, reject) => {
        db.getInstance((connection) => {
            let sql = util.format("SELECT * FROM province WHERE id = %s;", provinceId);
            //console.log(sql);

            connection.query(sql, (err, result)=> {
                if(err)  return reject(err);
                if(result.length > 0)  return resolve(result[0]);
                reject(null);
            })
        })
    })
}