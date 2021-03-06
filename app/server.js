'use strict';

var express = require('express');
var routes = require('./routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var connect = require('connect');
var path = require('path');

var exphbs  = require('express-handlebars');

var app = express();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main',extname:'.handlebars',layoutsDir:__dirname+'/views/layouts'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance. 
});

require('dotenv').load();
require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
