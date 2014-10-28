## Hardiness Map Viewer
- Single Page Hardiness Map Viewer for the US.
- Use the slider to choose between hardiness map projections for 2041, 2070, 2099. 
- Type plant name or hardiness zone to find it.
- Map Link: <a href="http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/">http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/</a>

## Datasets used: 
<div class='legend-source'>Source: <a href="https://cds.nccs.nasa.gov/nex/">NASA Earth Exchange (NEX) Downscaled Climate Projections (NEX-DCP30)</a>, <a href="http://planthardiness.ars.usda.gov/PHZMWeb/">USDA Plant Hardiness Zone Map</a>, and <a href="http://www.garden.org/plantfinder/">National Gardening Association PlantFinder</a></div>

## Set up:
At the root directory:

npm install

sudo node server.js

At ./public/mapdata, run the following to extract tiles: 
mb-util 2070Hardiness_111b80.mbtiles ./2070
mb-util 2099Hardiness_794403.mbtiles ./2099
mb-util 2041Hardiness_2af774.mbtiles ./2041
