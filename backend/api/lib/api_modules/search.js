/**
 * ParkUrban - Data API Server
 *
 * Inventory search
 *
 * This file contains implementations for various methods of searching for
 * inventory in the database. None of the routes defined here modifies the 
 * database in any way. Thus, by convention, these routes exclusively support
 * GET requests.
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
var util   = require('util');
var Api    = require('../');
var Schema = require('../schema');

exports.Search = {
  options: {
    
  },
  
  /**
   * Simple, self-serving splash page for those curious visitors who happen
   * to visit the root of the API server 
   **/
  splash: {
    get: function (request, response) {
      request.resume(),
      request.once('end', function () {
        response.serveJSON({
          "Greetings!":"This is the ParkUrban Data Search API",
          "For more information": "Please visit http://www.parkurban.com/"});
      });
    }
  },
  
  /**
   * Search for inventory by US Zip-code
   *
   **/
  zip: {
    get: function (request, response) {
      request.resume();
      request.once('end', function () {
        Schema.Inventory.find({zip:request.querystring.zip}, function(err, docs) {
          if (err) Api.respondWithError(request, response, err);
          if (!docs) Api.respondWithError(request, response, "An internal error occurred.");
          Api.respondWithData(request, response, docs);
        });
      });
    }
  },
  
  /**
   * Search for inventory by point-radius search around the provided [longitude, 
   * latitude] pair. The default value used for the optional variable radius is 
   * 1 mile (under the assumption that most people will not be interested in 
   * walking more than that distance to their destination. See the corresponding 
   * route in routes.json for the expected ordering of the three variables.
   *
   **/
  latlon: {
    get: function (request, response) {
      request.resume();
      request.once('end', function () {
        var lon = Number(request.querystring.lon);
        var lat = Number(request.querystring.lat);
        var rad = (request.querystring.radius) ? Number(request.querystring.radius) : 1;
        Schema.Inventory.find({ 'loc': { '$within': {'$centerSphere': [[lon,lat],rad/3963.192]}}}, function(err,docs) {
          if (err) Api.respondWithError(request,response,err);
          Api.respondWithData(request,response,docs);
        });
      });
    }
  },
  
  /**
   * Search for inventory within a rectangular bounding box specified by two
   * [longitude, latitude] pairs. See the corresponding route in routes.json
   * for the expected odering of the four variables.
   *
   **/
  within: {
    get: function (request, response) {
      request.resume();
      request.once('end', function () {
        var lon1 = Number(request.querystring.lon1);
        var lon2 = Number(request.querystring.lon2);
        var lat1 = Number(request.querystring.lat1);
        var lat2 = Number(request.querystring.lat2);
        var box  = [ [lon1,lat1], [lon2,lat2] ];
        
        Schema.Inventory.find({ 'loc': { '$within': {'$box': box}}}, function(err, docs) {
          if (err) Api.respondWithError(request, response, err);
          console.log(docs);
          Api.respondWithData(request, response, docs);
        });
      });
    }
  }
}
