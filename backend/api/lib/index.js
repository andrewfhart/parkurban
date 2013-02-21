/**
 * ParkUrban - Data API Server
 *
 * Generic utilities common to all API responses
 *
 * This file contains a set of generic functions of potential utility to 
 * many of the API functions in other modules.
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/
exports.respondWithData = function ( request, response, payload) {
  response.serveJSON({
    timestamp: Math.round((+new Date())/1000),
    query: request.querystring,
    resultCount: payload.length,
    status: 'OK',
    results: payload
  });
}
 
exports.respondWithError = function ( request, response, err ) {
  response.serveJSON({
    timestamp: Math.round((+new Date())/1000),
    status: 'ERROR',
    message: (err.message) ? err.message : err
  });
}

exports.respondWithSuccess = function ( request, response, payload ) {
  response.serveJSON({
    timestamp: Math.round((+new Date())/1000),
    status: 'OK',
    result: payload
  });
}
