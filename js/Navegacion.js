
function Navegacion(){


$.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_permisos.php?id_usuario_nuse=' + localStorage.id_usuario_nuse, function(data) {
    
    if(data[1].id_t_perfil_admin == '1'||data[1].id_t_perfil_admin == '2'||data[1].id_t_perfil_admin == '5'){
        $("#barranaveacion").append(
            '<a href="#" id="Monitoreo">'+
                '<i class="fa fa-globe fa-fw"></i> Centro de Control'+ 
            '</a>'
        );
        
        $("#Monitoreo").click(function(){
        	window.location.assign("index.html");	
        });
        
    }
    if(data[1].id_t_perfil_admin == '1'){
            $("#MenuAdminUser").prepend(
                            '<li id="Nuevo_usuario">'+
                                '<a href="#">'+
                                    '<div>'+
                                        '<i class="fa fa fa-gavel fa-fw"></i> Usuarios Nuevos'+
                                    '</div>'+
                                '</a>'+
                            '</li>'+
                            '<li id="Usuarios">'+
                                '<a href="#">'+
                                    '<div>'+
                                        '<i class="fa fa-wrench fa-fw"></i>  Administración de Usuarios'+
                                    '</div>'+
                                '</a>'+
                            '</li>'+
                             '<li id="presencia">'+
                                '<a href="#">'+
                                    '<div>'+
                                        '<i class="fa fa-thumbs-o-up fa-fw"></i>  Directorio'+
                                    '</div>'+
                                '</a>'+
                            '</li> ');
    }else if(data[1].id_t_perfil_admin == '3'){
        $("#MenuAdminUser").prepend(
                            '<li id="Nuevo_usuario">'+
                                '<a href="#">'+
                                    '<div>'+
                                        '<i class="fa fa fa-gavel fa-fw"></i> Usuarios Nuevos'+
                                    '</div>'+
                                '</a>'+
                            '</li>'+
                            '<li id="presencia">'+
                                '<a href="#">'+
                                    '<div>'+
                                        '<i class="fa fa-thumbs-o-up fa-fw"></i>  Directorio'+
                                    '</div>'+
                                '</a>'+
                            '</li> ');
    }else if(data[1].id_t_perfil_admin == '2'||data[1].id_t_perfil_admin == '5'){
        $("#MenuAdminUser").prepend(
                            '<li id="presencia">'+
                                '<a href="#">'+
                                    '<div>'+
                                        '<i class="fa fa-thumbs-o-up fa-fw"></i>  Directorio'+
                                    '</div>'+
                                '</a>'+
                            '</li>');
    }
    $("#presencia").click(function(){
        window.location.assign("Presencia.html");   
    });
   
    $("#Nuevo_usuario").click(function(){
        window.location.assign("Usuarios_Nuevos.html"); 
    });
    $("#Usuarios").click(function(){
        window.location.assign("Usuarios.html");    
    });
});
 $("#cerrar_session").click(function(){
        localStorage.clear(); 
        sessionStorage.clear();
    });
}

Navegacion();


var changePassClick=0;
$("#changePass").click(function() {
  BootstrapDialog.show({
        title: 'Cambio de Contraseña',
        message: $('<form role="form">'+
        '<div class="form-group">'+
          '<label for="id_text">Contraseña Anterior:</label>'+
          '<input type="password" class="form-control" id="old_pass" placeholder="Ingrese contraseña anterior...">'+
        '</div>'+
        '<div class="form-group">'+
          '<label for="newpass1">Nueva contraseña:</label>'+
          '<input type="password" class="form-control" id="newpass1" placeholder="Ingrese contraseña">'+
        '</div>'+
        '<div class="form-group">'+
          '<label for="newpass2">Repetir contraseña:</label>'+
          '<input type="password" class="form-control" id="newpass2" placeholder="Repetir contraseña">'+
        '</div>'+
      '</form>'),
        onhide: function(dialogRef){
            if(changePassClick==0){
                var old_pass = dialogRef.getModalBody().find('#old_pass').val();
                var newpass1 = dialogRef.getModalBody().find('#newpass1').val();
                var newpass2 = dialogRef.getModalBody().find('#newpass2').val();
                       
                 if(newpass1== ""||newpass2== "") {
                    msj_peligro("Ingrese la nueva contraseña!");
                    $("#newpass1").focus();
                    return false;
                }else if(newpass1!= newpass2) {
                    msj_peligro("Las contraseñas no son iguales!");
                    $("#newpass1").focus();
                    return false;
                }else{
                    msj_exito("Se cambio la contraseña exitosamente!");  
                    $.getJSON( glo.UrlSaga+"/SIG/servicios/m123/m123_set_cambiar_pass.php",{ id_usuario:localStorage.id_usr , newpass:newpass2  }, function( data ) {
                         return true;
                    });
                }
            }else{
                return true;
            }
        },
        buttons: [{
            label: 'Ejecutar',
            cssClass: 'btn-primary',
            icon: 'glyphicon glyphicon-check',  
            hotkey: 13,
            action: function(dialogRef) {
                var old_pass = dialogRef.getModalBody().find('#old_pass').val();
                changePassClick=0;
                if(old_pass==""){
                    msj_peligro("Ingrese la contraseña anterior!");
                    $("#old_pass").focus();
                    return false;                
                }else{
                    $.getJSON( glo.UrlSaga+"/SIG/servicios/m123/m123_get_pass.php",{ id_usuario:localStorage.id_usr , old_pass:old_pass  }, function( data ) {
                       console.log(data);
                        if(data[0].encontrado=='false'){  
                            msj_peligro("Las contraseña anterior no es valida!");
                            return false;                            
                        } else {
                            dialogRef.close();
                        }
                    });
                    
                }
                    
                
            }
        },{
            label: 'Cerrar',
            icon: 'glyphicon glyphicon-remove',
            cssClass: 'btn-default',
            action: function(dialogRef) {
                changePassClick=1;
                dialogRef.close();
            }
        }]
    });
 });
 
 $("#perfil").click(function() {
  BootstrapDialog.show({
        title: 'Perfil',
        message: '<ul class="chat">'+
                        '<li class="left clearfix"><span class="chat-img pull-left">'+
                            '<img src="../img/icons/'+asig_icono(localStorage.id_p_tipo_usuario)+ '" alt="User Avatar" class="img-circle" />'+
                        '</span>'+
                            '<div class="chat-body clearfix">'+
                                '<div class="header">'+
                                    '<strong class="primary-font">'+localStorage.nombre+'</strong> <small class="pull-right text-muted">'+
                                        asig_tipo(localStorage.id_p_tipo_usuario)+'</small>'+
                                '</div>'+
                                '<p><span class="glyphicon glyphicon-phone-alt"></span> '+
                                    localStorage.numero_telefono+  
                                    '<br>'+                               
                                '</p>'+
                            '</div>'+
                        '</li>'+
                     '</ul>',
        buttons: [{
            id: 'btn-ok',   
            icon: 'glyphicon glyphicon-check',       
            label: 'OK',
            cssClass: 'btn-primary', 
            autospin: false,
            action: function(dialogRef){    
                dialogRef.close();
            }
        }]
    });
 });
