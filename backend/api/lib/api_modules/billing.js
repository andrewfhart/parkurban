/**
 * ParkUrban - Data API Server
 *
 * Information and actions related to the financial aspects of the service 
 *
 * This file contains implementations for all requests for information, and
 * all actions, that pertain to the financial aspects of the ParkUrban service.
 * While actual billing is handled by a third party processor, some information
 * along with records and logs is kept by ParkUrban for internal accounting and
 * verification purposes.  
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
var util   = require('util');
var Api    = require('../');
var Schema = require('../schema');

exports.Billing = {
  options: {
    
  },
  
  /**
   * Execute a charge for the requested amount against the account of the 
   * user whose id is provided in the request body. 
   *
   **/
  charge: {
    post: function (request, response) {
      request.resume(),
      request.once('end', function () {
        
        // Obtain information about the charge to be made
        var amount = request.body.amount;
        var uid    = request.body.uid
        
        // TODO: Make Payment via payment processor
        // TODO: On success, insert entry into 'transactions' collection
        
        // Return success message with transaction info.
        Api.respondWithSuccess(request,response, {
            uid: uid,
            amount: amount
        });
      });
    }
  }
}
