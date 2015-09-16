function loadlayers(id_p_tipo_usuario) {
    if (id_p_tipo_usuario == 2) {

        $("#check-list-box").append(
            '<li class="list-group-item" id="lyr_bomberos" data-color="info">Bomberos' +
            '<div class="pull-right">' +
            '<img src="../img/icons/Bomberos.png" class="img_leyend">' +
            '</div>' +
            ' </li>' +
            '<li class="list-group-item" id="lyr_crue" data-color="info">CRUE' +
            '<div class="pull-right">' +
            '<img src="../img/icons/CRUE.png" class="img_leyend">' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item" id="lyr_ambulancias" data-color="info">Ambulancias' +
            '<div class="pull-right">' +
            '<img src="../img/icons/Ambulancias.png" height="25" >' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item" id="lyr_dcivil" data-color="info">Defensa Civil' +
            '<div class="pull-right">' +
            ' <img src="../img/icons/DefensaCivil.png" class="img_leyend">' +
            '</div>' +
            ' </li>' +
            '<li class="list-group-item" id="lyr_ejercito" data-color="info">Ejercito' +
            '<div class="pull-right">' +
            '   <img src="../img/icons/Ejercito.png" class="img_leyend">' +
            '</div>' +
            ' </li>' +
            '<li class="list-group-item" id="lyr_policia" data-color="info">Policia' +
            '<div class="pull-right">' +
            '<img src="../img/icons/Policia-NUSE.png" class="img_leyend">' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item" id="lyr_uaeprae" data-color="info">UAEPRAE' +
            '<div class="pull-right">' +
            '<img src="../img/icons/UAEPRAE.png" class="img_leyend">' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item" id="lyr_otros" data-color="info">Otros' +
            '<div class="pull-right">' +
            '<img src="../img/icons/Gobernacion.png" class="img_leyend">' +
            '</div>' +
            '</li>' 
        );

    } else {


        if (id_p_tipo_usuario == '3' || id_p_tipo_usuario == '4') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_policia" data-color="info">Policia' +
                '<div class="pull-right">' +
                '<img src="../img/icons/Policia-NUSE.png" class="img_leyend">' +
                '</div>' +
                '</li>');
        } else if (id_p_tipo_usuario == '5') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_dcivil" data-color="info">Defensa Civil' +
                '<div class="pull-right">' +
                ' <img src="../img/icons/DefensaCivil.png" class="img_leyend">' +
                '</div>' +
                ' </li>');
        } else if (id_p_tipo_usuario == '6') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_bomberos" data-color="info">Bomberos' +
                '<div class="pull-right">' +
                '<img src="../img/icons/Bomberos.png" class="img_leyend">' +
                '</div>' +
                ' </li>');
        } else if (id_p_tipo_usuario == '7') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_ejercito" data-color="info">Ejercito' +
                '<div class="pull-right">' +
                '   <img src="../img/icons/Ejercito.png" class="img_leyend">' +
                '</div>' +
                ' </li>');
        } else if (id_p_tipo_usuario == '9') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_uaeprae" data-color="info">UAEPRAE' +
                '<div class="pull-right">' +
                '<img src="../img/icons/UAEPRAE.png" class="img_leyend">' +
                '</div>' +
                '</li>');
        } else if (id_p_tipo_usuario == '8' || id_p_tipo_usuario == '10') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_otros" data-color="info">Otros' +
                '<div class="pull-right">' +
                '<img src="../img/icons/Gobernacion.png" class="img_leyend">' +
                '</div>' +
                '</li>');
        } else if (id_p_tipo_usuario == '11') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_crue" data-color="info">CRUE' +
                '<div class="pull-right">' +
                '<img src="../img/icons/CRUE.png" class="img_leyend">' +
                '</div>' +
                '</li>');
        }else if (id_p_tipo_usuario == '12') {
            $("#check-list-box").append(
                '<li class="list-group-item" id="lyr_ambulancias" data-color="info">Ambulancias' +
                '<div class="pull-right">' +
                '<img src="../img/icons/Ambulancias.png" height="25" >' +
                '</div>' +
                '</li>');
        }
    }

}

$.getJSON('../../SIG/servicios/m123/m123_get_permisos.php?id_usuario_nuse=' + localStorage.id_usuario_nuse, function(data) {
    
    
    if (data[1].id_t_perfil_admin == '1'||data[1].id_t_perfil_admin == '2'||data[1].id_t_perfil_admin == '5') {
        loadlayers(data[1].id_p_tipo_usuario);
    } else if (data[1].id_t_perfil_admin == '3') {
	    window.location.assign("../app/Usuarios_Nuevos.html");
    }
    /*
     * Evento de apagado y pendido de capas;
     */

    $('#lyr_policia').on('click', function(evt) {
        layer_on_off_id(3);
    });
    $('#lyr_bomberos').on('click', function(evt) {
        layer_on_off_id(6);
    });
    $('#lyr_dcivil').on('click', function(evt) {
        layer_on_off_id(5);
    });
    $('#lyr_crue').on('click', function(evt) {
        layer_on_off_id(11);
    });
    $('#lyr_ejercito').on('click', function(evt) {
        layer_on_off_id(7);
    });
    $('#lyr_uaeprae').on('click', function(evt) {
        layer_on_off_id(9);
    });
    $('#lyr_otros').on('click', function(evt) {
        layer_on_off_id(10);
    });
    $('#lyr_ambulancias').on('click', function(evt) {
        layer_on_off_id(12);
    });
    $('#base_osm_calles').on('click', function(evt) {
        if (appMap.base_osm_cl.getVisible() == false || Lyrwms.base_SAGA.getVisible() == true) {
            appMap.base_osm_cl.setVisible(true);
        }
        appMap.googlemaps = false;
        Lyrwms.base_SAGA.setVisible(false);
    });
    $('#base_SAGA').on('click', function(evt) {
        if (appMap.base_osm_cl.getVisible() == true) {
            appMap.base_osm_cl.setVisible(false);
        }
        appMap.googlemaps = false;
        Lyrwms.base_SAGA.setVisible(true);
    });

    $('#base_google_maps_roads').on('click', function(evt) {
        if (appMap.base_osm_cl.getVisible() == true || Lyrwms.base_SAGA.getVisible() == true) {
            appMap.base_osm_cl.setVisible(false);
            Lyrwms.base_SAGA.setVisible(false);
        }
        appMap.googlemaps = true;
        gmap.setOptions({
            'mapTypeId': google.maps.MapTypeId.ROADMAP
        });
        appMap.integracion_google();

    });
    $('#base_google_maps_satellite').on('click', function(evt) {
        if (appMap.base_osm_cl.getVisible() == true || Lyrwms.base_SAGA.getVisible() == true) {
            appMap.base_osm_cl.setVisible(false);
            Lyrwms.base_SAGA.setVisible(false);
        }
        appMap.googlemaps = true;
        gmap.setOptions({
            'mapTypeId': google.maps.MapTypeId.HYBRID
        });
        appMap.integracion_google();

    });
    list_leyend();
});