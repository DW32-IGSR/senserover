var mongoose = require('mongoose')
var Drones  = mongoose.model('Drones')

//GET - Return all tvshows in the DB
/*exports.findDronesById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Drones
    var id_dron = req.params.id_dron
    Drones.find({ _id: id_dron}, function(err, drones) {
        if (!drones) {
          res.statusCode = 404;
          res.send({ error: 'Not found' });
        }
        if (!err) {
          res.send(drones);
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          res.send({ error: 'Server error' });
        }
    });
};*/

exports.findDronesById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Drones
    var id_dron = req.params.id_dron
    Drones.find({ _id: id_dron}, function(err, drones) {
        if (err) return console.error(err);
        //Obtenemos un array de drones (objetos json)
        console.log("GET - /drones/:id");
    	res.send(drones);
    });
};