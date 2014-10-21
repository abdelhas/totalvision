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

angular.extend($scope, {
	usa: {
	    lat: 39.5,
	    lng: -98.35,
	    zoom: 4
	},
	defaults: {
	    scrollWheelZoom: false
	},
	layers: {
	    baselayers: {
		_2012: {
		    name: '2012 Hardiness',
		    url: 'http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png',
		    type: 'xyz'
		}
	    },
	overlays: {
	    _2012Utf: {
		    name: '2012 Interactivity',
		    type: 'utfGrid',
		    url: 'http://json2jsonp.com/?url=http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.grid.json&callback={cb}',
		    visible: true,
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
	//	$scope.tiles = tilesDict[tiles];
	} else {
		tiles = 'opencyclemap';
	};
});

// Leaflet MouseOver Control
$scope.zone = "";
$scope.$on('leafletDirectiveMap.utfgridMouseover', function(event, leafletEvent) {
	$scope.zone = leafletEvent.data.zone;
	console.log($scope.zone);
});

$scope.$on('leafletDirectiveMap.utfgridMouseout', function(event, leafletEvent) {
	$scope.zone = "";
});
// Leaflet Click Control
$scope.$on('leafletDirectiveMap.utfgridClick', function (e) {
});
// Leaflet Swipe Contro2012 Interactivity    var nw = map.containerPointToLayerPoint([0, 0]),
        se = map.containerPointToLayerPoint(map.getSize()),
        clipX = nw.x + (se.x - nw.x) * range.value;

    overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  }


$scope.swipe = {};
console.log($scope.map);
$scope.$watch(function () { return $scope.swipe.range; }, function (newValue) {
        if (newValue) {
                $scope.swipe.range = newValue;
		console.log(newValue);
        } else {
		console.log('Nothing');
        };
});	
    $scope.query = {}
    $scope.queryBy = '$'
$http.get('mapdata/plants.json').success(function(data) {
	$scope.plants = data;
});
$scope.orderProp="name";  

}]);


