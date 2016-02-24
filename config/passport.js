var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var moment = require('moment');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var Usuario = require("../models/Usuario");

passport.serializeUser(function(user, done) {
    //console.log('Entro a serializeUser '+ user.id);
    console.log('Entro a serializeUser');
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('Entro al deserializeUser');
  Usuario.findById(id, function(err, user) {
    if (user.validated) {
      console.log('Validate true');
      
      var fecha = moment().utcOffset("+0000").format("Y-MM-DD HH:mm:ss");

      console.log('ultima conexion: ' + user.ultima_conexion);
      
      if (user.ultima_conexion == undefined) {
        Usuario.findOneAndUpdate({
          _id: id
        }, {
          ultima_conexion: fecha
        }, function(err, user) {
          if (err) throw err;
          //res.redirect('/perfil');
          done(err, user);
        });
      }
      else {
        Usuario.findOneAndUpdate({
          _id: id
        }, {
          ultima_conexion: fecha
        }, function(err, user) {
          if (err) {
            throw err;
          }
          done(err, user);
          //res.redirect(req.get('referer'));
        });
      }

    } else {
      console.log('Validate false');
    }
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  email = email.toLowerCase();
  console.log('Entro al passport.use');
  Usuario.findOne({ email: email }, function(err, user) {
    if (!user) {
      //console.log('error');
      return done(null, false, { message: 'Email ' + email + ' not found'});
    }
    user.comparePassword(password, function(err, isMatch) {
      console.log('Entro a comparePassword');
      if (isMatch) {
        //console.log('match');
        return done(null, user);
      } else {
        //console.log('mismatch');
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));


/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    Usuario.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
        //req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        console.log('There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
        done(err);
      } else {
        Usuario.findById(req.user.id, function(err, user) {
          user.nombre = user.profile.name || profile.displayName;
          
          user.google = profile.id;
          user.validated = true;
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.usuario = user.profile.name || profile.displayName;
          //user.profile.gender = user.profile.gender || profile._json.gender;
          user.avatar = user.profile.picture || profile._json.image.url;
          user.save(function(err) {
            //req.flash('info', { msg: 'Google account has been linked.' });
            console.log('Google account has been linked.');
            done(err, user);
          });
        });
      }
    });
  } else {
    Usuario.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
          //console.log('Entro 2');
        return done(null, existingUser);
      }
      Usuario.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          //req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          console.log('There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.');
          done(err);
        } else {
          var user = new Usuario();
          user.nombre = profile.displayName;
          
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.validated = true;
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.usuario = profile.displayName;
          //user.profile.gender = profile._json.gender;
          user.avatar = profile._json.image.url;
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
}));


/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  console.log('Entro a isAuthenticated el 1')
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  console.log('Entro a isAuthorized el 2')
  var provider = req.path.split('/').slice(-1)[0];
  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};