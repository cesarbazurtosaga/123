 
  $(function(){
       
  		$("#panel_formulario").hide();
  		$("#select_nueve").hide();
  		$("#asignacion_recurso").hide();
  		$("#select_estado_caso").hide();
  		
  		
        $('.carousel').carousel({
            interval: 7000
        });
        $(".fancybox-button").fancybox({
            openEffect  : 'elastic',
            closeEffect : 'elastic',
    
            helpers : {
                title : {
                    type : 'inside'
                }
            }
        });     		
  		$('#datetimepicker_ruta_ini').datetimepicker({
            language: 'es',
            defaultDate: moment().format('DD/MM/YYYY')+' 00:01'
        });
        
        $('#datetimepicker_ruta_fin').datetimepicker({
            language: 'es',
            defaultDate: moment().format('DD/MM/YYYY HH:mm')
        });
        
        $("#datetimepicker_ruta_ini").on("dp.change",function (e) {
               $('#datetimepicker_ruta_fin').data("DateTimePicker").setMinDate(e.date);
        });
        $("#datetimepicker_ruta_fin").on("dp.change",function (e) {
               $('#datetimepicker_ruta_ini').data("DateTimePicker").setMaxDate(e.date);
        });
  		$("#select_tipo").change(function () {
            var str = "";
            $( "#select_tipo option:selected" ).each(function() {
              if($( this ).text()=="Valido"){
                  $("#select_nueve").show();
                  $("#asignacion_recurso").show();
                  $("#select_estado_caso").show();
              }else{
                  $("#select_nueve").hide();
                  $("#asignacion_recurso").hide();
                  $("#select_estado_caso").hide();
              } 
            });
        });
         
        $("#asignacion_recurso").change(function () {});
         
        $( "#agregar_bitacora" ).click(function() {
               appMap.tramitar_caso();             
        });
        $('.sidebar-left .slide-submenu').on('click',function() {
          var thisEl = $(this);
          thisEl.closest('.sidebar-body').fadeOut('slide',function(){
            $('.mini-submenu-left').fadeIn();
            applyMargins();
          });
        });
    
        $('.mini-submenu-left').on('click',function() {
          var thisEl = $(this);
          $('.sidebar-left .sidebar-body').toggle('slide');
          thisEl.hide();
          applyMargins();
        });
    
        $('.sidebar-right .slide-submenu').on('click',function() {
          var thisEl = $(this);
          thisEl.closest('.sidebar-body').fadeOut('slide',function(){
            $('.mini-submenu-right').fadeIn();
            applyMargins();
          });
        });
    
        $('.mini-submenu-right').on('click',function() {
          var thisEl = $(this);
          $('.sidebar-right .sidebar-body').toggle('slide');
          thisEl.hide();
          applyMargins();
        });
    
        $('#Ocultar_layers').on('click',function() {
          $("#panel_admin_contenido").toggle("scale",function(){
           $('#mostrar_layers').fadeIn();
            applyMargins();
          });
        });
        $('#mostrar_layers').hide();
        $('#mostrar_layers').on('click',function() {
          $("#mostrar_layers").toggle('scale',function(){
            $('#panel_admin_contenido').toggle('slide');
            applyMargins();
          });
        });
        
        $(window).on("resize", applyMargins);
        appMap = new MainMap();
        var map=appMap.DefineMap();
        appMap.selects();
        
        Lyrwms=new Lyr_wms();
        
        //Encendido adicion de layers
        map.addLayer(Lyrwms.base_SAGA);
        map.addLayer(Lyrwms.limite_vereda);
        map.addLayer(Lyrwms.limite_municipio);
        map.addLayer(Lyrwms.limite_provincial);
        map.addLayer(Lyrwms.limite_departamental);
        
        
        
        
       //map.addLayer(LayerProvLinea);
        map.addLayer(Lprecision);
        map.addLayer(layer_Educacion_rural);
        map.addLayer(layer_Educacion_urbana);
        map.addLayer(layer_Centro_Salud);
        map.addLayer(layer_Estaciones_Policia);
        
        
        
        map.addLayer(layer_Ubicacion_AMBU);
        map.addLayer(layer_Ubicacion_bomberos);
        map.addLayer(layer_Ubicacion_dcivil);
        map.addLayer(layer_Ubicacion_CRUE);
        map.addLayer(layer_Ubicacion_Ejercito);   
        map.addLayer(layer_Ubicacion_UAEPRAE);    
        map.addLayer(layer_Ubicacion_otros);   
        map.addLayer(layer_Ubicacion);
        map.addLayer(LpuntoSV_vL); 
        
        
        
        
        // Encendido de layers Iniciales    
        //LayerProvLinea.setVisible(true);
        
        Lyrwms.base_SAGA.setVisible(false);
        layer_caso.setVisible(true);
        layer_Educacion_rural.setVisible(true);
        layer_Educacion_urbana.setVisible(true);
        layer_Ubicacion.setVisible(false);
        layer_Ubicacion_bomberos.setVisible(false);
        layer_Ubicacion_dcivil.setVisible(false);
        layer_Ubicacion_AMBU.setVisible(false);
        layer_Ubicacion_CRUE.setVisible(false);
        layer_Ubicacion_Ejercito.setVisible(false);
        layer_Ubicacion_UAEPRAE.setVisible(false);
        layer_Ubicacion_otros.setVisible(false);
        layer_Ubicacion_llamada.setVisible(true);
        Lprecision.setVisible(true);
        
        applyInitialUIState();
        applyMargins();
        
        /*************************
        * Acrivar la sincronizacion de ubicacion de red de apoyo
        **********************/      
        appMap.sincr_ubicacion();
        $("#PanelUsrSECAD").hide();	
        $("#PaneSelectUsr").hide();
        $.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_permisos.php?id_usuario_nuse=' + localStorage.id_usuario_nuse, function(data) {
    		/******************************
			 *Configuracion de Ubicacion por APPMOVIL  
			 ******************************/        
			if(data[1].id_t_perfil_admin == '1'){
				map.addLayer(layer_caso);
				appMap.sincr_casos();
				$("#leyenda_Casos").hide();
			}
			
			    
			/******************************
			 *Configuracion de ubicacion de llamadas  
			 ******************************/
			if(data[1].id_t_perfil_admin == '5'){
				$("#PaneSelectUsr").show();
				$("#leyenda_Casos").show();
			    map.addLayer(layer_Ubicacion_llamada);
			    appMap.sincr_llamadas();
			    $("#firtroUsrSECAD").click(function (){
			    	$("#pUsrSECAD").empty().append($("#intUsrSecad").val());	
			    	appMap.UsrSecad=$("#intUsrSecad").val();
			    	layer_addUbicacion_llamada(appMap.GjsonLlamada);
			    	$("#PanelUsrSECAD").show();
			    });
			    $("#CleanFiltroSECAD").click(function (){
			    	$("#pUsrSECAD").empty();	
			    	appMap.UsrSecad='';
			    	layer_addUbicacion_llamada(appMap.GjsonLlamada);
			    	$("#PanelUsrSECAD").hide();	
			    });
			    
			}
		});
                 
        socket.on('set_refrescar_caso', function (data) {
            layer_vectcaso.clear();
        });
        
        
        /**
		* Add a popup de informacion.
		*/		
		
		info = $('#info');
		info.tooltip({
		  animation: false,
		  trigger: 'manual',
		  html:true
		});
		
		infoClick = $('#infoClick');
		infoClick.tooltip({
		  animation: false,
		  trigger: 'manual'
		});
	

		
		/**
		* Add Eventos over y click
		*/		
		/*$(map.getViewport()).on('mousemove', function(e) {
		  displayFeatureInfo(map.getEventPixel(e.originalEvent));		  
		});*/
		// change mouse cursor when over marker
        $(map.getViewport()).on('mousemove', function(e) {
          
          displayFeatureInfo(map.getEventPixel(e.originalEvent));
        });
		map.on('click', function(evt) {
		    
		   
     		displayFeatureInfoClick(evt,"Mapa");
			
		});
		
		/*
		 * Activar Vista de calles
		 */
		$('#id_vista_calles').on('click', function(evt) {
		    if(appMap.rutas_activas==true){
                close_panel_rutas();     
              }
		    if(appMap.vistacalle==false){
    		     $("#id_vista_calles").removeClass( "btn-primary" );
    		     $("#id_vista_calles").addClass( "btn-success" );
    		     appMap.vistacalle=true;
    		     
    		     $("#map").css( "width", "50%" );
    		     $("#pano").css( "width", "50%" );
    		     applyMargins();
    		     map.updateSize();
    		     google.maps.event.trigger(gmap, 'resize');
    		     var center = ol.proj.transform(appMap.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
                 gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
                 if($("#panel_admin_contenido").is(':visible')){
                      $("#panel_admin_contenido").toggle("scale",function(){
                       $('#mostrar_layers').fadeIn();
                        applyMargins();
                      });
                 }
                  
		     }else{
		         $("#id_vista_calles").removeClass( "btn-success" );
                 $("#id_vista_calles").addClass( "btn-primary" );
                 appMap.vistacalle=false;
                 $("#map").css( "width", "100%" );
                 $("#pano").css( "width", "0%" );
                 map.updateSize();
                 google.maps.event.trigger(gmap, 'resize');
                 var center = ol.proj.transform(appMap.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
                 gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
                 LpuntoSV_iconFeature.setGeometry(new ol.geom.Point([0,0]));
                 if(appMap.rutas_activas!=true){
                     if(!$("#panel_admin_contenido").is(':visible')){
                        $("#mostrar_layers").toggle('scale',function(){
                            $('#panel_admin_contenido').toggle('slide');
                            applyMargins();
                          });
                     }
                 }
             }
		      panorama.setVisible(false);
        });
    /*
         * Activar Vista de calles
         */
       		
		
		
        $( "#Busqueda_general" ).autocomplete({
          source: function( request, response ) {
            $.ajax({
              url: glo.UrlSaga+"/SIG/servicios/m123/m123_servicios_busqueda.php",
              dataType: "jsonp",
              encoding:"UTF-8",
              data: {
                q: request.term,
                tipousr: localStorage.id_p_tipo_usuario
              },
              success: function( data ) {
                
                response( data );
              }
            });
          },
          minLength: 3,
          select: function( event, ui ) {
              layer_on_id(ui.item.tipo_usuario);
              var coord_3857 = ol.proj.transform([parseFloat(ui.item.longitud),parseFloat(ui.item.latitud)], 'EPSG:4326', 'EPSG:3857');
              displayZoomClick(coord_3857);
              setTimeout(function(){
                    var pixel=map.getPixelFromCoordinate(coord_3857);
                    var evt={"pixel":pixel, "coordinate":coord_3857};
                    displayFeatureInfoClick(evt,"lista");
               }, 2200);
            
          },
          open: function() {
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
          },
          close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
          }
        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
            //console.log(item.tipo_usuario);
               return $( '<li class="left clearfix" style="min-width:350px; ">' )
                  .append('<span class="chat-img pull-left">'+
                  '<img src="../img/icons/'+asig_icono(item.tipo_usuario)+'" height="30" />'+
                        '</span>'+
                            '<div class="chat-body clearfix">'+
                                '<div class="header">'+
                                    '<strong class="primary-font">'+item.label+'</strong> <small class="pull-right text-muted">'+
                                '</div>'+
                                '<p>'+
                                     item.desc+ ' - '+ item.nombre_mun+
                                '</p>'+
                            '</div>'+
                        '</li>').appendTo( ul );
            
        };
 });