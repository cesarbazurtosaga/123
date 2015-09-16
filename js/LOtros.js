layer_addUbicacion_otros= function(response) {
		layer_vectUbicacion_otros.addFeatures(layer_vectUbicacion_otros.readFeatures(response));
}; 
layer_loadUbicacion_otros= function(extent) {
	appMap.LayersReload_extent(glo.UrlGeoserver+'modulo123/','modulo123:t_ubicacion_otros','layer_addUbicacion_otros',extent);  	
};
layer_vectUbicacion_otros= new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
   		layer_loadUbicacion_otros(extent);
      },
      strategy: function() {
          return [ [-8576412.5, 371227.0, -7919054.0, 689816.5]];
      },
      projection: 'EPSG:3857'
});

layer_Ubicacion_otros = new ol.layer.Vector({
      source: layer_vectUbicacion_otros,
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
                src: '../img/icons/Gobernacion.png',
                scale:0.8
              }))})];
         }else{
              styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                src: '../img/icons/Gobernacion_off.png',
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
	                src: '../img/icons/Gobernacion.png',
	                scale:0.6
	              }))})];
	         }else{
	              styleC =[new ol.style.Style({
	              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	                anchor: [0.4, 25],
	                anchorXUnits: 'fraction',
	                anchorYUnits: 'pixels',
	                opacity: 1,
	                src: '../img/icons/Gobernacion_off.png',
	                scale:0.6
	              }))})];
	          }
          }
        return styleC;
      }
 });
    
 
 
setInterval(function(){
 	if(appMap.GjsonLlamada!=''){
		layer_addUbicacion_llamada(appMap.GjsonLlamada);
		//console.log('refreco casos');
	}
}, 30000);

layer_addUbicacion_llamada= function(response) {
	    response=appMap.filterJsonLlamadas(response);
		appMap.actualizar_lista_llamadas(response);
		layer_vectUbicacion_llamada.clear();		
		layer_vectUbicacion_llamada.addFeatures(layer_vectUbicacion_llamada.readFeatures(response));
		
}; 

layer_vectUbicacion_llamada= new ol.source.GeoJSON();

layer_Ubicacion_llamada = new ol.layer.Vector({
      source: layer_vectUbicacion_llamada,
      style: function(feature, resolution) {
        var text='';
        var styleC = '';
        var estado=feature.get('ES');
        var time = moment(feature.get("FE"),'DD-MM-YYYY HH:mm:ss');
        var minutos=calcular_dif_total(time);
        
        var img,opa=1,scale=0.5;
        
        img=asig_icono_llamada(estado,minutos);
        	  styleC =[new ol.style.Style({
              image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 40],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: opa,
                src: img,
                scale:scale
              }))})];
        
        return styleC;
      }
 });
  