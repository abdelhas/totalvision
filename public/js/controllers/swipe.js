var map = L.map("map");
//Default layer
L.tileLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);

var overlay = L.tileLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);
var range = document.getElementById('swiper');
var slider = document.getElementById('slider');

function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;
  console.log(range.value);
  overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
};

function changeLayer() {
	var yearSelected = $("#slider option:selected").text(); 
	console.log('here: ' + slider.value);
	map.removeLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2041/{z}/{x}/{y}.png');
	map.removeLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2070/{z}/{x}/{y}.png');
	map.removeLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2099/{z}/{x}/{y}.png');
	L.tileLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/2012/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);
	overlay = L.tileLayer('http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/mapdata/' +slider.value + '/{z}/{x}/{y}.png', { maxZoom: 5 }).addTo(map);    
	$(".leftMapYear").text(slider.value);
	clip();
};

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
slider['oninput' in slider ? 'oninput' : 'onchange'] = changeLayer;

map.on('move', clip);
map.setView([33.5,-98.35], 4);
// First time set
clip();


