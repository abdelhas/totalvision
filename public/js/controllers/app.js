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
                                console.log('New Year: ' + newValue);
                        }
                });
        };
        $scope.slider = {
                year: 2012
        };
});

app.controller("MapController", [ "$scope", "$log", "$http", "leafletData","Slider", function($scope, $log, $http, leafletData, Slider) {

// Control Tool
// Slider Controller

// Get the Year into The Map
var tilesDict = {
        _2012: {
            url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
            options: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        },
        _2021: {
            url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
            options: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2031: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2041: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2051: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2061: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2071: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2081: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		_2091: {
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    options: {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		    }
		},
		opencyclemap: {
		    url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
		    options: {
			attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
		    }
		}
	};

	angular.extend($scope, {
			usa: {
			    lat: 39.5,
			    lng: -98.35,
			    zoom: 4
			},
			tiles: tilesDict._2012,
			defaults: {
			    scrollWheelZoom: false
			},
			layers: {
			    baselayers: {
				xyz: {
				    name: '2012 Hardiness',
				    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
				    type: 'xyz'
				}
			    },
			overlays: {
			    demosutfgrid: {
				    name: 'UTFGrid Interactivity',
				    type: 'utfGrid',
				    url: 'http://json2jsonp.com/?url=http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/0/0/0.grid.json&callback={cb}',
				visible: true,
	      layerParams: {},
	      layerOptions: {}
			    }
			  }
			}
		    });

	$scope.showLeaflet = function() {
		leafletData.getMap().then(function(map) {
		    map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
		});
	    };

	    $scope.$watch(function () { return Slider.getYear(); }, function (newValue) {
		if (newValue) {
			$scope.year = newValue;
			console.log('Ctrl 2: ' + newValue);	
			tiles = '_' + newValue;
			console.log('Tiles: ' + tiles);
			$scope.tiles = tilesDict[tiles];
		} else {
			tiles = 'opencyclemap';
		};
	    });
$scope.zone = "";

$scope.$on('leafletDirectiveMap.utfgridMouseover', function(event, leafletEvent) {
	$scope.zone = leafletEvent.data.zone;
    });

$scope.$on('leafletDirectiveMap.utfgridMouseout', function(event, leafletEvent) {
	$scope.zone = "";
});
}]);

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


