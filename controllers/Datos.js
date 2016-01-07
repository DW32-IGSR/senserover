// https://carlosazaustre.es/blog/como-crear-una-api-rest-usando-node-js/
// https://github.com/carlosazaustre/node-api-rest-example/tree/feature-express4

// --- Para API (Sin comprobar) ---

var mongoose = require('mongoose');
var Dato  = mongoose.model('Dato');

//GET - Return all tvshows in the DB
exports.findAllDatos = function(req, res) {
	Dato.find(function(err, datos) {
        if(err) res.send(500, err.message);
    
        console.log('GET /datos')
    		res.status(200).jsonp(datos);
	});
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	Dato.findById(req.params.id, function(err, datos) {
    if(err) return res.send(500, err.message);

    console.log('GET /dato/' + req.params.id);
		res.status(200).jsonp(datos);
	});
};

//POST - Insert a new TVShow in the DB
exports.addDato = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var dato = new Dato({
	    temperatura: req.body.temperatura,
        humedad: req.body.humedad,
        co2: req.body.co2,
        radiacion: req.body.radiacion,
        luminosidad: req.body.luminosidad,
        fecha: req.body.fecha,
	});

	dato.save(function(err, dato) {
		if(err) return res.send(500, err.message);
		
        res.status(200).jsonp(dato);
	});
};

//PUT - Update a register already exists
exports.updateDato = function(req, res) {
	Dato.findById(req.params.id, function(err, dato) {
		dato.temperatura   = req.body.temperatura;
		dato.humedad    = req.body.humedad;
		dato.co2 = req.body.co2;
		dato.radiacion  = req.body.radiacion;
		dato.luminosidad = req.body.luminosidad;
		dato.fecha   = req.body.fecha;

		dato.save(function(err) {
			if(err) return res.send(500, err.message);
			
            res.status(200).jsonp(dato);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteDato = function(req, res) {
	Dato.findById(req.params.id, function(err, dato) {
		dato.remove(function(err) {
			if(err) return res.send(500, err.message);
			
            res.status(200);
		})
	});
};