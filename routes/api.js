var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
mongoose.connect('mongodb://localhost/maps');

var inventorySchema = mongoose.Schema({ item : 'string', category : 'string' });
var Inventory = mongoose.model('Inventory', inventorySchema, 'inventory');
var mapSchema = new mongoose.Schema({
    geoFeature:GeoJSON.Feature
});
var Map = mongoose.model('Map', mapSchema, 'map');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	// maps json data

	//Define Table here
	exports.inventory = function(req, res) {
  		Inventory.find({}, function(err, obj) {
    			res.json(obj);
			console.log(obj);
  		});
	};
	exports.map = function(req, res) {
                Map.find({}, function(err, obj) {
                        res.json(obj);
                        console.log(obj);
                });
        };

