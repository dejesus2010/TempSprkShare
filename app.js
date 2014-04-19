// includes
var express  = require('express'),
    http = require('http');

var app = express();

app.configure(function() {

    app.set('port', process.env.PORT || 5000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view cache', false);

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.urlencoded());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'mahSecret' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public' ) );

    // this will be the 404 middle ware because is at the end when nothing matches the url
    app.use(function (req, res) {
        console.log(req.url);
        res.send(404, 'nope.... 404')
    });

});

// setup the routes
require('./routes/index.js')(app);

// template for delete and promote posts base on the shares count
function update() {

    console.log("Delete bad Posts");

    setTimeout(update, 86400000);
}
update();

// sync the database models
http.createServer(app).listen(app.get('port'), function(){
    console.log("Listening on port " + app.get('port'));
});