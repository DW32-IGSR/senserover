exports.index = function(req, res) {
    //ruta de pagina principal
    //console.log('Valor user: '+req.user);
    var sess = req.session;
    var user = req.user;
    //console.log(user);
    //console.log('EL USER ID: '+user.profile.name);
    
     if (user == "" || user == undefined) {
         
        if(sess.usuario == "" || sess.usuario == undefined){
            //console.log('sess estar vacio: '+ sess);
            res.render('index');
         } else {
             //render de index con idicadores de sesion iniciada
            //
            var usuario = {
                nombre_usuario: sess.usuario
            };
            res.render('index', usuario);
         }
         
     }  else { 
         
        //console.log('Creando session usuario: '+ user);
        var usuarioGoogle = {
            nombre_usuarioGoogle: user.profile.name,
            avatarGoogle: user.profile.picture
        };
        res.render('index', usuarioGoogle);
    }
        
    /*var sess = req.session;
    if (sess.usuario == "" || sess.usuario == undefined) {
        res.render('index', {
            expressFlash: req.flash('error'),
            sessionFlash: res.locals.sessionFlash
        });
    }
    else {
        //
        //render de index con idicadores de sesion iniciada
        //
        var usuario = {
            nombre_usuario: sess.usuario
        };
        res.render('index', usuario);
    }*/
};

exports.destroySession = function(req, res) {
    //borrar datos de sesion
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("sesion cerrada");
            res.redirect('/');
        }
    });
};