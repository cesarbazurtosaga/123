var displayFeatureInfo = function(pixel) {
    info.css({
        left: pixel[0] + 'px',
        top: (pixel[1] - 10) + 'px'
    });
    var layer_tmp = null;
    var feature = appMap.map.forEachFeatureAtPixel(pixel, function(feature, layer) {

        layer_tmp = layer;
        if (feature) {
            if (layer_tmp == layer_Estaciones_Policia) {
                appMap.map.getTarget().style.cursor = 'pointer';
                var text = "<b>" + feature.get('nombre') + "</b>" + "<br>" + feature.get("nombre_mun");

                info.tooltip('hide')
                    .attr('data-original-title', text)
                    .tooltip('fixTitle')
                    .tooltip('show');

            } else if (layer_tmp == layer_Centro_Salud) {
                appMap.map.getTarget().style.cursor = 'pointer';
                var text = "<b>" + feature.get('nombre_sed') + "</b>" + "<br>" + feature.get("municipio");

                info.tooltip('hide')
                    .attr('data-original-title', text)
                    .tooltip('fixTitle')
                    .tooltip('show');

            } else if (layer_tmp == layer_Educacion_urbana) {
                appMap.map.getTarget().style.cursor = 'pointer';
                var text = "<b>" + feature.get('nombre') + "</b>" + "<br>" + feature.get("mpio");

                info.tooltip('hide')
                    .attr('data-original-title', text)
                    .tooltip('fixTitle')
                    .tooltip('show');

            } else if (layer_tmp == layer_Educacion_rural) {
                appMap.map.getTarget().style.cursor = 'pointer';
                var text = "<b>" + feature.get('nombre') + "</b>" + "<br>" + feature.get("mpio");

                info.tooltip('hide')
                    .attr('data-original-title', text)
                    .tooltip('fixTitle')
                    .tooltip('show');

            } else if (layer_tmp == layer_caso) {
            		appMap.map.getTarget().style.cursor = 'pointer';
                    var text = "<b>" + feature.get('nombre_completo') + "</b>" + "<br>" ;

                    info.tooltip('hide')
                        .attr('data-original-title', text)
                        .tooltip('fixTitle')
                        .tooltip('show');
            } else if (layer_tmp == layer_Ubicacion_llamada) {
            		appMap.map.getTarget().style.cursor = 'pointer';
                    var text = "<b>" + feature.get('USU') + "</b>" 
                    + "<br>" + feature.get("NUM")
                    + "<br>" + feature.get("MUN");
                    
                    info.tooltip('hide')
                        .attr('data-original-title', text)
                        .tooltip('fixTitle')
                        .tooltip('show');
            }              
            else if (layer_tmp != LpuntoSV_vL) {
                if (layer_tmp != Lprecision) {
                    appMap.map.getTarget().style.cursor = 'pointer';
                    var text = "<b>" + feature.get('nombre_completo') + "</b>" + "<br>" + feature.get("nombre_mun");

                    info.tooltip('hide')
                        .attr('data-original-title', text)
                        .tooltip('fixTitle')
                        .tooltip('show');
                } else {
                    info.tooltip('hide');
                    appMap.map.getTarget().style.cursor = '';
                }
            }
        }
        return feature;
    });
    if (!feature) {
        info.tooltip('hide');
        appMap.map.getTarget().style.cursor = '';
    }
};
$("#carousel-panel-fotos").hide();
var displayFeatureInfoClick = function(evt, origen) {
    pixel = evt.pixel;
    var layer_tmp = null;
    var feature, coord;
    feature = appMap.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        layer_tmp = layer;
        if (feature) {
            if (layer_tmp == layer_caso) {
                coord = popoup_feature(feature);
                $("#popup").attr("data-style", "alerta");
                $("#popup").popover('destroy');
                var text_content;
                if (text_content = feature.get('asunto') != "Boton de Panico") {
                    text_content = feature.get('descripcion');
                } else {
                    text_content = feature.get('asunto');
                }

                var foto = feature.get('url_foto');

                var html_foto = "";
                $("#carousel-panel-fotos").hide();
                if (foto) {
                    var fotos = foto.split(", ");
                    var i;	
                    html_foto = '<div id="carousel-fotoscaso-generic" class="carousel slide" data-ride="carousel" style="max-height:250px;">' +
                        '<ol class="carousel-indicators">';
                    for (i = 0; i < fotos.length; i++) {
                        if (i == 0) {
                            html_foto += '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
                        } else {
                            html_foto += '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" ></li>';
                        }
                    }

                    html_foto += '</ol>' +
                        '<div class="carousel-inner">';
                    for (i = 0; i < fotos.length; i++) {
                        if (i == 0) {
                            html_foto += '<div class="item active"  style="height:150px">' +
                                '<a class="fancybox-button" rel="fancybox-button" href="http://saga.cundinamarca.gov.co/SIG/' + fotos[i] + '" >' +
                                '<img src="http://saga.cundinamarca.gov.co/SIG/' + fotos[i] + '"  height="150px" ></a>' +
                                '<div class="carousel-caption">' +
                                '</div>' +
                                '</div>';
                        } else {
                            html_foto += '<div class="item"  style="height:150px">' +
                                '<a class="fancybox-button" rel="fancybox-button" href="http://saga.cundinamarca.gov.co/SIG/' + fotos[i] + '" >' +
                                '<img src="http://saga.cundinamarca.gov.co/SIG/' + fotos[i] + '"  height="150px" ></a>' +
                                '<div class="carousel-caption">' +
                                '</div>' +
                                '</div>';
                        }
                    }

                    html_foto += '</div>' +
                        '<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">' +
                        '<span class="glyphicon glyphicon-chevron-left"></span>' +
                        '</a>' +
                        '<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">' +
                        '<span class="glyphicon glyphicon-chevron-right"></span>' +
                        '</a>' +
                        '</div>';
                        
                    $("#carousel-panel-fotos").show();
					$("#FotosCaso").empty().append(html_foto);
                }

                $("#popup").popover({
                    'placement': 'right',
                    'html': true,
                    'delay': {
                        "show": 500,
                        "hide": 100
                    },
                    'title': '<div style="height:20px">' +
                        '<h4 class="panel-title  pull-left" >' +
                        '<i class="fa fa fa-bell-o"></i>' +
                        ' Alerta!!' +
                        '</h4>' +
                        '<span class="pull-right slide-submenu" >' +
                        '<i class="fa fa-times"  onclick="ClosePopup();" ></i>  ' +
                        '</span>' +
                        '</div>',
                    'content': '<div class="header">' +
                        '<strong class="primary-font">' + feature.get('nombre_completo') + '</strong>' +
                        '</div>' +
                        '<p class="PopContent">' +
                        text_content +
                        '</p>' +
                        '<p><small class="text-muted"><span class="glyphicon glyphicon-time">  ' +
                        feature.get('fecha_creacion') +
                        '</small><br>' +
                        '<small class="text-muted"><span class="glyphicon glyphicon-phone-alt">   ' +
                        feature.get('numero_telefono') +
                        '</small></p>' +
                        //html_foto +
                        '<br>' +
                        '<button type="button" class="btn btn-success btn-xs" onclick="appMap.llamar(\'caso\')">  <span class="glyphicon glyphicon-earphone"></span> Llamar</button>' +
                        '<span class="pull-right slide-submenu" >' +
                        '<button type="button" class="btn btn-xs" onclick="displayZoomClick_extend();">  <span class="fa fa-arrows-alt"></span> Cerrar</button>' +
                        '</span>'

                });
                
                
                appMap.set_data_call(feature.get('numero_telefono'), localStorage.getItem("numero_telefono"), localStorage.getItem("imei"), feature.get('id'));
                $("#panel_formulario").hide(1000);
                $("#popup").popover('show');
                Lprecision_iconFeature.setGeometry(new ol.geom.Circle(coord, feature.get('exactitud')));

            }else if (layer_tmp == layer_Ubicacion_llamada) {
            	 coord = popoup_feature(feature);
                    contentPopup = '<div class="header">' +
                        '<strong class="primary-font">' +
                        feature.get('USU') +
                        '</strong>' +
                        '<span class="pull-right" >' +
                        '<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="right" title="Acercar al Punto" onclick="displayZoomClick([' + coord + ']);">  <span class="fa fa-compress"></span></button>' +
                        '</span>' +
                        '</div>' +
                        '<p class="PopContent">' +
                        feature.get('MUN') + " - "+feature.get('VER') +
                        '</p>' +
                        '<div><small class="text-muted"><span class="glyphicon glyphicon-phone-alt"></span> ' + feature.get('NUM') + '</small></div>'+
                        '<div><small class="text-muted"><span class="glyphicon glyphicon-signal"></span> ' + feature.get('OPE') + '</small></div>'+
                    	'<div><small class="text-muted"><span class="glyphicon glyphicon-time"></span> Operador: ' + feature.get('TI') + '</small></div>' +
                        '<div><small class="text-muted"><span class="glyphicon glyphicon-time"></span> Registro: ' + feature.get('FE') + '</small></div>' +
                        '<div><small class="text-muted"><span class="fa fa-exclamation-triangle"></span> ' + feature.get('RAD').toString().substring(0, 4) + ' Metros de Precision</small></div>' +
                        '<div><small class="text-muted"><span class="fa fa-space-shuttle"></span> ' + feature.get('ES') + ' </small></div>'+
						'<span class="pull-right" >' +
                        '<button  onclick="displayZoomClick_extend();" type="button" class="btn btn-primary   btn-xs"  data-toggle="tooltip" data-placement="right" title="Extencion del mapa" >  <span class="fa fa-arrows-alt"></span> </button>' +
                        '</span>';

                    $("#popup").popover('destroy');
                    ///console.log('"tipo'+feature.get('id_p_tipo_usuario')+'"');
                    $("#popup").popover({
                        'placement': 'right',
                        'html': true,
                        'delay': {
                            "show": 500,
                            "hide": 100
                        },
                        'title': '<div style="height:20px">' +
                            '<h4 class="panel-title  pull-left" >' +
                            '<i class="fa fa-map-marker "></i>' +
                            ' Ubicacion!!' +

                            '</h4>' +
                            '<span class="pull-right slide-submenu" >' +
                            '<i class="fa fa-times"  onclick="ClosePopup();" ></i>  ' +
                            '</span>' +
                            '</div>',
                        'content': contentPopup

                   	 });
                    $("#popup").popover('show');
                    Lprecision_iconFeature.setGeometry(new ol.geom.Circle(coord, feature.get('RAD')));
            }            
            else if (layer_tmp != LpuntoSV_vL && layer_tmp != Lprecision && layer_tmp != layer_Educacion_rural &&layer_tmp != layer_Educacion_urbana && layer_tmp != layer_Estaciones_Policia && layer_tmp != layer_Centro_Salud) {
                	var contentPopup;
                	coord = popoup_feature(feature);
                    contentPopup = '<div class="header">' +
                        '<strong class="primary-font">' +
                        feature.get('nombre_completo') +
                        '</strong>' +
                        '<span class="pull-right" >' +
                        '<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="right" title="Acercar al Punto" onclick="displayZoomClick([' + coord + ']);">  <span class="fa fa-compress"></span></button>' +
                        '</span>' +
                        '</div>' +
                        '<p class="PopContent">' +
                        feature.get('nombre_mun') +
                        '</p>' +
                        '<span class="pull-left" >' +
                        '<button type="button" class="btn btn-info   btn-xs"  onclick="open_panel_rutas(' + feature.get('id_pa_asignacion_equipo') + ');">  <span class="fa fa-road"></span> Ver Ruta </button>' +
                        '</span><br><br>' +
                        '<div><small class="text-muted"><span class="glyphicon glyphicon-phone-alt"></span> ' + feature.get('numero_telefono') + '</small></div>';
                    
                        contentPopup += '<div><small class="text-muted"><span class="glyphicon glyphicon-time"></span> ' + feature.get('fecha_captura') + '</small></div>' +
                            '<div><small class="text-muted"><span class="fa fa-crosshairs"></span> GPS ' + feature.get('estado_gps') + '</small></div>' +
                            '<div><small class="text-muted"><span class="fa fa-tag"></span> APP ' + feature.get('estado_app') + '</small></div>' +
                            '<div><small class="text-muted"><span class="fa fa-exclamation-triangle"></span> ' + feature.get('exactitud').toString().substring(0, 4) + ' Metros de Precision</small></div>' +
                            '<div><small class="text-muted"><span class="fa fa-space-shuttle"></span> ' + feature.get('velocidad') + ' Km/h</small></div>';
						contentPopup += ' <br><button type="button" class="btn btn-success btn-xs" onclick="appMap.llamar(\'ubicacion\')">  <span class="glyphicon glyphicon-earphone"></span> Llamar</button>' +
                        '<span class="pull-right" >' +
                        '<button  onclick="displayZoomClick_extend();" type="button" class="btn btn-primary   btn-xs"  data-toggle="tooltip" data-placement="right" title="Extencion del mapa" >  <span class="fa fa-arrows-alt"></span> </button>' +
                        '</span>';

                    $("#popup").popover('destroy');
                    ///console.log('"tipo'+feature.get('id_p_tipo_usuario')+'"');
                    $("#popup").attr("data-style", '"tipo' + feature.get('id_p_tipo_usuario') + '"');
                    $("#popup").popover({
                        'placement': 'right',
                        'html': true,
                        'delay': {
                            "show": 500,
                            "hide": 100
                        },
                        'title': '<div style="height:20px">' +
                            '<h4 class="panel-title  pull-left" >' +
                            '<i class="fa fa-map-marker "></i>' +
                            ' Ubicacion!!' +

                            '</h4>' +
                            '<span class="pull-right slide-submenu" >' +
                            '<i class="fa fa-times"  onclick="ClosePopup();" ></i>  ' +
                            '</span>' +
                            '</div>',
                        'content': contentPopup

                   	 });
                    appMap.set_data_call(feature.get('numero_telefono'), localStorage.getItem("numero_telefono"), localStorage.getItem("imei"), feature.get('id'));
                    $("#popup").popover('show');
                    Lprecision_iconFeature.setGeometry(new ol.geom.Circle(coord, feature.get('exactitud')));
            }
        }
        if (origen == "Mapa") {
            appMap.map.getView().fitExtent(vectorSource_precision.getExtent(), appMap.map.getSize());
        }
        return feature;
    });
    if (appMap.vistacalle == true) {
        var coordinate = evt.coordinate;
        var coord_4326 = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
        var position_vista = new google.maps.LatLng(coord_4326[1], coord_4326[0]);
        panorama.setPosition(position_vista);
        streetViewService.getPanoramaByLocation(position_vista, 40, function(streetViewPanoramaData, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                console.log("hol2");
                var coord = panorama.getPosition();
                coord_4326 = new Array();
                coord_4326[0] = coord["B"];
                coord_4326[1] = coord["k"];
                panorama.setVisible(true);
            } else {
                console.log("hol3");
                panorama.setVisible(false);
            }
        });

        var coord_3857 = ol.proj.transform(coord_4326, 'EPSG:4326', 'EPSG:3857');
        LpuntoSV_iconFeature.setGeometry(new ol.geom.Point(coord_3857));
    }
};


