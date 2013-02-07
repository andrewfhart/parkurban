/**
 * ParkUrban API Server
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
  zip: {
    get: function (request, response) {
      request.resume();
      request.once('end', function () {
        Schema.Inventory.find({zip:request.querystring.zip}, function(err, docs) {
          if (err) Api.handleError(request, response, err);
          if (!docs) Api.handleError(request, response, "An internal error occurred.");
          Api.makeResponse(request,response,docs);
        });
      });
    }
  },
  latlon: {
    get: function (request, response) {
      request.resume();
      request.once('end', function () {
        var lon = Number(request.querystring.lon);
        var lat = Number(request.querystring.lat);
        var rad = (request.querystring.radius) ? Number(request.querystring.radius) : 1;
        Schema.Inventory.find({ 'loc': { '$within': {'$centerSphere': [[lon,lat],rad/3963.192]}}}, function(err,docs) {
          if (err) Api.handleError(request,response,err);
          Api.makeResponse(request,response,docs);
        });
      });
    }
  }
}
