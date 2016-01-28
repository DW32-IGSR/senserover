exports.API = function(req, res) {
  
  var errors;
  
  // Validacion por servidor
  if (req.params.id_dron!=undefined){
  	req.checkParams('id_dron', 'La ID dron es requerida.').notEmpty();
  	req.checkParams('id_dron', 'La ID dron no es de MONGO.').isMongoId();
    req.checkParams('id_dron', 'La ID dron no cumple con la cantidad de caracteres.').len(24,24);
      
  	errors = req.validationErrors();
  	
  } else if (req.params.id_producto!=undefined){
  	req.checkParams('id_producto', 'La ID producto no es requerida.').notEmpty();
  	req.checkParams('id_producto', 'La ID producto no es de MONGO.').isMongoId();
    req.checkParams('id_producto', 'La ID producto no cumple con la cantidad de caracteres.').len(24,24);
    
    errors = req.validationErrors();
  } else {
    return false;
  }
    console.log(errors)
    
    if (errors) {
      //req.flash('error', errors);
      //return res.redirect('/');
      return false;
    } else { return true; }
}