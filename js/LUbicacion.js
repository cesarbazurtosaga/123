layer_addUbicacion= function(response) {
		layer_vectUbicacion.addFeatures(layer_vectUbicacion.readFeatures(response));
}; 
layer_loadUbicacion= function(extent) {
	appMap.LayersReload_extent(glo.UrlGeoserver+'modulo123/','modulo123:t_ubicacion_actual','layer_addUbicacion',extent);		
};
layer_vectUbicacion= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
   		layer_loadUbicacion(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Ubicacion = new ol.layer.Vector({
      source: layer_vectUbicacion,
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
                src: '../img/icons/Policia-NUSE.png',
                scale:0.8
              }))})];
           }
           else{
               styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/icons/Policia-NUSE_off.png',
                scale:0.8
              }))})];
          }
         }else {
         	if(s<resagoMonitoreo){
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.4, 23],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/icons/Policia-NUSE.png',
                scale:0.5
              }))})];
           }
           
           else{
               styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
                anchor: [0.4, 23],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/icons/Policia-NUSE_off.png',
                scale:0.5
              }))})];
          }	
         }
        return styleC;
      }
 });
    
  