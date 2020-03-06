// this is Wayne's mapboxGL token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2F5bmVwYWNpbGVvIiwiYSI6ImNrNm9jc281YzA4enEza21pdDcybjFybWgifQ.AETmAWEwFz3mIrpMCDGsGQ';

var initialCenterPoint = [-73.913042,40.599552]
var initialZoom = 11

var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/light-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

var map = new mapboxgl.Map(initOptions);

map.addControl(new mapboxgl.NavigationControl());

//assign map markers from dataset
testlocationData.forEach(function(locationEntry) {
  console.log(locationEntry.shortname, locationEntry.lat)
  new mapboxgl.Marker()
    .setLngLat([locationEntry.lng, locationEntry.lat])
    .addTo(map);
})
