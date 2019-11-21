var adminDao = require('../dao/adminDao')

module.exports.getRowsDB = async function(req, res) {
    try{
        let row = await adminDao.getTables();
        let rows = new Object
        for(let a of row) {
            let name = a.Tables_in_doancnm_database
            let table = await adminDao.getRows(name);
            let arr = []
            for(let item of table) {
               // console.log(item)
                arr.push(item.Field)
            }
            rows[name] = arr
        }
        res.status(200).json(rows)
    }
    catch(err) {
        console.log(err);
        res.status(400).end('không tìm thấy')
    }
}
