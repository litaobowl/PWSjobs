// server.js

	// modules =================================================
	var express = require('express');
	var app     = express();
	var mongoose= require('mongoose');
	var http = require('http')
	// configuration ===========================================
	var MONGODB_URI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost", // Make sure to replace that URI with the one provided by MongoLab
    db,
    users;	
	// config files
	var db = require('./config/db');

	var port = process.env.PORT || 8080; // set our port
	//mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
	mongoose.MongoClient.connect(MONGODB_URI, function (err, database) {
	  if (err) throw err;
	  db = database;
	  users = db.collection("users");
	  accounts = db.collection("accounts");
	  var server = app.listen(process.env.PORT || 3000);
	  console.log("Express server started on port %s", server.address().port);
	});
	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 					// log every request to the console
		app.use(express.bodyParser()); 						// have the ability to pull information from html in POST
		app.use(express.methodOverride()); 					// have the ability to simulate DELETE and PUT
	});
	
	
	//post operation
	app.post('/results', function(req, res) {
		var jobkeywords = req.body.jobkeywords;
		console.log("post received: %s", jobkeywords);
	});
	
	app.get('/wines', function(req, res) {
		res.send([{name:'wine1'}, {name:'wine2'}]);
	});
	
	app.get('/wines/:id', function(req, res) {
		res.send({id:req.params.id, name: "The Name", description: "description"});
	});
	
	
	
	// routes ==================================================
	require('./app/routes')(app); // configure our routes

	// start app ===============================================
	app.listen(port);										// startup our app at http://localhost:8080
	console.log('Magic happens on port ' + port); 			// shoutout to the user
	exports = module.exports = app; 						// expose app

	
