var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jms-web',
  password : 'nfSRXE9e7Q9XVT98',
  database	   : 'jms'
});
//Add Static Directory
app.use('/assets', express.static(__dirname+'/assets'));
//
app.get('/', function (req, res) {
	res.sendfile('homepage.html');
});

connection.connect();
app.get('/queryJournal/:queries',function(req,res){
	//connection.connect();
	var queries = req.params.queries;
	connection.query('SELECT * FROM `book` WHERE jname LIKE \'%'+queries+'%\'', function(err, rows, fields) {
		if (err)
			console.log(err);
  		res.send(rows);	
	});
	//connection.end();
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
