/**
 * ParkUrban - Data API Server
 *
 * Reservation processing
 *
 * This file contains implementations for all actions and requests for 
 * information that pertain to reservations made using the service.
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
var util   = require('util');
var Api    = require('../');
var Schema = require('../schema');

exports.Reservations = {
  options: {
    
    
  },
  /**
   * Reserve a spot for the specified time period. 
   *
   * This function orchestrates the entire reservation process, including 
   * communication with the billing API, required to fully reserve a spot on
   * behalf of the user whose id was provided in the request body.
   **/
  reserve: {
    post: function (request, response) {
      request.resume(),
      request.once('end', function () {
        
        // Ensure valid inventory
        Schema.Inventory.findOne({_id: request.body.spot}, function (err, spot) {
            if (err) return Api.respondWithError(request, response, err);

            // Ensure valid user
            Schema.User.findOne({_id: request.body.user}, function (err,user) {
                if (err) return Api.respondWithError(request, response, err);
                
                // Create a Reservation document
                reservation = new Schema.Reservation({
                    _owner: user._id,
                    _spot:  spot._id,
                    start: request.body.start,
                    duration: request.body.duration
                });
                
                // Persist to the database
                reservation.save( function (err) {
                    if (err) return Api.respondWithError(request, response, err);
                    
                    // POST a request to the billing API
            
                    // POST a request to the inventory API
                    
                    // Create a new 'actions' record
                  
                    // Send success message
                    Api.respondWithSuccess(request, response);
                });
            });
        });
      });
    }
  }
}

