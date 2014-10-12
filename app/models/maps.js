var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');


module.exports = mongoose.model('Maps', {
	geoFeature:GeoJSON.Feature	
});
