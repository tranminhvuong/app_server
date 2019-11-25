module.exports = {
    'jwtSecret' : 'mvuong',
    'timelimit' : '12h',
    'portId' : 8080,
    'db_info': {
        "connectionLimit": 4,
        "database": "database",
        "host": "database-2.crop2bxde0g8.ap-southeast-1.rds.amazonaws.com",
        "user": "root",
        "password": "csmr2todie"
    },
	'carskit_info' : {
		'host' : function(){
            var arr = ["ec2-13-250-34-150.ap-southeast-1.compute.amazonaws.com",
            "ec2-13-229-83-43.ap-southeast-1.compute.amazonaws.com" ,
            "ec2-18-140-63-13.ap-southeast-1.compute.amazonaws.com"];
            let ind = Math.floor(Math.random()*3 );
            console.log(ind);
            return arr[ind];
        },
		'port' : 8889
	}
}
