 var MainMap = function() {
     this.map = "";
     this.maxIdCaso = "";
     this.maxDate = "";
     this.data_call = "";
     this.audio_sirena = document.getElementById("sirena");
     this.servidor_servicios = glo.UrlSaga+"/SIG/servicios/m123/";
     this.vistacalle = false;
     this.rutas_activas = false;
     this.id_ruta_activas = false;
	 this.GjsonLlamada='';
	 this.socketCaso = '';
	 this.UsrSecad = '';	 
     this.centrar = function(x, y) {
         app = this;
		 $("#popup").popover('destroy');
		 displayZoomClick([x, y]);
         setTimeout(function() {
             var pixel = app.map.getPixelFromCoordinate([x, y]);
             var evt = {
                 "pixel": pixel,
                 "coordinate": [x, y]
             };
             displayFeatureInfoClick(evt, "lista");
         }, 2000);
     };
     this.set_data_call = function(numero, numero_salida, imei, id_caso) {
         //console.log(numero+"-"+imei+"-"+serial+"-"+id_caso);
         this.data_call = {
             "numero": numero,
             "numero_salida": numero_salida,
             "imei": imei,
             "id_caso": id_caso
         };
     };
    this.tramitar_caso = function() {
         var app = this;
         //app.audio_sirena.stop();
         if ($("#select_tipo").val() == null) {
             msj_peligro("Pof Favor selecione el tipo de caso");
             $("#select_tipo").focus();
         } else if ($("#descripcion_bitacora").val() == "") {
             msj_peligro("Pof Favor ingrese la descripcion del caso");
             $("#descripcion_bitacora").focus();
         } else if ($("#select_tipo").val() !== "1") {
             $.post(app.servidor_servicios + "m123_tramitar.php", {
                 descripcion: $("#descripcion_bitacora").val(),
                 tipo: $("#select_tipo").val(),
                 clasificacion_nueve: 0,
                 estado: 3,
                 id_caso: this.data_call.id_caso
             }).done(function(data) {
                 layer_vectcaso.clear();
                 $("#panel_formulario").hide(1000, function() {
                     $("#popup").popover('destroy');

                     $("#descripcion_bitacora").val("");
                     $("#select_tipo").val("0");
                     $("#select_nueve").val("0");
                     msj_exito("Se tramito el caso con exito");
                     app.actualizar_lista();
                     socket.emit('get_refrescar_caso', "refrescar");
                 });
             });
         } else {

             if ($("#select_nueve").val() == null) {
                 msj_peligro("Por favor seleccione la clasificacion nueve del caso");
                 $("#select_nueve").focus();
             } else {

                 $.post(app.servidor_servicios + "m123_tramitar.php", {
                     descripcion: $("#descripcion_bitacora").val(),
                     tipo: $("#select_tipo").val(),
                     clasificacion_nueve: $("#select_nueve").val(),
                     estado: 3,
                     id_caso: this.data_call.id_caso
                 }).done(function(data) {
                     $("#panel_formulario").hide(1000, function() {
                         $("#popup").popover('destroy');
                         app.actualizar_lista();
                         $("#descripcion_bitacora").val("");
                         $("#select_tipo").val("0");
                         $("#select_nueve").val("0");
                         msj_exito("Se tramito el caso con exito");
                         socket.emit('get_refrescar_caso', "refrescar");
                         app.actualizar_lista();
                     });
                 });
             }
         }
     };
     this.tomar_caso = function() {
         var app = this;
         var msj = "Usted ha tomado este caso, Diligencie el formulario!!";
         msj_info(msj);
         $.post(app.servidor_servicios + "m123_set_llamada_caso.php", {
             id_usr: localStorage.getItem("id_usr"),
             id_caso: this.data_call.id_caso
         }).done(function(data) {
             socket.emit('get_refrescar_caso', "refrescar");
         });
     };

     this.llamar = function(tipo) {
         socket.emit('llamada_general', this.data_call);
         var msj = "Se ha disparado la llamada Exitosamente!!";
         msj_exito(msj);

         if (tipo == "caso") {
             $("#panel_formulario").show(1000);
             this.tomar_caso();
         }

     };
     this.selects = function() {
         var app = this;
         var text, text2;
         $.ajax({
             url: app.servidor_servicios + "m123_get_clasificacion_nueve.php",
             async: false,
             jsonpCallback: 'jsonCallback3',
             contentType: "application/json",
             dataType: 'jsonp',
             success: function(data) {
                 if (data[0].encontrado == "true") {
                     $.each(data, function(key, value) {
                         if (key != 0) {

                             text = "<option value='" + value.id + "'>" + value.valor + "</option>";
                             $("#select_nueve").append(text);
                         }
                     });
                 }
             }
         });
         $.ajax({
             url: app.servidor_servicios + "m123_get_tipo_caso.php",
             async: false,
             jsonpCallback: 'jsonCallback4',
             contentType: "application/json",
             dataType: 'jsonp',
             success: function(data) {
                 if (data[0].encontrado == "true") {
                     $.each(data, function(key, value) {
                         if (key != 0) {
                             text2 = "<option value='" + value.id + "'>" + value.descripcion + "</option>";
                             $("#select_tipo").append(text2);
                         }
                     });
                 }
             }
         });

     };
     this.filterJsonLlamadas=function(Gjson){
     	var FeaturesCaso;
     	if(this.UsrSecad!=''){
     	 	FeaturesCaso = turf.filter(Gjson,"USU",this.UsrSecad);
     	 }else{
     	 	FeaturesCaso=Gjson;
     	 }
     	 return FeaturesCaso; 
     };
     this.actualizar_lista_llamadas = function(Gjson) {
     	 var item="",i, j, coord,feature;
     	 console.log("ingreso a actualizar lista");
     	 FeaturesCaso = Gjson.features;
         $("#list_casos ul").empty();
         
	     for (i = 0; i < FeaturesCaso.length; i++) {
	     		 feature=FeaturesCaso[i];
	             var estado=feature.properties.ES;
			     var time = moment(feature.properties.FE,'DD-MM-YYYY HH:mm:ss');
			     var minutos=calcular_dif_total(time);
			     var img,opa=1,scale=0.8;
			     img=asig_icono_llamada(estado,minutos);  
	             item += '<li class="left clearfix  list-group-item" onclick="appMap.centrar(' + feature.geometry.coordinates[0] + ',' + feature.geometry.coordinates[1] + ')">' +
	                 '<span class="chat-img pull-left">' +
	                 '<img src="'+ img + '"  height="36px" width="34px">' +
	                 '</span>' +
	                 '<div class="chat-body clearfix">' +
	                 '<div class="header">' +
	                 '<strong class="primary-font">' + feature.properties.USU + '</strong> <small class="pull-right text-muted">' +
	                 '<span class="glyphicon glyphicon-time"></span>' + feature.properties.TI + '</small>' +
	                 '</div>' +
	                 '<p>' +
	                 feature.properties.MUN+'-'+feature.properties.NUM +
	                 '</p>' +
	                 '</div>' +
	                 '</li>';
	     }
		 $("#list_casos ul").append(item);
     };
     
     this.sincr_llamadas = function() {
     	this.socketCaso=io.connect(glo.UrlSocket+'/webmapCaso');
     	this.socketCaso.on('GejsonCall', function(data) {
			appMap.GjsonLlamada=data;
			console.log(data);
			layer_addUbicacion_llamada(data);
		    
		});
 	 };
     this.actualizar_lista_caso = function() {
         FeaturesCaso = layer_vectcaso.getFeatures();

         var item = "",
             i, j, coord;
         identificadores = [];
         for (i = 0; i < FeaturesCaso.length; i++) {
             identificadores[i] = FeaturesCaso[i].get('id');
         }
         //identificadores.sort(function(a, b){return b-a});
         identificadores.sort();


         $("#list_casos ul").empty();
         //console.log(FeaturesCaso.length+"cantidad casos");
         for (j = 0; j < FeaturesCaso.length; j++) {
             for (i = 0; i < FeaturesCaso.length; i++) {
                 if (identificadores[j] == FeaturesCaso[i].get('id')) {
                     geometry = FeaturesCaso[i].getGeometry();
                     coord = geometry.getCoordinates();
                     var imagen = "";
                     if (FeaturesCaso[i].get("id_p_estado_caso") == 1) {
                         imagen = "emergency.png";
                     } else if (FeaturesCaso[i].get("id_p_estado_caso") == 2) {
                         imagen = "emergency1.png";
                     }
                     item += '<li class="left clearfix  list-group-item" onclick="appMap.centrar(' + coord[0] + ',' + coord[1] + ')">' +
                         '<span class="chat-img pull-left">' +
                         '<img src="../img/icons/' + imagen + '"  height="40px" width="60px">' +
                         '</span>' +
                         '<div class="chat-body clearfix">' +
                         '<div class="header">' +
                         '<strong class="primary-font">' + FeaturesCaso[i].get('nombre_completo') + '</strong> <small class="pull-right text-muted">' +
                         '<span class="glyphicon glyphicon-time"></span>' + FeaturesCaso[i].get('fecha_creacion') + '</small>' +
                         '</div>' +
                         '<p>' +
                         FeaturesCaso[i].get('descripcion') +
                         '</p>' +
                         '</div>' +
                         '</li>';
                 }
             }

         }
         $("#list_casos ul").append(item);
     };
     
     this.sincr_casos = function() {
         var app = this;
         setInterval(function() {
             $.ajax({
                 url: app.servidor_servicios + "m123_get_casos.php",
                 async: false,
                 jsonpCallback: 'jsonCallback',
                 contentType: "application/json",
                 dataType: 'jsonp',
                 success: function(data) {
                     if (data[0].encontrado == "true") {
                         if (app.maxIdCaso != parseFloat(data[1].maxid)) {
                             if (app.maxIdCaso != "") {
                                 msj_peligro("NUEVO CASO");
                                 app.audio_sirena.play();
                                 layer_vectcaso.clear();

                             }
                             app.maxIdCaso = parseFloat(data[1].maxid);

                         }
                     }
                 }
             });

         }, 5000);
     };
     this.sincr_ubicacion = function() {
         var app = this;
         setInterval(function() {

             $.ajax({
                 url: app.servidor_servicios + "m123_get_ubicacion.php",
                 async: false,
                 jsonpCallback: 'jsonCallback2',
                 contentType: "application/json",
                 dataType: 'jsonp',
                 success: function(data) {
                     if (data[0].encontrado == "true") {
                         if (app.maxDate != (data[1].maxdate)) {

                             if (app.maxDate != "") {
                                 layer_vectUbicacion.clear();
                                 layer_vectUbicacion_bomberos.clear();
                                 layer_vectUbicacion_dcivil.clear();
                                 layer_vectUbicacion_CRUE.clear();
                                 layer_vectUbicacion_Ejercito.clear();
                                 layer_vectUbicacion_UAEPRAE.clear();
                                 layer_vectUbicacion_otros.clear();
                                 //$("#popup").popover('destroy');
                             }
                             app.maxDate = data[1].maxdate;

                         }
                     }
                 }
             });


         }, 60000);
     };
     //Define los Layers A Trabajar
     this.LayersReload = function(geohost, layer_name, name_function) {
         var url = geohost + 'ows?service=WFS&' +
             'version=1.0.0&request=GetFeature&typeName=' + layer_name + '&' +
             'outputFormat=text/javascript&format_options=callback:' + name_function +
             '&srsname=EPSG:3857';

         $.ajax({
             url: url,
             dataType: 'jsonp'
         });
     };
     this.LayersReload_extent = function(geohost, layer_name, name_function, extent) {
         var url = geohost + 'wfs?service=WFS&' +
             'version=1.1.0&request=GetFeature&typeName=' + layer_name + '&' +
             'outputFormat=text/javascript&format_options=callback:' + name_function +
             '&srsname=EPSG:3857';
		 $.ajax({
             url: url,
             dataType: 'jsonp'
         });
     };

    this.base_osm_cl =  new ol.layer.Tile({ 
		 	source: new ol.source.MapQuest({layer: 'osm'}) 
		 });


     this.LayersBaseMap = function() {
         

         var layerarray = [this.base_osm_cl];
         return layerarray;

     };

     /*  this.view= new ol.View({
        // make sure the view doesn't go beyond the 22 zoom levels of Google Maps
        maxZoom: 21
      });
       */

     this.view = new ol.View({
         minZoom: 2,
         maxZoom: 18
     });

     this.popup = new ol.Overlay({
         element: $("#popup"),
         positioning: 'bottom-center'
     });
     this.googlemaps = false;
     this.integracion_google = function() {
         var center = ol.proj.transform(this.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
         gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
         gmap.setZoom(this.view.getZoom());
     };

     //Define el mapa
     this.DefineMap = function() {
         var app = this;

         app.view.on('change:center', function() {
             if (app.googlemaps == true) {
                 var center = ol.proj.transform(app.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
                 gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
             }
         });
         app.view.on('change:resolution', function() {
             if (app.googlemaps == true) {
                 gmap.setZoom(app.view.getZoom());
             }
         });
         var olMapDiv = document.getElementById('olmap');
         var map = new ol.Map({
             controls: ol.control.defaults().extend([
                 new ol.control.ScaleLine({
                     units: 'metric'
                 })
             ]),
             interactions: ol.interaction.defaults({
                 altShiftDragRotate: false,
                 dragPan: false,
                 rotate: false
             }).extend([new ol.interaction.DragPan({
                 kinetic: null
             })]),
             target: olMapDiv,
             layers: this.LayersBaseMap(),
             overlays: [app.popup],
             view: app.view
         });
         app.view.setCenter([-8248592.9, 540000]);
         app.view.setZoom(9);
         app.integracion_google();
         olMapDiv.parentNode.removeChild(olMapDiv);
         gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);
         this.map = map;
         return map;
     };
 };