var ClosePopup = function() {
	$("#popup").popover("destroy");	
	$("#carousel-panel-fotos").hide();
	Lprecision_iconFeature.setGeometry(new ol.geom.Point([0,0]));
};

var displayZoomClick = function(coord) {
    var duration = 1100;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: (appMap.view.getCenter()),
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 1.5 * appMap.view.getResolution(),
        start: start
    });
    appMap.map.beforeRender(pan, bounce);
    appMap.view.setCenter(coord);
    setTimeout(function() {
        appMap.view.setZoom(18);
    }, 1000);

};


var displayZoomClick_extend = function() {
    var coord = [-8248592.9, 517066.2];
    appMap.view.setCenter(coord);
    appMap.view.setZoom(9);
    panorama.setVisible(false);
    ClosePopup();
};

var popoup_feature = function(feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    var coord4326 = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
    appMap.popup.setPosition(coord);
    return coord;
};
var ejecutar_panel_rutas = function() {
    fechaIni = $('#datetimepicker_ruta_ini').data("DateTimePicker").getDate();
    fechaIni = new Date(fechaIni);
    fechaIni = moment(fechaIni).format('YYYY-MM-DDTHH:mm:ss[Z]');
    fechaFin = $('#datetimepicker_ruta_fin').data("DateTimePicker").getDate();
    fechaFin = new Date(fechaFin);
    fechaFin = moment(fechaFin).format('YYYY-MM-DDTHH:mm:ss[Z]');
    ruta_d3(map_ruta, appMap.id_ruta_activa, fechaIni, fechaFin);
};

