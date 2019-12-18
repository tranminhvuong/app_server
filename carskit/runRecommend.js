var config = require('../configs/config')
var read = require('./readDatabase')
var net = require('net');

module.exports.recommend = function(userId, body) {
    return new Promise(async(resolve, reject) => {
        try {
            let map = await read.getMap();
            let header = 'userid,itemid,rating,weather,companion,season,daytime,temperature';
            let testset = 'TEST\n'+header;
            header = header.split(',');
            testset += '\n' + userId + ',5,5';
            for(var i=3; i<header.length; i++) {
                if(body[header[i]] == undefined) testset += ',NA';
                else testset += ',' +  map[header[i]][parseInt(body[header[i]])]
            }
            testset += '\n----------------------------------------\n';

            console.log(testset)
            let client = net.connect(config.carskit_info.port, config.carskit_info.host);
            client.write(testset);
            client.end();

            client.on('data', async (data) => {
                let lines = data.toString().split('\n');
                console.log(lines)
                data = []
    

                let line = lines[1];
                line = line.replace('*','');
                line = line.replace('\r','');
            
                let pos = line.lastIndexOf(')');
                if(pos == -1) pos = line.length-1;
                data.push(line.substring(5, pos+1));
        
                
                if(data.length == 0) {
                    client.destroy();
                    return reject('không thể gợi ý')
                }
                let dataE = await read.readRecommend(data[0]);
                client.destroy();
                return resolve(dataE);
            })
        }
        catch(err) {
            return reject(err);
        }
    })
}
