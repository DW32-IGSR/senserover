var mongoose = require('mongoose')
var Dato  = mongoose.model('Dato')
var Producto  = mongoose.model('Productos')
var Alertas  = mongoose.model('Alertas')
var Drones  = mongoose.model('Drones')

// Búsqueda de TODOS los datos
exports.findDatos = function(req, res) {
	Dato.find({}, function(err, datos) {
        //if(err) res.send(500, err.message);
        if (err) return console.error(err);
        
        console.log("GET - /datos")
        res.send(datos)
    
        /*console.log('GET /datos')
    		res.status(200).jsonp(datos);*/
	})
}

// Búsqueda de datos por ID_DRON
exports.findDatosById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
  req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
	
	Dato.find({ id_dron: id_dron }, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /datos/:id_dron")
		res.send(drones)
	})
}

// Búsqueda de datos de temperatura por ID_DRON
exports.findDatosTempById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
	
	Dato.find({ id_dron: id_dron }, {temperatura: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /datos/:id_dron/temperatura")
		res.send(drones)
	})
}

// Búsqueda de datos de humedad por ID_DRON
exports.findDatosHumById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
	
	Dato.find({ id_dron: id_dron }, {humedad: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /datos/:id_dron/humedad")
		res.send(drones)
	})
}

// Búsqueda de datos de co2 por ID_DRON
exports.findDatosCo2ById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Dato.find({ id_dron: id_dron }, {co2: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /datos/:id_dron/co2")
		res.send(drones)
	})
}

// Búsqueda de datos de radiación por ID_DRON
exports.findDatosRadById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Dato.find({ id_dron: id_dron }, {radiacion: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /datos/:id_dron/radiacion")
		res.send(drones)
	})
}

