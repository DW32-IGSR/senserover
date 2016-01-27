exports.validadarAPI = function(req, res, id_dron) {

  // Validacion por servidor
	req.checkParams(id_dron, 'La ID dron es requerida.').notEmpty();
	req.checkParams(id_dron, 'La ID dron no es de MONGO.').isMongoId();
  req.checkParams(id_dron, 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      return res.redirect('/');
    }
    
}