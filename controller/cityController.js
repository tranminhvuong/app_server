var cityDao = require('../dao/cityDao')
var provinceDao = require('../dao/provinceDao')


module.exports.getInfo = async function(req, res) {
    
    try{
        console.log('get info ' + req.params.destination_id)
        let dest = await cityDao.getDestinationById(req.params.destination_id);
      //  let province = await provinceDao.getProvinceById(dest.province);
        let image = await destinationDao.getImageByDestination(dest.id);
        let images = [];
        image.forEach(element => {
            images.push(element.url);
        });
        let histories = await cityDao.getHistoryByDest(req.params.destination_id);
        histories['Tên địa điểm'] = dest.name;
        dest.visited = false;
        //dest.province = province;
        dest.images = images;
        dest.histories = histories;
        res.status(200).json(dest);
    }
    catch(err) {
        res.status(400).json({message: 'truy vấn thất bại'});
        console.log(err);
    }
}

module.exports.getAllShortInfo = async function(req, res) {

    try {
        console.log('get all short info')
        let dests = await cityDao.getAllShortDestination();
        res.status(200).json(dests);
    }
    catch(err) {
        res.status(400).json({message: 'truy vấn thất bại'});
        console.log(err);
    }
}


module.exports.getInfoByName = async function(req, res) {

    try {
        let dests = await cityDao.getDestinationByName(req.params.query);
        res.status(200).json(dests);
    }
    catch(err) {
        res.status(400).json({message: 'truy vấn thất bại'});
        console.log(err);
    }    
}

module.exports.getTenCities = async function(req, res) {

  try {
      let dests = await cityDao.getTenCities(req.params.query);
      res.status(200).json(dests);
  }
  catch(err) {
      res.status(400).json({message: 'truy vấn thất bại'});
      console.log(err);
  }    
}


function getRamdonDouble(max) {
    return Math.random() * max;
}

module.exports.getDestinationByProvince = async function(req, res) {
    
    try {
        let dests = await cityDao.getDestinationByProvince(req.params.province_id);
        for(let dest of dests) {
            let province = await provinceDao.getProvinceById(dest.province);
            dest.province = province;
        }

        res.status(200).json(dests);
    }
    catch(err) {
        res.status(400).json({message: 'truy vấn thất bại'});
        console.log(err);
    }
}

