var Inventory = require('./models/inventory');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	//Define Table here

	app.get('/api/inventory', function(req, res) {

		// use mongoose to get all todos in the database

		Inventory.find(function(err, docs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)
			console.log(docs)
			res.json(docs); // return all todos in JSON format
		});
	});
	
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/home.html');
	});

};
