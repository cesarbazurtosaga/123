layer_addUbicacion_Ejercito= function(response) {
		layer_vectUbicacion_Ejercito.addFeatures(layer_vectUbicacion_Ejercito.readFeatures(response));
}; 
layer_loadUbicacion_Ejercito= function(extent) {
	appMap.LayersReload_extent(glo.UrlGeoserver+'modulo123/','modulo123:t_ubicacion_Ejercito','layer_addUbicacion_Ejercito',extent);  	
};
layer_vectUbicacion_Ejercito= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
   		layer_loadUbicacion_Ejercito(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Ubicacion_Ejercito = new ol.layer.Vector({
      source: layer_vectUbicacion_Ejercito,
      style: function(feature, resolution) {
          var text='';
          var styleC = '';
          var s=calcular_dif(feature);
          if(resolution<20){
        
          if(s<resagoMonitoreo){
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/icons/Ejercito.png',
                scale:0.8
              }))})];
          }else{
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/icons/Ejercito_off.png',
                scale:0.8
              }))})];
          }
          }else{
	          if(s<resagoMonitoreo){
	              styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 24],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Ejercito.png',
	                scale:0.6
	              }))})];
	          }else{
	              styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 25],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Ejercito_off.png',
	                scale:0.6
	              }))})];
	          }
          }
          
         
        return styleC;
      }
 });
    
  