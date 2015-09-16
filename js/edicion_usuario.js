$(document).ready(function() {
    $("#idusuario").val(sessionStorage.id_usuario);
    $("#cedula").val(sessionStorage.cedula);
    $("#nombre").val(sessionStorage.nombre);
    $("#apellido").val(sessionStorage.apellido);
    $("#direccion").val(sessionStorage.direccion);
    $("#correo").val(sessionStorage.correo);
    $("#numero_telefono").val(sessionStorage.numero_telefono);
    $("#pass1").val(sessionStorage.contrasegna);
    $("#pass2").val(sessionStorage.contrasegna);
    $("#nom_usuario").val(sessionStorage.usuario);

    var cont = 0;
    var select = '';
    $.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_tipo_usuario.php')
        .done(function(data) {
            select = null;
            cont = 0;
            $.each(data, function(key, value) {
                if (cont == 0) {
                    cont++;
                } else {
                    if (value.id == sessionStorage.id_tipo_usuario) {
                        select += '<option value="' + value.id + '" selected>' + value.descripcion + '</option>';
                    } else {
                        select += '<option value="' + value.id + '">' + value.descripcion + '</option>';
                    }
                }
            });
            $("#select_tipo_usuario").append(select);
        });
    $.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_perfil_admin.php')
        .done(function(data) {
            select = null;
            cont = 0;
            $.each(data, function(key, value) {
                if (cont == 0) {
                    cont++;
                } else {
                    if (value.id == sessionStorage.id_t_perfil_admin) {
                        select += '<option value="' + value.id + '" selected>' + value.descripcion + '</option>';
                        if (sessionStorage.id_t_perfil_admin == "1" || sessionStorage.id_t_perfil_admin == "2" || sessionStorage.id_t_perfil_admin == "3"|| sessionStorage.id_t_perfil_admin == "5") {
                            $("#form_admin").show();
                        }
                    } else {
                        select += '<option value="' + value.id + '">' + value.descripcion + '</option>';
                    }
                }
            });
            $("#select_permisos_admin").append(select);
        });
    var cont_mun = 0;
    var select_mun = '';
    $.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_municipio.php')
        .done(function(data) {
            $.each(data, function(key, value) {
                if (cont_mun == 0) {
                    cont_mun++;
                } else {
                    if (value.codigo_mun == sessionStorage.codigo_mun) {
                        select_mun += '<option value="' + value.codigo_mun + '" selected>' + value.nombre_mun + '</option>';
                    } else {
                        select_mun += '<option value="' + value.codigo_mun + '">' + value.nombre_mun + '</option>';
                    }
                }
            });
            $("#select_municipio").append(select_mun);
        });
    $(".btn-group > .btn").click(function() {
        $(".btn-group > .btn").removeClass("active");
        $(this).addClass("active");
    });
    $("#form_admin").hide();
    $("#select_permisos_admin").change(function() {
        if ($(this).val() == "1" || $(this).val() == "2" || $(this).val() == "3"|| $(this).val() == "5" ) {
            $("#form_admin").show();
        } else {
            $("#form_admin").hide();
        }
    });
    if (sessionStorage.estado_usuario == 'N') {
        $(".btn-group > .btn").removeClass("active");
        $("#desactivar").addClass("active");
    } else {
        $(".btn-group > .btn").removeClass("active");
        $("#activar").addClass("active");
    }
    $('#activar').click(function() {
        sessionStorage.estado_usuario = 'S';
    });
    $('#desactivar').click(function() {
        sessionStorage.estado_usuario = 'N';
    });
    $('#btn_edicion_usuario').click(function() {
        if ($("#cedula").val() == "") {
            msj_peligro("Ingrese la cedula");
            $("#cedula").focus();
        } else if ($("#nombre").val() == "") {
            msj_peligro("Ingrese el nombre");
            $("#nombre").focus();
        } else if ($("#apellido").val() == "") {
            msj_peligro("Ingrese el apellido");
            $("#apellido").focus();
        } else if ($("#select_tipo_usuario").val() == 0) {
            msj_peligro("Selecione el tipo de usuario");
            $("#select_tipo_usuario").focus();
        } else if ($("#select_municipio").val() == 0) {
            msj_peligro("Selecione el municipio");
            $("#select_municipio").focus();
        } else if ($("#select_permisos_admin").val() == null) {
            msj_peligro("Selecione el pefil de administracion");
            $("#select_permisos_admin").focus();
        } else {
            // msj_peligro($("#select_permisos_admin").val());

            if ($("#select_permisos_admin").val() == "1" || $("#select_permisos_admin").val() == "2" || $("#select_permisos_admin").val() == "3"|| $("#select_permisos_admin").val() == "5") {
                if ($("#nom_usuario").val() == "") {
                    msj_peligro("Ingrese el nombre usuario");
                    $("#nom_usuario").focus();
                } else if ($("#pass1").val() == "") {
                    msj_peligro("Ingrese la contraseña");
                    $("#pass1").focus();
                } else if ($("#pass2").val() == "") {
                    msj_peligro("debe repetir la contraseña");
                    $("#pass2").focus();
                } else if ($("#pass1").val() != $("#pass2").val()) {
                    msj_peligro("Las dos debe ser iguales");
                    $("#pass1").focus();
                } else {
                    // msj_peligro("Funciono");                  
                    $.getJSON(glo.UrlSaga+'SIG/servicios/m123/m123_set_editar_usuario_web.php', {
                        idusuario: $("#idusuario").val(),
                        cedula: $("#cedula").val(),
                        nombre: $("#nombre").val(),
                        apellido: $("#apellido").val(),
                        direccion: $("#direccion").val(),
                        correo: $("#correo").val(),
                        numero_telefono: $("#numero_telefono").val(),
                        tipo_usuario: $("#select_tipo_usuario").val(),
                        municipio: $("#select_municipio").val(),
                        nom_usuario: $("#nom_usuario").val(),
                        select_permisos_admin: $("#select_permisos_admin").val(),
                        pass1: $("#pass1").val(),
                        activo: sessionStorage.estado_usuario
                    }).done(function(data) {
                        window.location.assign("Usuarios.html");
                    });
                }
            } else {
                msj_peligro("Funciono2");
                $.getJSON(glo.UrlSaga+'SIG/servicios/m123/m123_set_editar_usuario.php', {
                    idusuario: $("#idusuario").val(),
                    cedula: $("#cedula").val(),
                    nombre: $("#nombre").val(),
                    apellido: $("#apellido").val(),
                    direccion: $("#direccion").val(),
                    correo: $("#correo").val(),
                    numero_telefono: $("#numero_telefono").val(),
                    tipo_usuario: $("#select_tipo_usuario").val(),
                    municipio: $("#select_municipio").val(),
                    select_permisos_admin: $("#select_permisos_admin").val(),
                    activo: sessionStorage.estado_usuario
                }).done(function(data) {
                    window.location.assign("Usuarios.html");
                });
            }
        }
    });
})