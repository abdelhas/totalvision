var mongoose = require('mongoose');

module.exports = mongoose.model('Inventory', {
	item : {type : String, default: ''}
});