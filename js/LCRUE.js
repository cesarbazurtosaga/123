layer_addUbicacion_CRUE= function(response) {
		layer_vectUbicacion_CRUE.addFeatures(layer_vectUbicacion_CRUE.readFeatures(response));
}; 
layer_loadUbicacion_CRUE= function(extent) {
	appMap.LayersReload_extent(glo.UrlGeoserver+'modulo123/','modulo123:t_ubicacion_CRUE','layer_addUbicacion_CRUE',extent);		
};
layer_vectUbicacion_CRUE= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
   		layer_loadUbicacion_CRUE(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Ubicacion_CRUE = new ol.layer.Vector({
      source: layer_vectUbicacion_CRUE,
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
	                src: '../img/icons/CRUE.png',
	                scale:0.8
	              }))})];
	          }else{
	               styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.5, 46],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/CRUE_off.png',
	                scale:0.8
	              }))})];
	          }
          }else{
          	if(s<resagoMonitoreo){
	              styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 25],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/CRUE.png',
	                scale:0.4
	              }))})];
	          }else{
	               styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 25],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/CRUE_off.png',
	                scale:0.4
	              }))})];
	          }
          }
         
        return styleC;
      }
 });
 
 /****
  **ambulancias CRUE 
  */
 
layer_addUbicacion_AMBU= function(response) {
		layer_vectUbicacion_AMBU.addFeatures(layer_vectUbicacion_AMBU.readFeatures(response));
}; 
layer_loadUbicacion_AMBU= function(extent) {
	appMap.LayersReload_extent(glo.UrlGeoserver+'modulo123/','modulo123:t_ubicacion_AMBU','layer_addUbicacion_AMBU',extent);		
};
layer_vectUbicacion_AMBU= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
   		layer_loadUbicacion_AMBU(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Ubicacion_AMBU = new ol.layer.Vector({
      source: layer_vectUbicacion_AMBU,
      style: function(feature, resolution) {
          var text='';
          var styleC = '';
          var s=calcular_dif(feature);
          if(resolution<20){
	          if(s<resagoMonitoreo){
	              styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.5, 30],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Ambulancias.png',
	                scale:0.6
	              }))})];
	          }else{
	               styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.5, 30],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Ambulancias.png',
	                scale:0.6
	              }))})];
	          }
          }else{
          	if(s<resagoMonitoreo){
	              styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 25],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Ambulancias.png',
	                scale:0.4
	              }))})];
	          }else{
	               styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 25],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Ambulancias.png',
	                scale:0.4
	              }))})];
	          }
          }
         
        return styleC;
      }
 });
      
  