/**
 * ParkUrban - Mobile Web Application
 *
 * Application user authentication
 *
 * Implements the Passport LocalStrategy authentication strategy for
 * authenticating ParkUrban clients to the mobile web application.
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , schema = require('./schema')
  , util = require('util');


exports.configure = function () {

    passport.use(new LocalStrategy({
          usernameField: 'mail',
          passwordField: 'password'
        },
        function(mail, password, done) {
        schema.User.findOne({ mail: mail }, function (err, user) {
          if (err) { 
            return done(err); 
          }
          if (!user) {
            return done(null, false, { message: 'Unknown user' });
          }
          if (!user.authenticate(password)) {
            return done(null, false, { message: 'Invalid password' });
          }
          return done(null, user);
        });
      }
    ));
    
    passport.serializeUser(function(user, done) {
      done(null, user.mail);
    });

    passport.deserializeUser(function(id, done) {
      schema.User.findOne({mail: id}, function (err, user) {
        done(err, user);
      });
    });
};

// Export the main Passport object
exports.passport = passport;

// Middleware to verify login on secured pages
exports.verifyLogin = function (req, res, next) {
    console.log('verifyLogin called...');
    console.log('session is:');
    console.log(req.session);
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
