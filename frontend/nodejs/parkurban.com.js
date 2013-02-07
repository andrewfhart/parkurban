
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , secure = require('./routes/secure')
  , user = require('./routes/user')
  , park = require('./routes/park')
  , auth = require('./auth')
  , http = require('http')
  , path = require('path');
  
  
auth.configure();

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3020);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('b07(3B3jc37zDe,384b=9#{3dx37s;32gfj'));
  app.use(express.session());
  app.use(auth.passport.initialize());
  app.use(auth.passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/users', user.list);

// -- Registration ---------------------------------------
app.get('/register', user.register_get);
app.post('/register', user.register_post);

// -- Authentication -------------------------------------
app.get('/login',  user.login_get);
app.post('/login', auth.passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureFlash: true }), 
    function (req,res) { res.redirect('/search');});
app.get('/logout', function(req, res){req.logout();res.redirect('/');});

// -- Secured Pages --------------------------------------
secure.routes(app);

// -- Parking Search and Reservations Pages --------------
park.routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
