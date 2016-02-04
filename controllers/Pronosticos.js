//var request = require('request');
//http://openweathermap.org/api
//http://openweathermap.org/current#name
//"name":"San Sebastian","cod":200
//http://openweathermap.org/current#geo

//var delicados = require('../delicados.js');

//http://sense-rover-nohtrim.c9users.io/pronostico
exports.get = function(req, res) {
	console.log("go pronostico");
	// Donostia. Zubiri-Manteo
	//var url = 'http://api.openweathermap.org/data/2.5/weather?lat=43.3276658&lon=-1.9711435&appid=9358f6f28e6e7ea2e80a71448d0bbfdf';
	//var url = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=9358f6f28e6e7ea2e80a71448d0bbfdf';
	//var url = 'http://api.openweathermap.org/data/2.5/weather?id=3110044&appid=9358f6f28e6e7ea2e80a71448d0bbfdf';
	var url = 'http://api.openweathermap.org/data/2.5/weather?id=3110044&appid=' + process.env.API_DEL_TIEMPO;

	var request = require('request');
	request({
		url: url,
		json: "true"
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			res.json(body);
			//res.json(body.main.temp)
		}
		else {
			res.json({
				error: "request error"
			});
		}
	});

};