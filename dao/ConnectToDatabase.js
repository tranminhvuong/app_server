var mysql = require('mysql');
var config = require('../configs/config');


console.log('Tên database: ' + config.db_info.database);

var connection = mysql.createPool(config.db_info);

module.exports.getInstance = function(func){
    return connection.getConnection(function(err, tempCont){
        var res=false;
        if(err) {
            tempCont.release();
            console.log('error');
        }
        else {
           // console.log('connected!');
            res = func(tempCont);
            tempCont.release();
        }
    })
}