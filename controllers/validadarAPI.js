exports.API = function(req, res, dato) {

    // Validacion por servidor
	req.checkParams('dato', 'La ID dron es requerida.').notEmpty();
	req.checkParams('dato', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('dato', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
    
	var errors = req.validationErrors();
    
    console.log(errors);
    
    if (errors) {
      //req.flash('error', errors);
      //return res.redirect('/');
    }
};