/**
 * Passport + MongoDB Authentication
 *
 * Implements the Passport LocalStrategy authentication strategy for
 * authenticating ParkUrban clients.
 *
 * @author andrew <andrew@datafluency.com>
 **/
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , schema = require('./schema')
  , util = require('util');


exports.configure = function () {
    console.log('configure called. passport is');
    console.log(passport);
    
    console.log("Instructing to use new LocalStrategy...");
    passport.use(new LocalStrategy({
          usernameField: 'mail',
          passwordField: 'password'
        },
        function(mail, password, done) {
        console.log('auth.js:local strategy, looking up user...');
        schema.User.findOne({ mail: mail }, function (err, user) {
          if (err) { 
            console.log('an error occurred...');
            return done(err); 
          }
          if (!user) {
            console.log('unknown user...');
            return done(null, false, { message: 'Unknown user' });
          }
          if (!user.authenticate(password)) {
            console.log('invalid password...');
            return done(null, false, { message: 'Invalid password' });
          }
          console.log('Good user ' + util.inspect(user));
          return done(null, user);
        });
      }
    ));
    
    console.log("Registering serializeUser...");
    passport.serializeUser(function(user, done) {
      console.log('called serializeUser (' + user.mail + ')');
      done(null, user.mail);
    });

    console.log("Registering deserializeUser...");
    passport.deserializeUser(function(id, done) {
      console.log('called deserializeUser (' + id + ')');
      schema.User.findOne({mail: id}, function (err, user) {
        done(err, user);
      });
    });
    
    console.log('passport is now: ');
    console.log(passport);
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
