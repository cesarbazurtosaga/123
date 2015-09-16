layer_addCasos= function(response) {
    layer_vectcaso.addFeatures(layer_vectcaso.readFeatures(response));
    setTimeout(function(){appMap.actualizar_lista_caso()}, 200);
}; 
layer_loadCasos= function(extent) {
    appMap.LayersReload_extent(glo.UrlGeoserver+'modulo123/','modulo123:g_caso','layer_addCasos',extent);		
};
layer_vectcaso= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
   		layer_loadCasos(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});
layer_caso = new ol.layer.Vector({
      source: layer_vectcaso,
      style: function(feature, resolution) {
          var text='';
          var styleC ='';
          if(feature.get("id_p_estado_caso")==1){
          styleC = [new ol.style.Style({
          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 36],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: '../img/icons/emergency.png',
            scale:1
          }))})];
          }
          if(feature.get("id_p_estado_caso")==2){
          styleC = [new ol.style.Style({
          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 36],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 1,
            src: '../img/icons/emergency1.png',
            scale:1
          }))})];
          }
        return styleC;
      }
 });
    
  