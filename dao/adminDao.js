var db = require('./ConnectToDatabase')

module.exports.getTables = function() {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = "show tables";
            conn.query(sql, (err, result) => {
                if(err) return reject(err);
                resolve(result);
            })
        })
    })
}

module.exports.getRows = function(table) {
    return new Promise((resolve, reject) => {
        db.getInstance((conn) => {
            let sql = "show columns from " + table + ";";
            conn.query(sql, (err, result) => {
                if(err) return reject(err);
                resolve(result)
            })
        })
    })
}