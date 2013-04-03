
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , less = require('less-middleware')
  , path = require('path');
//   , appjs = require('appjs');

// var window = appjs.createWindow({
//   width: 1280,
//   height: 960,
//   alpha: false,
// });

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(less({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/proto/:index', function(req, res) {
  res.render( req.params.index + '.jade', { title: 'Express' });
});

app.get('/proto2/:index', function(req, res) {
  res.render( 'p2_' + req.params.index + '.jade', { title: 'Express' });
});

app.get('/heather', function(req, res) {
  res.render('lists', { title: 'Express' });
})

app.get('/heather/:list', function(req, res) {
  res.render('list', { title: 'Express' });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// window.on('create', function(){
//   console.log("Window Created");
//   // window.frame controls the desktop window
//   window.frame.show().center();
// });

// window.on('ready', function(){
//   console.log("Window Ready");
//   // directly interact with the DOM
//   window.process = process;
//   window.module = module;

//   window.addEventListener('keydown', function(e){
//     // show chrome devtools on f12 or commmand+option+j
//     if (e.keyIdentifier === 'F12' || e.keyCode === 74 && e.metaKey && e.altKey) {
//       window.frame.openDevTools();
//     }
//   });
// });

// // cleanup code when window is closed
// window.on('close', function(){
//   console.log("Window Closed");
// });
