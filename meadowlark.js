var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3000);

app.get('/',function(req,res){
	res.type('text/plain');
	res.send('Meadowlark travel');
})

app.get('/about',function(req,res){
	res.type('text/plain');
	res.send('about Meadowlark travel');
})

//set 404
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
})

//set 500
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
})

app.listen(app.get('port'),function(){
	console.log('Express started on port ' + app.get('port') + '. press ctrl+C to terminate.')
})
