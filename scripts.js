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
  console.log(locationEntry.shortName, locationEntry.lat)
  new mapboxgl.Marker()
    .setLngLat([locationEntry.lng, locationEntry.lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
     .setHTML(`${locationEntry.longName}, ${locationEntry.lng}, ${locationEntry.lat}`))
    .addTo(map);
})
//add map layer of circles for test locations
map.on('style.load', function() {
  //add geojson data for test locations
  map.addSource('circleData', {
    type: 'geojson',
    data: './map.geojson',
  })
  // styling for circles
  map.addLayer({
    id: 'data',
    type: 'circle',
    source: 'circleData',
    paint: {
      'circle-color': 'brown',
      'circle-radius': {
        property: 'fecalLevel',
        stops: [
          [0, 10],
          [300, 20],
          [700, 30],
          [1000, 40],
        ]
      },
      'circle-stroke-width': 1,
      'circle-stroke-color': 'black'
    }
  })
})
