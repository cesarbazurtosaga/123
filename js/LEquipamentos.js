layer_add_Centro_Salud= function(response) {
    layer_vect_Centro_Salud.addFeatures(layer_vect_Centro_Salud.readFeatures(response));
}; 
layer_load_Centro_Salud= function(extent) {
    appMap.LayersReload_extent(glo.UrlGeoserver+'red_social/','red_social:g_centros_salud_rsd','layer_add_Centro_Salud',extent);   
};
layer_vect_Centro_Salud= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
        layer_load_Centro_Salud(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Centro_Salud = new ol.layer.Vector({
      source: layer_vect_Centro_Salud,
      style: function(feature, resolution) {
          console.log(resolution);
          if(resolution<5){
              var text='';
              var styleC = '';
                      
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/Centro_Salud.png',
                scale:0.5
              }))})];
          }
        return styleC;
      }
 });



/*******************************************************
 *Estaciones de policia
 * 
 */    
layer_add_Estaciones_Policia= function(response) {
    layer_vect_Estaciones_Policia.addFeatures(layer_vect_Estaciones_Policia.readFeatures(response));
}; 
layer_load_Estaciones_Policia= function(extent) {
    appMap.LayersReload_extent(glo.UrlGeoserver+'nuse123/','nuse123:g_nuse_policia','layer_add_Estaciones_Policia',extent);   
};
layer_vect_Estaciones_Policia= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
        layer_load_Estaciones_Policia(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Estaciones_Policia = new ol.layer.Vector({
      source: layer_vect_Estaciones_Policia,
      style: function(feature, resolution) {
          
          if(resolution<5){
              var text='';
              var styleC = '';
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/Estaciones_Policia.png',
                scale:0.5
              }))})];
          }
        return styleC;
      }
 }); 
 /*******************************************************
 *Instituciones educativas 
 * 
 */    
 

layer_add_Educacion_rural= function(response) {
    layer_vect_Educacion_rural.addFeatures(layer_vect_Educacion_rural.readFeatures(response));
}; 
layer_load_Educacion_rural= function(extent) {
    appMap.LayersReload_extent(glo.UrlGeoserver+'entidades_educativas/','entidades_educativas:g_educacion_ru','layer_add_Educacion_rural',extent);   
};
layer_vect_Educacion_rural= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
        layer_load_Educacion_rural(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Educacion_rural = new ol.layer.Vector({
      source: layer_vect_Educacion_rural,
      style: function(feature, resolution) {
         //console.log(resolution); 
          if(resolution<3){
              var text='';
              var styleC = '';
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/Educacion.png',
                scale:0.5
              }))})];
          }
        return styleC;
      }
 }); 
 
 
layer_add_Educacion_urbana= function(response) {
    layer_vect_Educacion_urbana.addFeatures(layer_vect_Educacion_urbana.readFeatures(response));
}; 
layer_load_Educacion_urbana= function(extent) {
    appMap.LayersReload_extent(glo.UrlGeoserver+'entidades_educativas/','entidades_educativas:g_educacion_urb','layer_add_Educacion_urbana',extent);   
};
layer_vect_Educacion_urbana= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
        layer_load_Educacion_urbana(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Educacion_urbana = new ol.layer.Vector({
      source: layer_vect_Educacion_urbana,
      style: function(feature, resolution) {
          //console.log(resolution);
          if(resolution<3){
              var text='';
              var styleC = '';
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/Educacion.png',
                scale:0.5
              }))})];
          }
        return styleC;
      }
 }); 

