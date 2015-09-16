var socket_act = io.connect(glo.UrlSocket+'/serversms');  
var socket = io.connect(glo.UrlSocket+'/webmap');
$(document).ready(function(){
    
    var oTable = $('#tabla_registro').dataTable( {
            "aLengthMenu": [[ 10, 50, 100 , -1], [10, 50, 100, "Todos"]],
            "iDisplayLength":10,
            "iDisplayStart": 10,
            "oLanguage": {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "NingÃºn dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Ãšltimo",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
            },
            //"aoColumnDefs": { "sType": "num-fmt", "aTargets": [7]  },
            "bJQueryUI": true
    });
              
    $("tfoot input").keyup( function () {
            /* Filter on the column (the index) of this element */
            oTable.fnFilter( this.value, $("tfoot input").index(this) );
    } );
    
    
    
    /*
     * Support functions to provide a little bit of 'user friendlyness' to the textboxes in 
     * the footer
     */
    $("tfoot input").each( function (i) {
        asInitVals[i] = this.value;
    } );
    
    $("tfoot input").focus( function () {
        if ( this.className == "search_init" )
        {
            this.className = "";
            this.value = "";
        }
    } );
    
    $("tfoot input").blur( function (i) {
        if ( this.value == "" ){
            this.className = "search_init";
            this.value = asInitVals[$("tfoot input").index(this)];
        }
    } );
});

$('#tabla_registro').removeClass( 'display' ).addClass('table table-striped table-bordered');
    
    var cont=0;
    
$.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_tipo_usuario.php' )
.done(function( data ) {
    var select='';
    $.each( data, function( key, value ) {
        if(cont==0){
            cont++;
        }else{
            select+='<option value="'+value.id+'">'+value.descripcion+'</option>';
        }   
    });
    
    cont=0;
    $.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_activaciones.php' )
    .done(function( data ) {
        var text="";
        cont=0;
        $.each( data, function( key, value ) {
            if(cont==0){
                cont++;
            }else{
                $('#tabla_registro').dataTable().fnAddData( [
                    value.fecha_entrega,
                    value.cedula,
                    value.nombre,
                    value.apellido,
                    value.direccion,
                    value.correo,
                    value.numero_telefono,
                    '<center><button id="llamar_'+value.id+'" onclick="llamar('+value.numero_telefono+')" type="button" class="btn btn-info btn-xs">'+
                      '<span class="glyphicon glyphicon-earphone"></span> Llamar'+
                    '</button></center>',
                    '<select id="select_'+value.id+'"  class="selectpicker" data-width="150px">'+
                        select+
                    '</select>',
                    '<center><button onclick="activar('+value.id+','+value.id_usuario+')" type="button" class="btn btn-success btn-sm">'+
                        '<span class="glyphicon glyphicon-thumbs-up"></span></center>',
                    '<center></button><button onclick="desactivar('+value.id+','+value.id_usuario+')" type="button" class="btn btn-danger btn-sm">'+
                        '<span class="glyphicon glyphicon-thumbs-down"></span>'+
                    '</button></center>'
                ])
                  $('.selectpicker').selectpicker();
                }
            })
        });
    });
var activar= function(id_pa_asignacion,id_usuario){
    //alert("Activacion Usuario");
    
    $.get(glo.UrlSaga+'/SIG/servicios/m123/m123_set_activacion.php',{
        tipo_usuario: $("#select_"+id_pa_asignacion).val(),
        id_usuario: id_usuario,
        id_pa_asignacion: id_pa_asignacion
    },function(data) {
        msj_exito("Se Activo el usuario");
        location.reload();
    });
    
};
var desactivar= function(id_pa_asignacion,id_usuario){
    //alert("Desactivacion de Usuario");
    
    $.get(glo.UrlSaga+'/SIG/servicios/m123/m123_set_desactivacion.php',{
        tipo_usuario: $("#select_"+id_pa_asignacion).val(),
        id_usuario: id_usuario,
        id_pa_asignacion: id_pa_asignacion
    },function(data) {
        msj_peligro("Se Desactivo el usuario");
        location.reload();
    });
    
};
var llamar= function(numero){
    
    var data_call={"numero":numero,"numero_salida":localStorage.getItem("numero_telefono"),"imei":localStorage.getItem("imei")};
    socket.emit('llamada_general', data_call);  
    
    
    var msj="Se ha disparado la llamada Exitosamente!!";
    msj_exito(msj);
};

$("#refrescar").click(function(){
    location.reload();  
});
socket_act.on('setsms', function (datasms) {
    console.log(datasms);
    //$("#notificacion").text(parseFloat($("#notificacion").text())+1);
    $("#refrescar").attr('class', 'btn btn-danger btn-md pull-right');
    
});


