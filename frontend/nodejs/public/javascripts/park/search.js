/**
 * ParkUrban - Mobile Web Application
 *
 * Client-side inventory search (slippy map)
 *
 * This file contains the client-side javascript used to implement the 
 * Leaflet-based slippy map and display of inventory markers. The code
 * here is bound to the 'pageshow' event instead of the more common
 * 'ready' event in deference to the best-practices suggested by the 
 * documentation for the JQuery Mobile library we use for skinning the app.
 *
 **/
$(document).bind('pageshow', function() {

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
  map.attributionControl.setPrefix("Search Powered by ParkUrban");
  var westernUS = new L.LatLng(39.7391667,-104.9841667);
  var losAngeles= new L.LatLng(34.0800, -118.25333);
  map.setView(losAngeles, 13).addLayer(osm).addControl(layersControl);
  
  /**
   * Each time the user stops dragging the map, update the map with the parking 
   * inventory that falls within the new display boundaries.
   **/
  map.on('moveend', function (e) {
    var boundingBoxParams = map.getBounds().toBBoxString().replace(/\,/g,'/');
    console.log(boundingBoxParams);
    $.getJSON('/search/inventory/within/' + boundingBoxParams, function (resp) {
        console.log(resp);
        $.each(resp.results, function (i,v) {
            console.log(v);
            L.marker([v.loc[1],v.loc[0]])
                .bindPopup(
                    "<b>" + v.name + "</b><br/>"+v.description+"<br/><strong style='color:green;'>" + v.status + "</strong><hr/><a href='#'>I'm Here</a> (reserve spot)"
                ).addTo(map);
        });
    });
  });
});
