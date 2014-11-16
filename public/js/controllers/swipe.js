var map = L.map("map").setView([-98, 38], 4);;
//Default layer
L.tileLayer('/mapdata/2012/{z}/{x}/{y}.png', { maxZoom: 5, continuousWorld: true}).addTo(map);
// Search control
var searchControl = new L.esri.Controls.Geosearch().addTo(map);
var results = new L.LayerGroup().addTo(map);
searchControl.on("results", function(data){
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        };
      });
// Geojson Panes
var panes = map.getPanes();
var pane = panes.altPane = L.DomUtil.create('div', 'leaflet-overlay-pane');

var svg = L.svg({pane: 'altPane'});
var overlay = L.tileLayer('/mapdata/2012/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);
var range = document.getElementById('swiper');
var slider = document.getElementById('slider');
panes.mapPane.insertBefore(pane, panes.markerPane);

// Geojson
var geojsonLayer = new L.GeoJSON.AJAX("mapdata/geojson/2012.geojson");
var geojsonLayer2 = new L.GeoJSON.AJAX("mapdata/geojson/2012.geojson", {renderer: svg});
//var leftMapAdded = geojsonLayer2.addTo(map);
//console.log(leftMapAdded)
//geojsonLayer2.addTo(map);
//leftPane.appendChild(geojsonLayer2);
geojsonLayer2.setZIndex(9)




function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;
  overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  //right geojson
  var rightGeo = function() { 
       panes.overlayPane.style.clip = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)';
       };
  //left geojson
  var leftGeo = function() { 
	pane.style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
   };
  rightGeo();
  leftGeo();
  
};
function changeLayer() {
	var yearSelected = $("#slider option:selected").text(); 
	map.removeLayer('/mapdata/2041/{z}/{x}/{y}.png');
	map.removeLayer('/mapdata/2070/{z}/{x}/{y}.png');
	map.removeLayer('/mapdata/2099/{z}/{x}/{y}.png');
	L.tileLayer('/mapdata/2012/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);
	overlay = L.tileLayer('/mapdata/' +slider.value + '/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);   
	geojsonLayer.clearLayers();
	geojsonLayer2.clearLayers(); 
	geojsonLayer = new L.GeoJSON.AJAX("mapdata/geojson/2012.geojson");
	geojsonLayer2 = new L.GeoJSON.AJAX("mapdata/geojson/" + slider.value + ".geojson", {renderer: svg});
	if (parseInt(slider.value) >= 2041) {
		plantChangeYear();
		$(".leftMapYear").text(slider.value);
	};
	clip();
};

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
slider['oninput' in slider ? 'oninput' : 'onchange'] = changeLayer;
console.log(map.setView);
map.on('move', clip);
map.setView([38.5,-98.35], 4);
// First time set
clip();
plantClick();

function plantChangeYear() { 
	var plantZones = $('.diffColor').children("td:eq(1)").text();
	var zoneArrayTmp = [];
        zoneArrayTmp = plantZones.split(', ');
	geojsonLayer.addTo(map);
        geojsonLayer2.addTo(map);
	for (var i = 0; i < zoneArrayTmp.length; i++) {
                zoneArrayTmp[i] = zoneArrayTmp[i].replace('0', '');
                if (i === zoneArrayTmp.length-1) {
                        geojsonLayer.refilter(
                                function(feature){
                                    return feature.properties.zone === zoneArrayTmp[0] || feature.properties.zone === zoneArrayTmp[1] || feature.properties.zone === zoneArrayTmp[2]|| feature.properties.zone === zoneArrayTmp[3] || feature.properties.zone === zoneArrayTmp[4] || feature.properties.zone === zoneArrayTmp[5] || feature.properties.zone === zoneArrayTmp[6] || feature.properties.zone === zoneArrayTmp[7] || feature.properties.zone === zoneArrayTmp[8] || feature.properties.zone === zoneArrayTmp[9] || feature.properties.zone === zoneArrayTmp[10] || feature.properties.zone === zoneArrayTmp[11]
                                });
                        if (parseInt(slider.value) >= 2041) {
                        geojsonLayer2.refilter2(
                                function(feature){
                                    return feature.properties.zone === zoneArrayTmp[0] || feature.properties.zone === zoneArrayTmp[1] || feature.properties.zone === zoneArrayTmp[2]|| feature.properties.zone === zoneArrayTmp[3] || feature.properties.zone === zoneArrayTmp[4] || feature.properties.zone === zoneArrayTmp[5] || feature.properties.zone === zoneArrayTmp[6] || feature.properties.zone === zoneArrayTmp[7] || feature.properties.zone === zoneArrayTmp[8] || feature.properties.zone === zoneArrayTmp[9] || feature.properties.zone === zoneArrayTmp[10] || feature.properties.zone === zoneArrayTmp[11]
                                });
                        } else {
                                geojsonLayer2.refilter2(
                                function(feature){
                                    return feature.properties.zone === zoneArrayTmp[0] || feature.properties.zone === zoneArrayTmp[1] || feature.properties.zone === zoneArrayTmp[2]|| feature.properties.zone === zoneArrayTmp[3] || feature.properties.zone === zoneArrayTmp[4] || feature.properties.zone === zoneArrayTmp[5] || feature.properties.zone === zoneArrayTmp[6] || feature.properties.zone === zoneArrayTmp[7] || feature.properties.zone === zoneArrayTmp[8] || feature.properties.zone === zoneArrayTmp[9] || feature.properties.zone === zoneArrayTmp[10] || feature.properties.zone === zoneArrayTmp[11]
                                });
                        }
			clip();
		};
	};
};

// On click even on plant name, get zones
function plantClick() {
setInterval(function() {
$(document).ready(function(){
       $('.finder').unbind().on('click', function(){
         // highlight on click
          $(this).siblings().removeClass("diffColor");
	  $(this).toggleClass("diffColor", this.clicked); 
	  
	  var plantZones = $(this).children("td:eq(1)").text();
	  var plantName = $(this).children("td:eq(0)").text();
	  $(".centerPlantTitle").text(plantName + ' Growth Zones');
	  var zoneArrayTmp = [];
	  zoneArrayTmp = plantZones.split(', ');
	  geojsonLayer.addTo(map);
	  geojsonLayer2.addTo(map);
	  for (var i = 0; i < zoneArrayTmp.length; i++) { 
		zoneArrayTmp[i] = zoneArrayTmp[i].replace('0', '');
	        if (i === zoneArrayTmp.length-1) {
			geojsonLayer.refilter(
				function(feature){
                            	    return feature.properties.zone === zoneArrayTmp[0] || feature.properties.zone === zoneArrayTmp[1] || feature.properties.zone === zoneArrayTmp[2]|| feature.properties.zone === zoneArrayTmp[3] || feature.properties.zone === zoneArrayTmp[4] || feature.properties.zone === zoneArrayTmp[5] || feature.properties.zone === zoneArrayTmp[6] || feature.properties.zone === zoneArrayTmp[7] || feature.properties.zone === zoneArrayTmp[8] || feature.properties.zone === zoneArrayTmp[9] || feature.properties.zone === zoneArrayTmp[10] || feature.properties.zone === zoneArrayTmp[11]
				});
			if (parseInt(slider.value) >= 2041) {
			geojsonLayer2.refilter2(
                                function(feature){
                                    return feature.properties.zone === zoneArrayTmp[0] || feature.properties.zone === zoneArrayTmp[1] || feature.properties.zone === zoneArrayTmp[2]|| feature.properties.zone === zoneArrayTmp[3] || feature.properties.zone === zoneArrayTmp[4] || feature.properties.zone === zoneArrayTmp[5] || feature.properties.zone === zoneArrayTmp[6] || feature.properties.zone === zoneArrayTmp[7] || feature.properties.zone === zoneArrayTmp[8] || feature.properties.zone === zoneArrayTmp[9] || feature.properties.zone === zoneArrayTmp[10] || feature.properties.zone === zoneArrayTmp[11]
                                });
			} else { 
				geojsonLayer2.refilter(
                                function(feature){
                                    return feature.properties.zone === zoneArrayTmp[0] || feature.properties.zone === zoneArrayTmp[1] || feature.properties.zone === zoneArrayTmp[2]|| feature.properties.zone === zoneArrayTmp[3] || feature.properties.zone === zoneArrayTmp[4] || feature.properties.zone === zoneArrayTmp[5] || feature.properties.zone === zoneArrayTmp[6] || feature.properties.zone === zoneArrayTmp[7] || feature.properties.zone === zoneArrayTmp[8] || feature.properties.zone === zoneArrayTmp[9] || feature.properties.zone === zoneArrayTmp[10] || feature.properties.zone === zoneArrayTmp[11]
                                });
			}
			clip();
		}
	  };
    });
})
}, 1000);
};

//dehighlight
$(".plantstb > .finder > .plantRow").click(function() {
    $(this).closest("tr").siblings().removeClass("diffColor");
    $(this).parents("tr").toggleClass("diffColor", this.clicked);
});

//highlight row on click
$(".plantRow").click(function() {
     $(this).parents("tr").toggleClass("diffColor", this.clicked);
});

//help on start
setTimeout(function() {
        $(document).ready(function(){
                $('#credits').fadeIn(1000);
	});
}, 500);
document.body.style.overflow = 'hidden';

