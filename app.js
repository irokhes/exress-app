
var http = require('http');

var express = require('express');

var app = express();

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');


//Views engine setup
app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.static('./files'));
app.use(express.static('./downloads'));

app.use(app.router);

// Add the responseTime middleware
app.use(express.responseTime());

// Add the errorHandler middleware
app.use(express.errorHandler());

app.get('/', function(req,res){
	res.render('index', {title:config.title, message:config.message});
});

app.get('/hello', function(req,res){
	res.render('hello');
});

app.get('/test', function(req,res){
	res.send('this is a test');
});



http.createServer(app).listen(config.port, function(){
	console.log('App started on port ' + config.port);
});

