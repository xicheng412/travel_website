var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

//set view engine as handlebars, notice package name is express, but require express3-handlebars
var handlebars = require('express3-handlebars').create({
	defaultLayout: 'main',
	helpers: {
		section: function(name, options) {
			if (!this._sections) {
				this._sections = {};
			}
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//static directory, it must be decleared before all the router
app.use(express.static(__dirname + '/public'));

//check env.PORT and set port
app.set('port', process.env.PORT || 3000);

//for weather plugin
app.use(function(req, res, next) {
	if (!res.locals.pratials) {
		res.locals.partials = {};
	}
	res.locals.partials.weather = getWeatherData();
	next();
});

//set router for index page and about page
app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about', {
		fortune: fortune.getFortune()
	});
});

//experiment to see headers
app.get('/header', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for (var name in req.headers) s += name + ':' + req.headers[name] + '\n';
	res.send(s);
});

//post experiment
app.use(require('body-parser').urlencoded({ extended: false }));
app.get('/newsletter', function(req, res) {
	res.render('newsletter', {
		csrf: 'CSRF token goes here'
	});
});
app.post('/process', function(req, res) {
	console.log('Form:' + req.query.form);
	console.log('CSRF token' + req.body._csrf);
	console.log('Name' + req.body.name);
	console.log('email' + req.body.email);
	res.redirect(303, '/thank-you');
})

//form
app.get('/post', function(req, res) {
	res.render('post');
});
app.get('/pc', function(req, res) {
	console.log(req.body);
	//res.redirect(303,'/');
});

//set 404
app.use(function(req, res) {
	res.status(400);
	res.render('404');
});

//set 500
app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(500);
	res.render('500');
});



app.listen(app.get('port'), function() {
	console.log('Express started on port ' + app.get('port') + '. press ctrl+C to terminate.');
});

function getWeatherData() {
	return {
		locations: [{
			name: 'Portland',
			forecastUrl: 'asfasdf',
			iconUrl: 'skfjewoiahoijdg',
			weather: 'Overcast',
			temp: '12.3 C',
		}, {
			name: 'bend',
			forecastUrl: 'asfasdf',
			iconUrl: 'skfjewoiahoijdg',
			weather: 'partly cloud',
			temp: '23.3 C',
		}, {
			name: 'manzaneta',
			forecastUrl: 'asfasdf',
			iconUrl: 'skfjewoiahoijdg',
			weather: 'Light Rain',
			temp: '1.3 C',
		}]
	};
}