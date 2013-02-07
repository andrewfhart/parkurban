/**
 * Parking Inventory Search and Reservations
 *
 * @author ahart <andrew@datafluency.com>
 **/
var schema   = require('../schema');
var auth     = require('../auth');
var util     = require('util');

exports.routes = function (app, req, res) {

  app.get('/search' /*, auth.verifyLogin*/, function (req, res) {
    res.render('park/search.jade',{
      pageLabel:'Search'
      , activeTab:'search'
    });
  });
  
  app.get('/reserve' /*, auth.verifyLogin*/, function (req, res) {
    res.render('park/reserve.jade',{
      pageLabel:'Reserve your spot'
      , activeTab:'latest'
    });
  });
  
  app.get('/success' /*, auth.verifyLogin*/, function (req, res) {
    res.render('park/success.jade',{
      pageLabel:'Success!'
      , activeTab:'latest'
    });
  });
  
  app.get('/extend' /*, auth.verifyLogin*/, function (req, res) {
    res.render('park/extend.jade',{
      pageLabel:'Extend reservation'
      , activeTab:'latest'
    });
  });
  
};
