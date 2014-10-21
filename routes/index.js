module.exports = function(app) {

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/views/home.html');
	});
	// route for jsonp
	app.get('*', function(req, res) { 
		res.jsonp(req.url);
	});

};
