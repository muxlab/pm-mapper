// Reference to my Firebase
var myFirebaseRef = new Firebase('https://torrid-inferno-1243.firebaseio.com/');

console.log('%c⚛ Projection Mapping Tool: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

// The elements will be available to transform
Maptastic('l-map1');
Maptastic('l-map2');
Maptastic('l-map3');

// Leaflet Map Init
function initMap() {
  var center = [35.8, 139];
  var zoom = 4;
  var map1 = L.map('l-map1', { zoomControl: false, attributionControl: false }).setView(center, zoom);
  var map2 = L.map('l-map2', { zoomControl: false, attributionControl: false }).setView(center, zoom);
  var map3 = L.map('l-map3', { zoomControl: false, attributionControl: false }).setView(center, zoom);
  L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    id: 'osm'
  }).addTo(map1);
  L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    id: 'esri-satellite'
  }).addTo(map2);
  L.tileLayer('//stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '<a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>. | Video from <a target="_top" href="http://mazwai.com/">Mazwai</a>.',
    id: 'stamen-toner'
  }).addTo(map3);

  myFirebaseRef.child('map/center').on('value', function(snapshot) {
    center = snapshot.val();
    map1.setView(center, zoom);
    map2.setView(center, zoom);
    map3.setView(center, zoom);
  });
  myFirebaseRef.child('map/zoom').on('value', function(snapshot) {
    zoom = snapshot.val();
    map1.setView(center, zoom);
    map2.setView(center, zoom);
    map3.setView(center, zoom);
  });
}
initMap();
