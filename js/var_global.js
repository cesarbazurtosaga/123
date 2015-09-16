var appMap, Lyrwms;
var info, infoClick;

var glo={
	UrlSaga:'http://localhost',//"http://saga.cundinamarca.gov.co"
	UrlGeoserver: 'http://saga.cundinamarca.gov.co:8080/geoserver/',
	UrlSocket: 'http://saga.cundinamarca.gov.co:3321'
}


var socket = io.connect(glo.UrlSocket+'/webmap');

var resagoMonitoreo = 48;
var inicial_vista_calles = 0;

socket.on('news', function(data) {
    console.log(data)
});


/******************************
 *Configuracion de Google Maps  
 ******************************/
var gmap = new google.maps.Map(document.getElementById('gmap'), {
    disableDefaultUI: true,
    keyboardShortcuts: false,
    draggable: false,
    disableDoubleClickZoom: true,
    scrollwheel: false,
    streetViewControl: false
});
var panorama;
var panoramaOptions = {
    pov: {
        heading: 34,
        pitch: 10
    }
};
panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
gmap.setStreetView(panorama);
google.maps.event.addListener(panorama, 'position_changed', function() {
    if (appMap.vistacalle == true) {
        var coord = panorama.getPosition();
        var coord_4326 = new Array();
        var i=0;
        $.each(coord, function( index, value ) {
        	if(i<2){
        		coord_4326[i] = value;
        	}        	
        	i++;       	
  		});
                var coord_3857 = ol.proj.transform([coord_4326[1],coord_4326[0]], 'EPSG:4326', 'EPSG:3857');
     	//console.log(coord_3857);
     	//console.log(LpuntoSV_iconFeature.getGeometry().getCoordinates());
        LpuntoSV_iconFeature.setGeometry(new ol.geom.Point(coord_3857))
    }
});
google.maps.event.addListener(panorama, 'pov_changed', function() {
    var headingCell = panorama.getPov().heading;
    headingCell = degToRad(headingCell);
    LpuntoSV_iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 120],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '../img/flecha.png',
            scale: 0.2,
            rotation: headingCell
        }))
    });
    LpuntoSV_iconFeature.setStyle(LpuntoSV_iconStyle)
});
var streetViewService = new google.maps.StreetViewService();
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})