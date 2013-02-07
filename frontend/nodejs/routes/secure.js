var schema   = require('../schema');
var auth     = require('../auth');
var util     = require('util');

exports.routes = function (app, req, res) {

  app.get('/home', auth.verifyLogin, function (req, res) {
    res.render('secure/home.jade',{
      pageLabel:'My Home'
      , activeTab:'latest'
      , activity: [
        {
            user: {
                id: 'ahart',
                name: 'Andrew Hart',
            },
            location: {
                label: "Woody's Garage",
                zip: 85030,
                lon: -112.000,
                lat: 33.27654
            },
            time: {
                reservationStart: 1360200124,
                reservationEnd: 1360203724
            },
            duration: 1,
            rate: 3.75,
            total: 3.75
        },
        {
            user: {
                id: 'ahart',
                name: 'Andrew Hart',
            },
            location: {
                label: "Woody's Garage",
                zip: 85030,
                lon: -112.000,
                lat: 33.27654
            },
            time: {
                reservationStart: 1360192924,
                reservationEnd: 1360200124
            },
            duration: 2,
            rate: 3.75,
            total: 7.50
        }
      ]
    });
  });
  
  app.get('/locations', auth.verifyLogin, function (req,res) {
    res.render('secure/locations.jade',{
      pageLabel:'My Locations'
      , activeTab: 'locations'
    });
  });
  
  app.get('/location/:id', auth.verifyLogin, function (req,res) {
    res.render('secure/location.jade',{
      pageLabel: 'Woody\'s Garage'
      , activeTab: 'locations'
      , location: {
        id: req.params.id
        , name: 'Woody\'s Garage'
        , address1: '715 7th St'
        , address2: ''
        , city: 'Los Angeles'
        , state: 'CA'
        , zip: '90014'
        , numSpots: 15
        , hours: {
          'mon': {'start': 18, 'end':2}
          , 'tue': {'start': 18, 'end':2}
          , 'wed': {'start': 18, 'end':2}
          , 'thu': {'start': 18, 'end':2}
          , 'fri': {'start': 18, 'end':2}
          , 'sat': {'start': 18, 'end':2}
          , 'sun': {'start': 18, 'end':2}
          }
        , rate: 1.75
        , maxTime: 0
      }
    });
  });
  
  app.get('/revenue', auth.verifyLogin, function (req, res) {
    res.render('secure/revenue.jade', {
      pageLabel: 'My Revenue'
      , activeTab: 'revenue'
    });
  });
  
  app.get('/settings', auth.verifyLogin, function (req, res) {
    res.render('secure/settings.jade', {
      pageLabel: 'My Settings'
      , activeTab: 'settings'
    });
  });
  
  
  
};
