// this is Wayne's mapboxGL token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2F5bmVwYWNpbGVvIiwiYSI6ImNrNm9jc281YzA4enEza21pdDcybjFybWgifQ.AETmAWEwFz3mIrpMCDGsGQ';
// set intial map zoom
var initialCenterPoint = [-73.913042, 40.59999]
var initialZoom = 11.25

var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/light-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}

var map = new mapboxgl.Map(initOptions);

// add navigation control
map.addControl(new mapboxgl.NavigationControl());

//assign map markers from dataset
//testlocationData.forEach(function(locationEntry) {
//  console.log(locationEntry.shortName, locationEntry.lat)
//  new mapboxgl.Marker()
//    .setLngLat([locationEntry.lng, locationEntry.lat])
//    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
//    .setHTML(`${locationEntry.longName}, ${locationEntry.lng}, ${locationEntry.lat}`))
//    .addTo(map);
//})
//add map layer of circles for test locations
map.on('style.load', function() {
        // change water color to blue
        //map.setPaintProperty('water', 'fill-color', '#a4bee8')

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
            'circle-color': {
              property: 'FecalCount',
              stops: [
                [0, 'green'],
                [200, 'yellow'],
                [700, 'orange'],
                [1500, 'red'],
              ]
            },
            'circle-radius': 20,
            //{
              //property: 'FecalCount',
              //stops: [
              //  [0, 5],
              //  [700, 20],
              //  [1000, 40],
            //  ]
            //},
            //'circle-stroke-width': 1,
            //'circle-stroke-color': 'black',
          }
        })
        // set default filter
        map.setFilter('data', ['==', 'Month', 0]);
        // connect slider to data with listener
        document.getElementById('slider').addEventListener('input', function(e) {
          var month = parseInt(e.target.value);
          //update the map
          map.setFilter('data', ['==', ['number', ['get', 'Month']], month]);
        })
      })
