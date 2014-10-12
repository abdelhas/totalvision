angular.module('InvService', []).factory('Inventory', ['$http', function($http) {

	return {
		// call to get all nerds
		get : function() {
			return $http.get('/api/inventory');
		}
	}
	
}]);
