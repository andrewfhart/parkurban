/**
 * ParkUrban - Mobile Web Application
 *
 * Parking inventory search and reservations
 *
 * This file contains the controller information for all of the web application
 * views related to finding a parking spot, and making and extending a 
 * reservation. 
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
var schema   = require('../schema');
var auth     = require('../auth');
var util     = require('util');
var request  = require('request');

exports.routes = function (app, req, res) {

    /**
     * Main search view (slippy map & address box)
     *
     **/
    app.get('/search' /*, auth.verifyLogin*/, function (req, res) {
    res.render('park/search.jade',{
      pageLabel:'Search'
      , activeTab:'search'
    });
    });

    /**
     * Local endpoint for ParkUrban search API
     *
     * This is used to mitigate the "same origin" policy that most browsers
     * implement which prevents loading of JSON resources across domains. The
     * call to the ParkUrban API is made via the "requests" package, and the 
     * response is marshalled through as-is.
     *
     **/
    app.get('/search/inventory/within/:lon1/:lat1/:lon2/:lat2', function (req, res) {
        request.get('http://api.parkurban.com/v1/search/within/'
            + req.params.lon1 + '/'
            + req.params.lat1 + '/'
            + req.params.lon2 + '/'
            + req.params.lat2, function (err, response, body) {
           if (err) res.end(err);
           res.end(body);
        }); 
    });

    /**
     * Spot reservation form
     *
     **/
    app.get('/reserve' /*, auth.verifyLogin*/, function (req, res) {
        res.render('park/reserve.jade',{
          pageLabel:'Reserve your spot'
          , activeTab:'latest'
        });
    });

    /**
     * Post-reservation success view
     *
     **/
    app.get('/success' /*, auth.verifyLogin*/, function (req, res) {
        res.render('park/success.jade',{
          pageLabel:'Success!'
          , activeTab:'latest'
        });
    });

    /**
     * Reservation extension view
     *
     **/
    app.get('/extend' /*, auth.verifyLogin*/, function (req, res) {
        res.render('park/extend.jade',{
          pageLabel:'Extend reservation'
          , activeTab:'latest'
        });
    });
};
