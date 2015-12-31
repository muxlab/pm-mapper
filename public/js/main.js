// Reference to my Firebase
var myFirebaseRef = new Firebase('https://<YOUR-APP>.firebaseio.com/');

// Grobal
var index = 4;
var maps = [];

console.log('%c⚛ Projection Mapping Tool: Hello geohacker! ⚛', 'font-family:monospace;font-size:16px;color:darkblue;');

// Create menu icon
$.fatNav();

// Menu event listner
$('.fat-nav__wrapper').on('click', function(e) {
  console.log(e.target.text);
  createMapContainer(e.target.text);
});

// Create container before map
function createMapContainer(type) {
  var mapCont = $('<div>', {
    id: 'l-map' + index,
    css: { top: '50px', left: '50px' },
    addClass: 'l-map'
  });
  $('body').append(mapCont);
  Maptastic('l-map' + index);
  createMap(index, type);
  index += 1;
}

// Create map and add tile layer
function createMap(index, type) {
  var center = [35.8, 139];
  var zoom = 4;
  var map = L.map('l-map' + index, { zoomControl: false, attributionControl: false }).setView(center, zoom);
  maps.push(map);

  switch (type) {
    case 'OpenStreetMap':
      L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        id: 'osm' + index
      }).addTo(map);
      break;
    case 'Esri Satellite':
      L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        id: 'esri-satellite' + index
      }).addTo(map);
      break;
    case 'Stamen Tonar':
      L.tileLayer('//stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '<a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>. | Video from <a target="_top" href="http://mazwai.com/">Mazwai</a>.',
        id: 'stamen-toner' + index
      }).addTo(map);
      break;
  }
}

// Create GeoJSON layer and add into maps
function createGeoJSONLayer(url) {
  var markerIcon = L.divIcon({
    className: 'svg-marker-icon',
    html: '<svg width="64px" height="64px" viewBox="-20 -20 64 64"><g><circle class="circles" opacity="0.4" r="6" transform="translate(0,0)"></circle></g></svg>'
  });
  var pathStyle = {
    color: '#ff6500',
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.35,
    fillColor: '#ff6500'
  };
  $.getJSON(url, function(data) {
    $.each(maps, function(i, map) {
      var geojson = L.geoJson(data, {
        onEachFeature: function(feature, layer) {
          console.log(layer.feature.geometry.type);
          if(layer.feature.geometry.type === 'Polygon' || layer.feature.geometry.type === 'MultiPolygon' || layer.feature.geometry.type === 'Polyline') {
            layer.setStyle(pathStyle);
          }
          else if(layer.feature.geometry.type === 'Point' || layer.feature.geometry.type === 'MultiPoint') {
            layer.setIcon(markerIcon);
          }
          else {
            return false;
          }
        }
      });
      geojson.addTo(map);
    });
  });
}

// Init
function initMap() {
  var center = [35.8, 139];
  var zoom = 4;
  var map1 = L.map('l-map1', { zoomControl: false, attributionControl: false }).setView(center, zoom);
  var map2 = L.map('l-map2', { zoomControl: false, attributionControl: false }).setView(center, zoom);
  var map3 = L.map('l-map3', { zoomControl: false, attributionControl: false }).setView(center, zoom);
  maps = [map1, map2, map3];

  // The elements will be available to transform
  Maptastic('l-map1');
  Maptastic('l-map2');
  Maptastic('l-map3');

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

  // Firebase event listners
  myFirebaseRef.child('map/center').on('value', function(snapshot) {
    center = snapshot.val();
    console.log(maps);
    $.each(maps, function(i, map) {
      map.setView(center, zoom);
    });
  });
  myFirebaseRef.child('map/zoom').on('value', function(snapshot) {
    zoom = snapshot.val();
    $.each(maps, function(i, map) {
      map.setView(center, zoom);
    });
  });
  myFirebaseRef.child('flash1').on('value', function(snapshot) {
    var flag = snapshot.val();
    console.log(flag);
    if(flag === true) {
      console.log('flash1!');
      $.each(maps, function(i, map) {
        map.eachLayer(function (layer) {
          layer.setOpacity(0);
          setTimeout(function() {
            layer.setOpacity(1);
          }, 100);
        });
      });
    }
  });
  myFirebaseRef.child('flash2').on('value', function(snapshot) {
    var flag = snapshot.val();
    console.log(flag);
    if(flag === true) {
      console.log('flash2!');
      $.each(maps, function(i, map) {
        map.eachLayer(function (layer) {
          setTimeout(function() {
            layer.setOpacity(0);
            setTimeout(function() {
              layer.setOpacity(1);
            }, 100);
          }, 100 * i);
        });
      });
    }
  });
  myFirebaseRef.child('dataUrl').on('value', function(snapshot) {
    var url = snapshot.val();
    console.log(url);
    createGeoJSONLayer(url);
  });
}
initMap();
