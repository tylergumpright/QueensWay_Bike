
var basemapUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

var map = L.map('map', {
    scrollWheelZoom: true
  }).setView( [40.720217, -73.846579], 15)

L.tileLayer(basemapUrl,{
    attribution: attribution
  }).addTo(map);

//basic structure of code borrowed from: http://jsfiddle.net/km5H9/1/


//locate markers and add in Steet View images
var QueensWay1 = L.marker([40.71161371303385, -73.85722160339355]).addTo(map).bindPopup('<img src="img/entry1.png" rel="#test1" alt="" width="300px">'),
    QueensWay2 = L.marker([40.719778223045275, -73.85769367218016]).addTo(map).bindPopup('<img src="img/entry3.png" rel="#test1" alt="" width="300px">'),
    QueensWay3 = L.marker([40.721632175452626, -73.85786533355713]).addTo(map).bindPopup('<img src="img/entry2.png" rel="#test1" alt="" width="300px">'),
    FMCP       = L.marker([40.727453900822795, -73.83520603179932]).addTo(map).bindPopup('<img src="img/flushingentrance.png" rel="#test1" alt="" width="300px">');

//define geojson alternate routes
var geojson = {
    "type": "FeatureCollection",
        "features": [{
    }, {
            "type": "LineString",
            "coordinates": [
                [-73.85730743408203, 40.711516123193775],
                [-73.85091304779053, 40.7105727473657],
                [-73.84374618530273, 40.72179480039333],
                [-73.84151458740234, 40.722412771544384],
                [-73.84263038635254, 40.72439674540761],
                [-73.83627891540527, 40.72631561468471],
                [-73.83524894714355, 40.727388856425094]
            ]
        },
        {
            "type": "LineString",
            "coordinates": [
                [-73.83516311645508, 40.727421378631895],
                [-73.8451623916626, 40.72429917430525],
                [-73.84383201599121, 40.72176227543699],
                [-73.84554862976074, 40.7190951749314],
                [-73.84846687316893, 40.71857475261651],
                [-73.85061264038086, 40.71938791069555],
                [-73.8557195663452, 40.71132094308453],
                [-73.85730743408203, 40.711516123193775]

            ]
        },{
    }]
}

var geojson2 = {
    "type": "FeatureCollection",
        "features": [{   
     },   {
        "type": "Feature",
            "properties": {},
            "geometry": {
            "type": "LineString",
            "coordinates": [
                [-73.85767221450804, 40.719648119182985],
                [-73.85634183883667, 40.71997337836189],
                [-73.85556936264038, 40.720656417464404],
                [-73.85516166687012, 40.72106298503115],
                [-73.8549256324768, 40.721469550114584],
                [-73.85335922241211, 40.722120049082775],
                [-73.8520073890686, 40.72267296820733],
                [-73.84861707687378, 40.722721754968376],
                [-73.84226560592651, 40.724445530905136],
                [-73.83660078048706, 40.726185523600634],
                [-73.8353133201599, 40.72724250629786]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#942192",
            "stroke-width": 2,
            "stroke-opacity": 1
        },
    }]
}

var geojson3 = {
    "type": "FeatureCollection",
        "features": [{
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#942192",
            "stroke-width": 2,
            "stroke-opacity": 1
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-73.85784387588501, 40.721648437964554],
                [-73.85739326477051, 40.72177853791713],
                [-73.8570499420166, 40.72088409560772],
                [-73.85576248168945, 40.720510052532475]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "stroke": "#ff40ff",
            "stroke-width": 2,
            "stroke-opacity": 1
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-73.85775804519653, 40.721664700472566],
                [-73.85722160339355, 40.721859850258355],
                [-73.85518312454224, 40.72106298503115]
            ]
        }
    }]
}

//SetStyles
var myStyle = {
 "color": "#00FF00",
 "weight": 2,
 "opacity": 0.65
};

 var ParkStyle = {
 "color": "#228B22",
 "weight": 2,
 "opacity": 0.65
};

var ParkStyle2 = {
 "color": "#808080",
 "weight": 2,
 "opacity": 0.65
};

var QWStyle = {
 "color": "#BA55D3",
 "weight": 2,
 "opacity": 0.65
};

//get & style geojson from external files
$.getJSON('data/nyc-bike-routes-2015.geojson', function(bike_route) {
    geojson = L.geoJson(bike_route,{
           style: myStyle,
    }).addTo(map);
  });

  $.getJSON('data/QueensWay.geojson', function(park) {
    geojson = L.geoJson(park,{
        style: QWStyle,
    }).addTo(map);
  });

  $.getJSON('data/Parkproperties.geojson', function(park2) {
    geojson = L.geoJson(park2,{
        style: ParkStyle,
    }).addTo(map);
  });

$.getJSON('data/routealt.geojson', function(park2) {
    geojson = L.geoJson(park2,{
        style: ParkStyle2
  }).addTo(map);
});

//set layer control
L.control.layers({
    'CDB': L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map)
}, {
     'Option 1': L.geoJson(geojson, {
        style: function (feature) {
            if (feature.geometry.type === 'LineString') {
                return {
                    color: '#0c2c84'
                };
            }
        }
    }),
    'Option 2': L.geoJson(geojson2, {
        style: function (feature) {
            if (feature.geometry.type === 'LineString') {
                return {
                    color: '#41b6c4'
                };
            }
        }
    }),
    'Option 2a': L.geoJson(geojson3, {
        style: function (feature) {
            if (feature.geometry.type === 'LineString') {
                return {
                    color: '#FF4500'
                };
            }
        }
    })
}, {
    collapsed: false
}).addTo(map);
