exports.API = function(req, res) {

  var errors;

  // Validacion por servidor
  if (req.params.id_dron != undefined) {
    req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
    req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24, 24);

    errors = req.validationErrors();

  }
  else if (req.params.id_producto != undefined) {
    req.checkParams('id_producto', 'La ID producto no es requerida.').notEmpty();
    req.checkParams('id_producto', 'La ID producto no es de MONGO.').isMongoId();
    req.checkParams('id_producto', 'La ID producto no cumple con la cantidad de caracteres.').len(24, 24);

    errors = req.validationErrors();
  }
  else {
    return false;
  }
  console.log(errors);

  if (errors) {
    return false;
  }
  else {
    return true;
  }
};

exports.APIinsertar = function(req, res) {

  var errors;

  // Validacion por servidor
  if (req.body.id_dron != undefined) {
    req.checkBody('id_dron', 'La ID dron es requerida.').notEmpty();
    req.checkBody('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkBody('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24, 24);

    req.checkBody('temperatura', 'La temperatura no esta en decimal.').isDecimal();
    req.checkBody('temperatura', 'La temperatura no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('humedad', 'La humedad no esta en decimal.').isDecimal();
    req.checkBody('humedad', 'La humedad no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('co2', 'El co2 no esta en decimal.').isDecimal();
    req.checkBody('co2', 'El co2 no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('radiacion', 'La radiacion no esta en decimal.').isDecimal();
    req.checkBody('radiacion', 'La radiacion no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('luminosidad', 'La luminosidad no esta en decimal.').isDecimal();
    req.checkBody('luminosidad', 'La luminosidad no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('bateria', 'La bateria no esta en decimal.').isDecimal();
    //req.checkBody('bateria', 'La bateria no cumple con la cantidad de caracteres.').len(1,4); //Hay que mirar como nos envian este dato

    errors = req.validationErrors();
  }
  else {
    return false;
  }
  console.log(errors);

  if (errors) {
    return false;
  }
  else {
    return true;
  }
};

exports.APIDronesUsuario = function(req, res) {

  var errors;

  // Validacion por servidor
  if (req.body.usuario != undefined) {
    req.checkParams('id_usuario', 'La ID usuario es requerida.').notEmpty();
    req.checkParams('id_dron', 'La ID usuario no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID usuario no cumple con la cantidad de caracteres.').len(24, 24);

    errors = req.validationErrors();
  }
  else {
    return false;
  }
  console.log(errors);

  if (errors) {
    return false;
  }
  else {
    return true;
  }
};

exports.APIconfAlertas = function(req, res) {

  var errors;

  // Validacion por servidor
  if (req.body.id_dron_alertas != undefined) {

    req.checkBody('id_dron_alertas', 'La ID dron es requerida.').notEmpty();
    req.checkBody('id_dron_alertas', 'La ID dron no es de MONGO.').isMongoId();
    req.checkBody('id_dron_alertas', 'La ID dron no cumple con la cantidad de caracteres.').len(24, 24);

    req.checkBody('tempMinima', 'La tempMinima no esta en decimal.').isDecimal();
    req.checkBody('tempMinima', 'La tempMinima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('tempMaxima', 'La tempMaxima no esta en decimal.').isDecimal();
    req.checkBody('tempMaxima', 'La tempMaxima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('humMinima', 'La humMinima no esta en decimal.').isDecimal();
    req.checkBody('humMinima', 'La humMinima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('humMaxima', 'La humMaxima no esta en decimal.').isDecimal();
    req.checkBody('humMaxima', 'La humMaxima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('co2Minima', 'El co2Minima no esta en decimal.').isDecimal();
    req.checkBody('co2Minima', 'El co2Minima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('co2Maxima', 'El co2Maxima no esta en decimal.').isDecimal();
    req.checkBody('co2Maxima', 'El co2Maxima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('radMinima', 'La radMinima no esta en decimal.').isDecimal();
    req.checkBody('radMinima', 'La radMinima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('radMaxima', 'La radMaxima no esta en decimal.').isDecimal();
    req.checkBody('radMaxima', 'La radMaxima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('luxMinima', 'La luxMinima no esta en decimal.').isDecimal();
    req.checkBody('luxMinima', 'La luxMinima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('luxMaxima', 'La luxMaxima no esta en decimal.').isDecimal();
    req.checkBody('luxMaxima', 'La luxMaxima no cumple con la cantidad de caracteres.').len(1, 5);

    req.checkBody('batMinima', 'La bateria no esta en decimal.').isDecimal();

    errors = req.validationErrors();
  }
  else {
    return false;
  }
  console.log(errors);

  if (errors) {
    return false;
  }
  else {
    return true;
  }
};