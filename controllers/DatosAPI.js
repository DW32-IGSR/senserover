var Dato = require("../models/Dato");
var Producto = require("../models/Productos");
var Alertas = require("../models/Alertas");
var Drones = require("../models/Drones");
var Usuario = require("../models/Usuario");

var validadarAPI = require('./validadarAPI');
var estructura_email = require('./Estructura_Email');

// Búsqueda de TODOS los datos
exports.findDatos = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos
	Dato.find({}, function(err, datos) {
		//if(err) res.send(500, err.message);
		if (err) return console.error(err);

		console.log("GET - /datos");
		res.send(datos);

		/*console.log('GET /datos')
    		res.status(200).jsonp(datos);*/
	});
};

// Búsqueda de datos por ID_DRON
exports.findDatosById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);
	if (validado) {
		Dato.find({
			id_dron: id_dron
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /datos/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda de datos de temperatura por ID_DRON
exports.findDatosTempById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/56992dd0c8bdac92101a7766/temperatura
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);
	if (validado) {
		Dato.find({
			id_dron: id_dron
		}, {
			temperatura: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /datos/:id_dron/temperatura");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda de datos de humedad por ID_DRON
exports.findDatosHumById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/56992dd0c8bdac92101a7766/humedad
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Dato.find({
			id_dron: id_dron
		}, {
			humedad: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /datos/:id_dron/humedad");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda de datos de co2 por ID_DRON
exports.findDatosCo2ById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/56992dd0c8bdac92101a7766/co2
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Dato.find({
			id_dron: id_dron
		}, {
			co2: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /datos/:id_dron/co2");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda de datos de radiación por ID_DRON
exports.findDatosRadById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/56992dd0c8bdac92101a7766/radiacion
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Dato.find({
			id_dron: id_dron
		}, {
			radiacion: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /datos/:id_dron/radiacion");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda de datos de luminosidad por ID_DRON
exports.findDatosLumById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/56992dd0c8bdac92101a7766/luminosidad
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Dato.find({
			id_dron: id_dron
		}, {
			luminosidad: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /datos/:id_dron/luminosidad");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas por ID_DRON
exports.findMinMaxDronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas de temperatura por ID_DRON
exports.findMinMaxTempDronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/temp/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, {
			temperatura: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/temp/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas de humedad por ID_DRON
exports.findMinMaxHumDronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/hum/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, {
			humedad: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/hum/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas de co2 por ID_DRON
exports.findMinMaxCo2DronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/co2/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, {
			co2: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/co2/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas de radiacion por ID_DRON
exports.findMinMaxRadDronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/rad/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, {
			radiacion: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/rad/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas de luminosidad por ID_DRON
exports.findMinMaxLumDronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/lum/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, {
			luminosidad: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/lum/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// Búsqueda del rango de alertas de bateria por ID_DRON
exports.findMinMaxBatDronId = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/alertas/rango/bat/56992dd0c8bdac92101a7766
	//Hacemos un find en la base de datos de la collección Dato
	var id_dron = req.params.id_dron;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Alertas.find({
			id_dron: id_dron
		}, {
			bateria: 1
		}, function(err, drones) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			console.log("GET - /alertas/rango/bat/:id_dron");
			res.send(drones);
		});
	}
	else {
		return res.redirect('/404');
	}
};

// INSERCIÓN
exports.addDato = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/datos/put/56992dd0c8bdac92101a7766/t/22/h/40/co2/11/r/20/l/20/b/25
	//Hacemos un insert en la base de datos de la collección Dato
	//ejemplo
	//http://sense-rover-nohtrim.c9users.io/datos/put/5693998f4c3faa7e218027ce/t/66/h/66/co2/66/r/66/l/66
	//resultado

	var id_dron = req.params.id_dron;
	var temperatura = req.params.temperatura;
	var humedad = req.params.humedad;
	var co2 = req.params.co2;
	var radiacion = req.params.radiacion;
	var luminosidad = req.params.luminosidad;
	var bateria = req.params.bateria;
	var latitud = req.params.latitud;
	var longitud = req.params.longitud;

	// Validacion por servidor
	//var validado = validadarAPI.APIinsertar(req, res);
	//if (validado) {
	//en pruebas socket
	var io = req.app.io;
	//io.emit('chat '+id_dron, temperatura, humedad, co2, radiacion, luminosidad, bateria);
	io.sockets.in(id_dron).emit('updatechat', temperatura, humedad, co2, radiacion, luminosidad, bateria);
	console.log("addDato socket: chat " + id_dron + " datos: " + temperatura + " " + humedad + " " + co2 + " " + radiacion + " " + luminosidad + " " + bateria);
	//en pruebas

	var fecha = new Date();
	var fecha = fecha.setHours(fecha.getHours() + 1);
	//console.log("fecha en milisegundos " + fecha)
	var fecha = new Date(fecha);
	console.log("fecha +1 " + fecha);

	//console.log(d)
	// 2015-12-03 11:39:09
	var fecha2 = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
	//console.log("fecha2:"+fecha2)

	console.log("prueba put " + id_dron + " temperatura: " + temperatura + " humedad: " + humedad + " co2: " + co2 + " radiacion: " + radiacion + " luminosidad: " + luminosidad + " fecha: " + fecha2);

	Drones.find({
		_id: id_dron
	}, function(err, drones) {
		if (err) {
			console.error(err);
		}
		else {
			console.log(drones);
			if (drones != undefined || drones != null) {

				var dato = new Dato({
					id_dron: id_dron,
					temperatura: temperatura,
					humedad: humedad,
					co2: co2,
					radiacion: radiacion,
					luminosidad: luminosidad,
					bateria: bateria,
					latitud: latitud,
					longitud: longitud,
					fecha: fecha2
				});

				console.log("GET - /api/datos/");
				//guardar dato en la base de datos
				dato.save(function(err) {
					if (err) {
						console.log('save error', err);
					}
					else {
						//mensaje de ok si se guarda en bd
						res.send('Dato guardado correctamente');

						// ALERTAS

						// Variables para mensajes de alertas
						var msg_temp = "";
						var msg_hum = "";
						var msg_co2 = "";
						var msg_rad = "";
						var msg_lum = "";
						var msg_bat = "";
						var msg_total;
						var alerta;

						//var msg_temp, msg_hum, msg_co2, msg_rad, msg_lum, msg_bat, msg_total, alerta;

						Alertas.find({
							id_dron: id_dron
						}, function(err, alertas) {
							if (err) return console.error(err);

							if (alertas[0].recibir_alertas) {
								if (temperatura < alertas[0].temperatura.min || temperatura > alertas[0].temperatura.max) {
									alerta = true;
									//msg_temp = Alertas.mensaje_alerta('temperatura', temperatura, alertas[0].temperatura.min, alertas[0].temperatura.max);
									//console.log(msg_temp)
									msg_temp = '<br>La temperatura está fuera del rango indicado';
									msg_temp += '<br>La temperatura actual es de <span style="color:red">' + temperatura + '</span> y el rango es de ' + alertas[0].temperatura.min + ' a ' + alertas[0].temperatura.max;
									//console.log(msg_temp);	
								}
								if (humedad < alertas[0].humedad.min || temperatura > alertas[0].humedad.max) {
									alerta = true;
									msg_hum = '<br><br>La humedad está fuera del rango indicado';
									msg_hum += '<br>La humedad actual es de <span style="color:red">' + humedad + '</span> y el rango es de ' + alertas[0].humedad.min + ' a ' + alertas[0].humedad.max;
									//console.log(msg_hum);	
								}
								if (co2 < alertas[0].co2.min || co2 > alertas[0].co2.max) {
									alerta = true;
									msg_co2 = '<br><br>El co2 está fuera del rango indicado';
									msg_co2 += '<br>El co2 actual es de <span style="color:red">' + co2 + '</span> y el rango es de ' + alertas[0].co2.min + ' a ' + alertas[0].co2.max;
									//console.log(msg_co2);	
								}
								if (radiacion < alertas[0].radiacion.min || radiacion > alertas[0].radiacion.max) {
									alerta = true;
									msg_rad = '<br><br>La radiacion está fuera del rango indicado';
									msg_rad += '<br>La radiacion actual es de <span style="color:red">' + radiacion + '</span> y el rango es de ' + alertas[0].radiacion.min + ' a ' + alertas[0].radiacion.max;
									//console.log(msg_rad);	
								}
								if (luminosidad < alertas[0].luminosidad.min || luminosidad > alertas[0].luminosidad.max) {
									alerta = true;
									msg_lum = '<br><br>La luminosidad está fuera del rango indicado';
									msg_lum += '<br>La luminosidad actual es de <span style="color:red">' + luminosidad + '</span> y el rango es de ' + alertas[0].luminosidad.min + ' a ' + alertas[0].luminosidad.max;
									//console.log(msg_lum);	
								}
								if (bateria < alertas[0].bateria.min) {
									alerta = true;
									msg_bat = '<br><br>La bateria está por debajo del rango indicado';
									msg_bat += '<br>La bateria actual es de <span style="color:red">' + bateria + '</span> y el rango es de ' + alertas[0].bateria.min;
									//console.log(msg_bat);	
								}
							}

							if (alerta) {
								//busqueda de correo y envio
								Usuario.find({
									_id: drones[0].id_usuario
								}, function(err, usuarios) {
									var nombre_remitente = 'Sense-Rover';
									var email_remitente = 'dw32igsr@gmail.com';
									var nombre_destinatario = usuarios[0].usuario;
									var email_destinatario = usuarios[0].email;
									var asunto = 'Alertas del dron: ' + drones[0].nombre;

									var cabecera = 'Hola ' + nombre_destinatario + '!<br><br>';
									var nombre_dron = 'Estado del <b>' + drones[0].nombre + '</b><br>';
									var firma = '<br><br><font size="1">El equipo de Sense-Rover</font>';

									msg_total = cabecera + nombre_dron + msg_temp + msg_hum + msg_co2 + msg_rad + msg_lum + msg_bat + firma;

									estructura_email.estructura_email(req, res, nombre_remitente, email_remitente, nombre_destinatario, email_destinatario, asunto, msg_total);

									//console.log(msg_total);
								});
							}
						});
					}
				});
			}
			else {
				// No muestra mensaje ni va a /
				//res.send('Error a la hora de guardar')
				/*console.log("GET - /datos/put/");
				console.log('Error. Id_dron no encontrado');
				res.redirect('/');*/
			}
		}
	});
	/*} else {
		return res.redirect('/404');
	}*/
};


exports.addDatoPost = function(req, res) {
	console.log('POST add Datos');

	var fecha = new Date();
	var fecha = fecha.setHours(fecha.getHours() + 1);
	var fecha = new Date(fecha);

	var fecha2 = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

	var dato = new Dato({
		id_dron: req.body.id_dron,
		temperatura: req.body.temperatura,
		humedad: req.body.humedad,
		co2: req.body.co2,
		radiacion: req.body.radiacion,
		luminosidad: req.body.luminosidad,
		bateria: req.body.bateria,
		fecha: fecha2
	});

	//var http = require('http').Server(router);
	//var io = require('socket.io')(http);
	/*
	var io = require('socket.io')();
	
	io.on('connection', function(socket){  
	  console.log('a user connected');
	});  	
	*/

	//en pruebas socket
	var io = req.app.io;
	//io.emit('chat '+dato.id_dron, dato.temperatura, dato.humedad, dato.co2, dato.radiacion, dato.luminosidad, dato.bateria);
	io.sockets.in(dato.id_dron).emit('updatechat', dato.temperatura, dato.humedad, dato.co2, dato.radiacion, dato.luminosidad, dato.bateria);
	console.log("addDato post socket: chat " + dato.id_dron + " datos: " + dato.temperatura + " " + dato.humedad + " " + dato.co2 + " " + dato.radiacion + " " + dato.luminosidad + " " + dato.bateria);
	//en pruebas	

	// Validacion por servidor
	var validado = validadarAPI.APIinsertar(req, res);

	if (validado) {
		dato.save(function(err, datos) {
			if (err) return res.send(500, err.message);
			res.status(200).jsonp(datos);
				//res.json({ message: 'durante el guardado' });
		});

	}
	else {
		return res.redirect('/404');
	}
};

// --- PRODUCTOS ---
// Búsqueda de todos los productos
exports.findProductos = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/productos
	Producto.find({}, function(err, productos) {
		//if(err) res.send(500, err.message);
		if (err) return console.error(err);

		console.log("GET - /productos");
		res.send(productos);

		/*console.log('GET /datos')
    		res.status(200).jsonp(datos);*/
	});
};

// Búsqueda de producto por ID_PRODUCTO
exports.findProductosById = function(req, res) {
	//http://sense-rover-nohtrim.c9users.io/productos/5693763ce1c6519a11733804
	//Hacemos un find en la base de datos de la collección Dato
	var id_producto = req.params.id_producto;

	// Validacion por servidor
	var validado = validadarAPI.API(req, res);

	if (validado) {
		Producto.find({
			_id: id_producto
		}, function(err, productos) {

			if (err) return console.error(err);
			//Obtenemos un array de drones (objetos json)
			//console.log('');
			console.log("GET - /productos/:id_producto");
			res.send(productos);
		});
	}
	else {
		return res.redirect('/404');
	}
};