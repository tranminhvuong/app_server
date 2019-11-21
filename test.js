var db = require('./dao/ConnectToDatabase')

let start = Date.now()
db.getInstance((conn) => {
    let sql = "SELECT getRandomRateId();"
    conn.query(sql, (err, result)=>{
        if(err) throw err;

        console.log(Object.values(result[0]))
    })
})
