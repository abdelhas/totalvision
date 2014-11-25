var app = angular.module("MapViz", ['ui-rangeSlider', "leaflet-directive"]);
// Service to transfer Controls Into Map
app.factory('Slider', function () {
    var data =
        {
            Year: ''
        };
    
    return {
        getYear: function () {
            return data.Year;
        },
        setYear: function (year) {
            data.Year = year;
        }
    };
});


app.controller('UIController', function($rootScope, $scope, $http, Slider) {

        $scope.yearChange = function(){
                $scope.$watch('slider.year', function (newValue) {
                        if (newValue) {
                                Slider.setYear(newValue);
                        }
                });
        };
        $scope.slider = {
                year: 2012
        };
});

app.controller("MapController", [ "$scope", "$log", "$http", "leafletData","Slider", function($scope, $log, $http, leafletData, Slider) {

// Control Tool

    var tilesDict = {
        _2012: {
            url: "http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png" 
        },
	_2041: {
            url: "http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2041/{z}/{x}/{y}.png"
        },
	_2070: {
            url: "http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2070/{z}/{x}/{y}.png"
        },
	_2099: {
            url: "http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2099/{z}/{x}/{y}.png"
        },
        opencyclemap: {
	    name: 'opencyclemap',
	    type: 'xyz',
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
                attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            }
        }
    };


//Station 1
$scope.$watch(function () { return Slider.getYear(); }, function (newValue) {
	if (newValue) {
		$scope.year = newValue;
		//console.log('Ctrl 2: ' + newValue);	
		//console.log('Tiles: ' + tiles);
		$scope.tiles = tilesDict['_'+$scope.year];
	} else {
		tiles = 'opencyclemap';
	};
});

// Leaflet MouseOver Control
$scope.zone = "";
$scope.$on('leafletDirectiveMap.utfgridMouseover', function(event, leafletEvent) {
	$scope.zone = leafletEvent.data.zone;
});

$scope.$on('leafletDirectiveMap.utfgridMouseout', function(event, leafletEvent) {
	$scope.zone = "";
});
// Leaflet Click Control
$scope.$on('leafletDirectiveMap.utfgridClick', function (e) {
});



$scope.swipe = {};
$scope.$watch(function () { return $scope.swipe.range; }, function (newValue) {
        if (newValue) {
                $scope.swipe.range = newValue;
        } else {
        };
});	
    $scope.query = {}
    $scope.queryBy = '$'
$http.get('mapdata/plants.json').success(function(data) {
	$scope.plants = data;
});
$scope.orderProp="name";  

}]);