// Búsqueda de datos de luminosidad por ID_DRON
exports.findDatosLumById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Dato.find({ id_dron: id_dron }, {luminosidad: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /datos/:id_dron/luminosidad")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas por ID_DRON
exports.findMinMaxDronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Alertas.find({ id_dron: id_dron }, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/:id_dron")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas de temperatura por ID_DRON
exports.findMinMaxTempDronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Alertas.find({ id_dron: id_dron }, {temperatura: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/temp/:id_dron")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas de humedad por ID_DRON
exports.findMinMaxHumDronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
	
	Alertas.find({ id_dron: id_dron }, {humedad: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/hum/:id_dron")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas de co2 por ID_DRON
exports.findMinMaxCo2DronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Alertas.find({ id_dron: id_dron }, {co2: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/co2/:id_dron")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas de radiacion por ID_DRON
exports.findMinMaxRadDronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Alertas.find({ id_dron: id_dron }, {radiacion: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/rad/:id_dron")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas de luminosidad por ID_DRON
exports.findMinMaxLumDronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Alertas.find({ id_dron: id_dron }, {luminosidad: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/lum/:id_dron")
		res.send(drones)
	})
}

// Búsqueda del rango de alertas de bateria por ID_DRON
exports.findMinMaxBatDronId = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron
	
	// Validacion por servidor
	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
	Alertas.find({ id_dron: id_dron }, {bateria: 1}, function(err, drones) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /alertas/rango/bat/:id_dron")
		res.send(drones)
	})
}

// INSERCIÓN
exports.addDato = function(req, res) {
	//Hacemos un insert en la base de datos de la collección Dato
	//ejemplo
	//http://sense-rover-nohtrim.c9users.io/datos/put/5693998f4c3faa7e218027ce/t/66/h/66/co2/66/r/66/l/66
	//resultado 
	
	var id_dron = req.params.id_dron
	var temperatura = req.params.temperatura
	var humedad = req.params.humedad
	var co2 = req.params.co2
	var radiacion = req.params.radiacion
	var luminosidad = req.params.luminosidad
	var bateria = req.params.bateria
	
	var fecha = new Date();
	var fecha = fecha.setHours(fecha.getHours()+1)
	//console.log("fecha en milisegundos " + fecha)
	var fecha=new Date(fecha)
	console.log("fecha +1 "+ fecha)
	
	//console.log(d)
	// 2015-12-03 11:39:09
	var fecha2 = fecha.getFullYear()+"-"+fecha.getMonth()+1+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
	//console.log("fecha2:"+fecha2)
	
	console.log("prueba put "+id_dron+" temperatura: "+temperatura+" humedad: "+humedad+" co2: "+co2+" radiacion: "+radiacion+" luminosidad: "+luminosidad+" fecha: " + fecha2)
	
	Drones.find({_id: id_dron}, function(err, drones) {
		if (err) {
			console.error(err)
		} else {
			console.log(drones)
			/*if (drones != undefined) {
				
				var dato = new Dato({ id_dron : id_dron, temperatura : temperatura, humedad : humedad, co2: co2, radiacion : radiacion, luminosidad: luminosidad, bateria: bateria, fecha : fecha2})
	
				console.log("GET - /datos/put/");
				//guardar dato en la base de datos
				dato.save(function (err) {
					if (err) {
					  console.log('save error', err)
					} else{
					  //mensaje de ok si se guarda en bd
					  res.send('Dato guardado correctamente')
					}
				})
			} else {
				res.send('Error a la hora de guardar')
				/*console.log("GET - /datos/put/");
				console.log('Error. Id_dron no encontrado')
				res.redirect('/');
			}*/
		}
	})
}

/*

exports.addDato = function(req, res) {
	//Hacemos un insert en la base de datos de la collección Dato
	//ejemplo
	//http://sense-rover-nohtrim.c9users.io/datos/put/5693998f4c3faa7e218027ce/t/66/h/66/co2/66/r/66/l/66
	//resultado 
	
	var id_dron = req.params.id_dron
	var temperatura = req.params.temperatura
	var humedad = req.params.humedad
	var co2 = req.params.co2
	var radiacion = req.params.radiacion
	var luminosidad = req.params.luminosidad
	var bateria = req.params.bateria
	
	var fecha = new Date();
	var fecha = fecha.setHours(fecha.getHours()+1)
	//console.log("fecha en milisegundos " + fecha)
	var fecha=new Date(fecha)
	console.log("fecha +1 "+ fecha)
	
	//console.log(d)
	// 2015-12-03 11:39:09
	var fecha2 = fecha.getFullYear()+"-"+fecha.getMonth()+1+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
	//console.log("fecha2:"+fecha2)
	
	console.log("prueba put "+id_dron+" temperatura: "+temperatura+" humedad: "+humedad+" co2: "+co2+" radiacion: "+radiacion+" luminosidad: "+luminosidad+" fecha: " + fecha2)
	
	var dato = new Dato({ id_dron : id_dron, temperatura : temperatura, humedad : humedad, co2: co2, radiacion : radiacion, luminosidad: luminosidad, bateria: bateria, fecha : fecha2})
	
	console.log("GET - /datos/put/");
	//guardar dato en la base de datos
	dato.save(function (err) {
		if (err) {
		  console.log('save error', err)
		} else{
		  //mensaje de ok si se guarda en bd
		  res.send('Dato guardado correctamente')
		}
	})
}

*/

/*exports.addDatoPost = function(req, res) {
	console.log('POST add Datos')
	console.log(req.body)

	var dato = new Dato({
		id_dron: req.body.id_dron,
		temperatura: req.body.temperatura,
		humedad: req.body.humedad,
		co2: req.body.co2,
		radiacion: req.body.radiacion,
		luminosidad: req.body.luminosidad,
		bateria: req.body.bateria,
		fecha: req.body.summary
	});

	Dato.save(function(err, datos) {
		if(err) return res.send(500, err.message)
    	res.status(200).jsonp(datos)
	})
}*/

// --- PRODUCTOS ---
// Búsqueda de todos los productos
exports.findProductos = function(req, res) {
    Producto.find({}, function(err, productos) {
        //if(err) res.send(500, err.message);
        if (err) return console.error(err);
        
        console.log("GET - /productos")
        res.send(productos)
    
        /*console.log('GET /datos')
    		res.status(200).jsonp(datos);*/
	})
}

// Búsqueda de producto por ID_PRODUCTO
exports.findProductosById = function(req, res) {
	//Hacemos un find en la base de datos de la collección Dato
	var id_producto = req.params.id_producto
	
	// Validacion por servidor
	req.checkParams('id_producto', 'La ID dron es requerida.').notEmpty();
	req.checkParams('id_producto', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_producto', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
	
	Producto.find({ _id: id_producto }, function(err, productos) {
	
		if (err) return console.error(err);
	 	//Obtenemos un array de drones (objetos json)
	 	console.log("GET - /productos/:id_producto")
		res.send(productos)
	})
}