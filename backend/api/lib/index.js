/**
 * ParkUrban API Server
 *
 * @author andrew <andrew@datafluency.com>
 *
 **/

exports.makeResponse = function ( request, response, payload) {
  response.serveJSON({
    timestamp: Math.round((+new Date())/1000),
    query: request.querystring,
    resultCount: payload.length,
    results: payload
  });
}
 
exports.handleError = function ( request, response, err ) {
  response.serveJSON({
    success: false,
    message: (err.message) ? err.message : err
  });
}
