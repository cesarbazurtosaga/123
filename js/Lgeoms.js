///********************************************
//Geometria de la vista de calles
///********************************************
var LpuntoSV_iconFeature = new ol.Feature({
  geometry: new ol.geom.Point([0, 0]),
  name: 'Null Island',
  population: 4000,
  rainfall: 500
});



var LpuntoSV_iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 120],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '../img/flecha.png',
    scale:0.2
  }))
});

LpuntoSV_iconFeature.setStyle(LpuntoSV_iconStyle);

var LpuntoSV_vS = new ol.source.Vector({
  features: [LpuntoSV_iconFeature]
});

var LpuntoSV_vL = new ol.layer.Vector({
  source: LpuntoSV_vS
});

///********************************************
//Geometria de la precision de la posicion
///********************************************


var Lprecision_iconFeature=new ol.Feature(new ol.geom.Circle( [-8260832.6, 510465.4], 1));


var styleCircle=new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0,0,255,0.05)'
    })
});

Lprecision_iconFeature.setStyle(styleCircle);



var vectorSource_precision = new ol.source.Vector();
vectorSource_precision.addFeature(Lprecision_iconFeature);

var Lprecision = new ol.layer.Vector({
     source: vectorSource_precision
});
