var express = require('express');
var fortune = require('./lib/fortune.js')

var app = express();

//set view engine as handlebars, notice package name is express, but require express3-handlebars
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//static directory, it must be decleared before all the router
app.use(express.static(__dirname + '/public'));

//check env.PORT and set port
app.set('port',process.env.PORT || 3000);

//set router for index page and about page
app.get('/',function(req,res){
	res.render('home');
})

app.get('/about',function(req,res){
	res.render('about',{ fortune : fortune.getFortune() });
})

//set 404
app.use(function(req,res){
	res.status(400);
	res.render('404');
})

//set 500
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
})

app.listen(app.get('port'),function(){
	console.log('Express started on port ' + app.get('port') + '. press ctrl+C to terminate.')
})

