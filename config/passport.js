var _ = require('lodash');
var passport = require('passport');
var request = require('request');
var session = require('express-session');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var Usuario = require("../models/Usuario");

passport.serializeUser(function(user, done) {
    //console.log('Entro a serializeUser '+ user.id);
    
    
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Usuario.findById(id, function(err, user) {
    done(err, user);
  });
});


/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
    //console.log('Entro 1');
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
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
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
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.image.url;
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
  if (req.isAuthenticated()) {
    return next();
    console.log('llego 1');
  }
  res.redirect('/');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];
    console.log('llego 2');
  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};