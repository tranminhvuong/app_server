var destinationDao = require('../dao/destinationDao')
var provinceDao = require('../dao/provinceDao')
var runRecommend = require('../carskit/runRecommend')

module.exports.getInfo = async function(req, res) {
    
    try{
        console.log('get info ' + req.params.destination_id)
        let dest = await destinationDao.getDestinationById(req.params.destination_id);
      //  let province = await provinceDao.getProvinceById(dest.province);
        let image = await destinationDao.getImageByDestination(dest.id);
        let images = [];
        image.forEach(element => {
            images.push(element.url);
        });
        let histories = await destinationDao.getHistoryByDest(req.params.destination_id);
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
        let dests = await destinationDao.getAllShortDestination();
        res.status(200).json(dests);
    }
    catch(err) {
        res.status(400).json({message: 'truy vấn thất bại'});
        console.log(err);
    }
}



module.exports.getRecommend = async function(req, res) {
    let weather = req.body.weather;
    let season = req.body.season;
    let companion = req.body.companion;
    let daytime = req.body.daytime;
    let temperature = req.body.temperature;
    console.log(weather + ' ' + season + ' ' + companion + ' ' + daytime + ' ' + temperature);
    
    try {
        let list;
        let start = Date.now()
        list = await runRecommend.recommend(req.id, req.body);

        let dists = [];
        console.log(list);

        for (let item of list) {
            let dist = await destinationDao.getDestinationById(item.id);
            dist.rating = item.rate.substr(0, 5);
            dists.push(dist);
        }
        console.log('Time elapsed = ' + (Date.now()-start) + ' ms')
        res.status(200).json(dists);
    }
    catch(err) {
        try {
            console.log(err);
            let dists = await destinationDao.getAllDestination();
            let range = 3.0/dists.length;
            let val = 3.0;
            for(let dist of dists) {
                val += getRamdonDouble(range);
                var st = val.toString();
                //console.log(st.substr(0,3));
                dist.rating = st.substr(0, 5);
            }

            res.status(200).json(dists);
        }  
        catch(err){
            console.log(err);
            res.status(400).end('truy vấn thất bại');
        }
    }
    
}

module.exports.getInfoByName = async function(req, res) {

    try {
        let dests = await destinationDao.getDestinationByName(req.params.query);
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

function getRamdonDouble(max) {
    return Math.random() * max;
}

module.exports.getDestinationByProvince = async function(req, res) {
    
    try {
        let dests = await destinationDao.getDestinationByProvince(req.params.province_id);
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