var ejecutar_rutas_map = function(id_pa_asignacion_equipo) {
    $("#boton_panel_ruta").removeClass("btn-primary");
    $("#boton_panel_ruta").addClass("btn-success");
    $("#map").css("width", "50%");
    $("#panel_ruta").css("width", "50%");
    $("#DateRoute").css("display", "block");
    $(".StgetDateRoute").css("display", "block");
    $('#id_vista_calles').attr('disabled', 'disabled');
    fechaIni = $('#datetimepicker_ruta_ini').data("DateTimePicker").getDate();
    fechaIni_old = new Date(fechaIni);
    fechaIni = moment(fechaIni_old).format('YYYY-MM-DDTHH:mm:ss[Z]');
    fechaFin = $('#datetimepicker_ruta_fin').data("DateTimePicker").getDate();
    fechaFin_old = new Date(fechaFin);
    fechaFin = moment(fechaFin_old).format('YYYY-MM-DDTHH:mm:ss[Z]');
    $('#routediaanio').text(capitaliseFirstLetter(moment(fechaIni_old).format('dddd [,] MMMM Do YYYY')));
    $('#routehour').text(capitaliseFirstLetter(moment(fechaIni_old).format('h:mm a')));

    applyMargins();
    appMap.map.updateSize();
    map_ruta.invalidateSize();
    appMap.id_ruta_activa = id_pa_asignacion_equipo;
    ruta_d3(map_ruta, appMap.id_ruta_activa, fechaIni, fechaFin);
    if ($("#panel_admin_contenido").is(':visible')) {
        $("#panel_admin_contenido").toggle("scale", function() {
            $('#mostrar_layers').fadeIn();
            applyMargins();
        });
    }
};


var open_panel_rutas = function(id_pa_asignacion_equipo) {
    if (appMap.vistacalle == true) {
        appMap.rutas_activas = true;
        $('#id_vista_calles').trigger('click');
        ejecutar_rutas_map(id_pa_asignacion_equipo);
    } else {
        ejecutar_rutas_map(id_pa_asignacion_equipo);
    }
};

var close_panel_rutas = function() {
    $('#id_vista_calles').removeAttr('disabled');
    $("#boton_panel_ruta").removeClass("btn-success");
    $("#boton_panel_ruta").addClass("btn-primary");
    appMap.rutas_activas = false;
    $("#map").css("width", "100%");
    $("#panel_ruta").css("width", "0%");
    $(".StgetDateRoute").css("display", "none");
    $("#DateRoute").css("display", "none");
    applyMargins();
    appMap.map.updateSize();
    map_ruta.invalidateSize();
    if (!$("#panel_admin_contenido").is(':visible')) {
        $("#mostrar_layers").toggle('scale', function() {
            $('#panel_admin_contenido').toggle('slide');
            applyMargins();
        });
    }
    g.selectAll(".lineConnect").transition().remove();
    svg.remove();
};