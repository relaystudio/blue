var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , less = require('less-middleware')
  , path = require('path');

var app = module.exports = express();

var poet = require("poet")(app);


poet.set({
  postsPerPage : 3,
  posts        : __dirname + '/posts',
  metaFormat   : 'json'
}).init(function ( locals ) {
  // locals.postList.forEach(function ( post ) {
  //   // We can iterate over each post and alter
  //   // its properties, add new fields, custom
  //   // preview formatter or format the dates
  // });
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(less({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use( poet.middleware() );
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler());
});



app.get( '/week/:post?', function ( req, res ) {
  if(!post) req.params.post = 1;
  var post = req.poet.getPost( 'week' + req.params.post );
  if ( post ) {
    res.render( 'blog/weekly', { post: post, nav: "week", title: "GoLab : " + post.title  }); 
  } else {
    res.send(404);
  }
});

app.get( '/tag/:tag', function ( req, res ) {
  var taggedPosts = req.poet.postsWithTag( req.params.tag );
  if ( taggedPosts.length ) {
    res.render( 'tag', {
      posts : taggedPosts,
      tag : req.params.tag
    });
  }
});

app.get( '/category/:category', function ( req, res ) {
  var categorizedPosts = req.poet.postsWithCategory( req.params.category );
  if ( categorizedPosts.length ) {
    res.render( 'category', {
      posts : categorizedPosts,
      category : req.params.category
    });
  }
});

app.get( '/page/:page', function ( req, res ) {
  var page = req.params.page,
    lastPost = page * 3
  res.render( 'page', {
    posts : req.poet.getPosts( lastPost - 3, lastPost ),
    page : page
  });
});

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
