var app = angular.module("MapViz", ['ui-rangeSlider', "leaflet-directive"]);

// Service to transfer Controls Into Map
app.factory('Slider', function() {
    return {year: 2012};
});

app.controller("MapController", [ "$scope", "$log", "leafletData", function($scope, $log, leafletData, Slider) {
    var hardinessTilesUrl = 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/hardiness/2012/{z}/{x}/{y}.png',
    hardinessTilesLayer = new L.TileLayer(hardinessTilesUrl);
    var tilesDict = {
        openstreetmap: {
            url: "http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png",
            options: {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }
        },
        opencyclemap: {
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
                attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            }
        }
    };
var i = 0;
$scope.slider = Slider;
console.log('Here')
console.log(Slider)
console.log($scope.slider);
$scope.$watch("slider.year", function(value) {
	console.log("map value " + value);
});

angular.extend($scope, {
                usa: {
                    lat: 38,
                    lng: -90,
                    zoom: 5
                },
                layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors {{slider.year}}',
                                continuousWorld: true
                            }
                        },
                        cycle: {
                            name: 'OpenCycleMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                continuousWorld: true
                            }
                        }
                    },
                    overlays: {
                        hillshade: {
                            name: 'Hillshade Europa',
                            type: 'wms',
                            url: 'http://129.206.228.72/cached/hillshade',
                            visible: true,
                            layerOptions: {
                                layers: 'europe_wms:hs_srtm_europa',
                                format: 'image/png',
                                opacity: 0.25,
                                attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
                                crs: L.CRS.EPSG900913
                            }
                        },
                        hardiness: {
                            name: $scope.year || '2012',
                            type: 'xyz',
                            url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
			    layerOptions: {
                                attribution: '&copy; <a href="http://www.openfiremap.org">OpenFireMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            }
                        }
                    }
                }
            });

    $scope.showLeaflet = function() {
        leafletData.getMap().then(function(map) {
            map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
        });
    };

}]);

app.controller('YearController',  
	function YearController($scope, $http, Slider) {
		// values for the slider
		console.log(Slider);
		$scope.slider = Slider;
		function link($scope) { 
			$scope.$watch("slider.year", function(value) {
			});
		}
		$scope.yearChange = function(){
			console.log('Geear: ' +$scope.slider.year + ' Data');
			console.log(Slider);
		};
		link($scope)
		$scope.slider = {
			year: 2011
		};

	}
);

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


