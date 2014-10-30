## Hardiness Map Viewer
- Single Page Hardiness Map Viewer for the US.
- Use the slider to choose between hardiness map projections for 2041, 2070, 2099. 
- Type plant name or hardiness zone to find it.
- Map Link: <a href="http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/">http://ec2-54-245-62-84.us-west-2.compute.amazonaws.com/</a>

## Methods
The regression / interpolation techniques were followed from: 
http://journals.ametsoc.org/doi/pdf/10.1175/2010JAMC2536.1

Köppen-Geiger climate classification was used to apply regression on areas with contiguous climate pattern.

netCDF data from NEX-DCP30 Tasmin average of coldest month of the year were averaged at 30 years intervals prior to 2012 and to each predicted hardiness map year: 2041, 2070, 2099. 

A Node.js script was used to collect and clean plant hardiness data from the National Gardening Assiciation Plantfinder tool.  

## Datasets used: 
<div class='legend-source'>Source: <a href="https://cds.nccs.nasa.gov/nex/">NASA Earth Exchange (NEX) Downscaled Climate Projections (NEX-DCP30)</a>, <a href="http://planthardiness.ars.usda.gov/PHZMWeb/">USDA Plant Hardiness Zone Map</a>, and <a href="http://www.garden.org/plantfinder/">National Gardening Association PlantFinder</a>, and <a href="http://people.eng.unimelb.edu.au/mpeel/koppen.html">Köppen-Geiger climate map</a></div>

## Set up:
At the root directory:

npm install

sudo node server.js

