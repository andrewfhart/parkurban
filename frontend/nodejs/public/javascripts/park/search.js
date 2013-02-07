$(document).bind('pageinit', function() {

  var map = L.map('map');
  var osm = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
    minZoom: 5,
    attribution: 'Basemap <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a> by &copy; <a href="http://openstreetmap.org/" target="_blank">OpenStreetMap</a>, Tiles Courtesy of &copy; <a href="http://open.mapquest.com" target="_blank">MapQuest</a>', 
    subdomains: ['1','2','3','4']
  });
  
  var baseLayers = {
    "Open Street Map": osm
  };
  
  var overlays = {}
  
  var visibleLayers = {};
  var layersControl = L.control.layers(baseLayers, overlays);
  map.attributionControl.setPrefix("Powered by ParkUrban");
  var westernUS = new L.LatLng(39.7391667,-104.9841667);
  var losAngeles= new L.LatLng(34.01667, -118.28333);
  map.setView(westernUS, 15).addLayer(osm).addControl(layersControl);
  
  // Sample Markers
  
  var marker  = L.marker([34.01467, -118.27033]).addTo(map);
  var marker2 = L.marker([34.01667, -118.27033]).addTo(map);
  var marker3 = L.marker([34.01467, -118.26033]).bindPopup("<b>Woody's Garage</b><br>7 of 15 spaces available<br>$2.50/hr<br/><a href='#'>I'm Here</a> (reserve spot)").openPopup().addTo(map);
  var marker4 = L.marker([34.01667, -118.28033]).addTo(map);
  var marker5 = L.marker([34.01667, -118.28333]).addTo(map);
  

});
