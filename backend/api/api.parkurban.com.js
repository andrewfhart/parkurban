var ApiServer    = require('apiserver'),
    SearchModule = require('./lib/api_modules/search').Search,
    ReservationsModule = require('./lib/api_modules/reservations').Reservations,
    BillingModule = require('./lib/api_modules/billing').Billing,
    routes       = require('./routes');

var apiServer = new ApiServer({port:3019})

// Middleware
apiServer.use(ApiServer.payloadParser());

// Modules
apiServer.addModule('1', 'search', SearchModule);
apiServer.addModule('1', 'reservations', ReservationsModule);
apiServer.addModule('1', 'billing', BillingModule);

// Routing
apiServer.router.addRoutes(routes);


// Events
apiServer.on('requestStart', function (pathname, time) {
  console.info(' ☉ :: start    :: %s', pathname)
}).on('requestEnd', function (pathname, time) {
  console.info(' ☺ :: end      :: %s in %dms', pathname, time)
}).on('error', function (pathname, err) {
  console.info(' ☹ :: error    :: %s (%s)', pathname, err.message)
}).on('timeout', function (pathname) {
  console.info(' ☂ :: timedout :: %s', pathname)
});


apiServer.listen();
console.info('ParkUrban API server started on port 3019.');
