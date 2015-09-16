/*
 *configuracion de la extencion del mapa
 */
var southWest = L.latLng(-4, -90),
    northEast = L.latLng(50, -63),
    bounds = L.latLngBounds(southWest, northEast);

var map_ruta = L.map('mapruta', {
        center: [4.12521648, -74.5020],
        zoom: 6,
        maxzoom: 19, 
        zoomControl: false
});
new L.Control.Zoom({ position: 'bottomleft' }).addTo(map_ruta);

var svg = d3.select(map_ruta.getPanes().overlayPane).append("svg");
var g = svg.append("g").attr("class", "leaflet-zoom-hide");