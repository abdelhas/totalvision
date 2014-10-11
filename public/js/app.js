var app = angular.module("MapViz", ['ui-rangeSlider', "leaflet-directive"]);

app.controller("MapController", [ "$scope", "$log", "leafletData", function($scope, $log, leafletData) {
    angular.extend($scope, {
        london: {
            lat: 40.01,
            lng: -91.58203125,
            zoom: 4
        }
    });

    $scope.showLeaflet = function() {
        leafletData.getMap().then(function(map) {
            map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
        });
    };

}]);

app.controller('YearController',
	function YearController($scope, $http) {
		// values for the slider
		function link($scope) { 
			$scope.$watch("slider.year", function(value) {
				console.log('Get this Year: ' + value + ' Data')
			});
		}
		link($scope)
		$scope.slider = {
			year: 2011
		};

		$http.get('/api/inventory')
		.success(function(data) {
			$scope.inventory = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ');
		});
	}
);

	







app.controller('FirstCtrl', function($scope) {
		$scope.data = {message: "Hello"};
	});

app.directive('slider', function(){
	return {
		restrict: 'E',
		template: "<div>Here I am, rocking like a huricane</div>"
	}
});

app.controller('DataController',
	function DataController($scope) {
		$scope.data = {
			y2012: 'Data for 2012 goes here.'
		};
	} 
);

app.directive('mapSection', function() {
	return {
		template: 'Year 2099' //'<div id="map"></div>'
	}
});

