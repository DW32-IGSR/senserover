//var request = require('request');

exports.get = function(req, res) {
  console.log("go pronostico")
	// Donostia. Zubiri-Manteo
	var url = 'http://api.openweathermap.org/data/2.5/weather?lat=43.3276658&lon=-1.9711435&appid=9358f6f28e6e7ea2e80a71448d0bbfdf';

	var request = require('request');
	request({url:url, json:"true"}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			res.json(body);
			//res.json(body.main.temp)
		} else {
			res.json({error:"request error"});
		}
	})

}