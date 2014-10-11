// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
//var db = require('./config/db');

// MongoDB Connection
var MongoClient = require('mongodb').MongoClient, 
	Server = require('mongodb').Server
var client = new MongoClient(
	new Server('localhost', 27017, {
		socketOptions: {
			connectTimeoutsMS: 500
		},
		poolSize: 5,
		auto_reconnect: true
		}, 
		{ 
			numberOfRetries: 3,
			retryMilliSeconds: 500
}));
/*
client.open(function(err, client) {
	if(err) {
		console.log("Connection failed through Client Object.");
	} else {
		var db = client.db("test");
		if (db) {
			console.log("Connected via Client Object.");
			db.authenticate("testUserAdmin", "7893c786c64213a1c8c764f82afae", function(err, results){
				if (err){
					console.log("Auth failed...");
					client.close();
					console.log("Connection closed.");
				} else {
					console.log("Authenticated through client object.");

					
					db.logout(function(err, result) {
						if(!err) {
							console.log("Logged out via client object.");
						}
						//client.close();
						//console.log("Connection closed.");

					});
					
				}
			});
		}
	}
});
*/

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app