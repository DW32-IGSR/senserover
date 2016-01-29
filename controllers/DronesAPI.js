var mongoose = require('mongoose');
var Drones  = mongoose.model('Drones');
var Producto  = mongoose.model('Productos');

var validadarAPI = require('./validadarAPI');

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

// Búsqueda de dron por ID_DRON
exports.findDronesById = function(req, res) {
  //http://sense-rover-nohtrim.c9users.io/drones/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Drones
    var id_dron = req.params.id_dron;
    
	// Validacion por servidor
	var validado = validadarAPI.API(req, res);
	if (validado) {
        Drones.find({ _id: id_dron}, function(err, drones) {
            if (err) return console.error(err);
            //Obtenemos un array de drones (objetos json)
            console.log("GET - /drones/:id");
        	res.send(drones);
        });
	} else {
		return res.redirect('/404');
	}
};

//en proceso
exports.datosProductoPorIdDron = function(req, res) {
  //ejemplo https://sense-rover-nohtrim.c9users.io/datos/producto/5693998f4c3faa7e218027ce
	//Hacemos un find en la bd colleccion drones para sacar id producto
	var id_dron = req.params.id_dron;
	
	// Validacion por servidor
	var validado = validadarAPI.API(req, res);
	if (validado) {
    	console.log("id buscada "+id_dron);
    	Drones.find({ _id: id_dron }, function(err, dron) {
    		if (err) return console.error(err);
    		
    		//console.log("dron encontrado api "+dron)
    		//console.log("dron encontrado api 2 "+dron[0].id_producto)
    		Producto.find({ _id: dron[0].id_producto}, function(err, producto) {
    			//Hacemos un find en la bd colleccion producto
    			if (err) return console.error(err);
    			
    		 	//Obtenemos un array de drones (objetos json)
    		 	//console.log("producto encontrado api "+producto)
    		 	console.log("GET - /datos/producto/:id_dron");
    		 	res.send(producto);
    		});
    	});
	} else {
		return res.redirect('/404');
	}
};

// Búsqueda de dron por ID_USUARIO
exports.findDronesUsuarioById = function(req, res) {
  //http://sense-rover-nohtrim.c9users.io/drones/usuario/568e13ff15c98a4154e4a8a4
	//Hacemos un find en la base de datos de la collección Drones
    var id_usuario = req.params.id_usuario;
    
	// Validacion por servidor
	var validado = validadarAPI.APIDronesUsuario(req, res);
	if (validado) {
        
        Drones.find({ id_usuario: id_usuario}, function(err, dronesUsuario) {
            if (err) return console.error(err);
            //Obtenemos un array de drones (objetos json)
            console.log("GET - /drones/:id_usuario");
            console.log(dronesUsuario);
        	res.send(dronesUsuario);
        });
	} else {
		return res.redirect('/404');
	}
};

//PUT - Update a register already exists
// FALTA VALIDAR POR SERVIDOR
exports.updateDronName = function(req, res) {
	Drones.findById(req.params.id_dron, function(err, drone) {
	  //Drones.find({ _id: req.params.id_dron}, function(err, drone) {
		drone.title   = req.body.nombre;

		drone.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(drone);
		});
	});
};