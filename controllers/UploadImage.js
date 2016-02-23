var Usuario = require("../models/Usuario");

exports.upload = function(req, res, next) {
  
    if (req.file == '' || req.file == undefined) {
      console.log('El archivo no es una imagen');
      res.redirect('/perfil');
    } else {
      var img_split = req.file.path.split('/');
      var img_bd = '/'+img_split[1]+'/'+img_split[2];
      Usuario.findOneAndUpdate({_id: req.body.id_usuario}, {avatar: img_bd}, function(err, usuario) {
        if (err) {
            console.error(err);
        }
        else {
          console.log('Archivo guardado');
          res.redirect('/perfil');
          //res.send({message:'Archivo guardado', file:req.file});
        }
      });
    }
}
