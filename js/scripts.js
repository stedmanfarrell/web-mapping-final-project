// this is Wayne's mapboxGL token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2F5bmVwYWNpbGVvIiwiYSI6ImNrNm9jc281YzA4enEza21pdDcybjFybWgifQ.AETmAWEwFz3mIrpMCDGsGQ';

// set intial map zoom
var initialCenterPoint = [-73.8666, 40.59999]
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

//load minimap
map.addControl(new mapboxgl.Minimap(), 'bottom-right');

// disable map zoom when using scroll
map.scrollZoom.disable();

// load sewer icons
map.on("load", function() {
  map.loadImage("images/waste-sewer.png", function(error, image) {
    if (error) throw error;
    map.addImage("custom-marker", image);
    map.addSource('sewerData', {
      type: 'geojson',
      data: 'data/sewer.geojson',
    });
    map.addLayer({
      id: "markers",
      type: "symbol",
      source: 'sewerData',
      layout: {
        "icon-image": "custom-marker",
        "icon-size": .06,
      }
    });
  });
});
//add geojson data for test locations
map.on('style.load', function() {
  map.addSource('circleData', {
    type: 'geojson',
    data: 'data/waterquality2019.geojson',
  })
  // styling for circles
  map.addLayer({
    id: 'data',
    type: 'circle',
    source: 'circleData',
    paint: {
      // style circle color based on level of pollution
      'circle-color': {
        property: 'FecalCount',
        stops: [
          [0, 'green'],
          [200, 'yellow'],
          [500, 'orange'],
          [1000, 'red'],
          [1500, 'red'],
        ]
      },
      'circle-radius': 20,
      'circle-opacity': 0.8,
      'circle-stroke-width': .5,
      'circle-stroke-color': 'black',
    }
  })
  //assign month to months to display position of slider
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  // set default filter for which data to load
  map.setFilter('data', ['==', 'Month', 0]);
  // connect slider to data with listener
  document.getElementById('slider').addEventListener('input', function(e) {
    var month = parseInt(e.target.value);
    //update the map according to postion of slider
    map.setFilter('data', ['==', ['number', ['get', 'Month']], month]);
    //display month on sidebar
    document.getElementById('month').textContent = months[month];
  })
})
