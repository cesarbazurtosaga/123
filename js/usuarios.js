var socket = io.connect(glo.UrlSocket+'/webmap');
$(document).ready(function(){
	
	var oTable = $('#tabla_registro').dataTable( {
			"aLengthMenu": [[10, 15, 50, 100 , -1], [10, 15, 50, 100, "Todos"]],
			"iDisplayLength": 10,
			"iDisplayStart": 10,
			"order": [[ 6, "desc" ]],
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
			
			"bJQueryUI": true
	});
		      
	$("tfoot input").keyup( function () {
			
			oTable.fnFilter( this.value, $("tfoot input").index(this) );
	} );
	
	
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


$('#tabla_registro').removeClass( 'display' ).addClass('table table-striped table-bordered');
	var cont=0;
	$.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_usuarios.php?id_p_tipo_usuario='+localStorage.id_p_tipo_usuario )
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
					value.descripcion,
					value.numero_telefono,
					value.nombre_mun,
					value.estado_usuario,
					'<center><button id="llamar_'+value.id+'" onclick="llamar('+value.numero_telefono+')" type="button" class="btn btn-info btn-xs">'+
					  '<span class="glyphicon glyphicon-earphone"></span> Llamar'+
					'</button></center>',
						'<center><button onclick="editar(\''+value.id+'\',\''+value.id_usuario+'\',\''+value.cedula+'\',\''+value.nombre+
						'\',\''+value.apellido+'\',\''+value.direccion+'\',\''+value.correo+'\',\''+value.numero_telefono+'\',\''+value.id_tipo_usuario+
						'\',\''+value.codigo_mun+'\',\''+value.estado_usuario+'\',\''+value.contrasegna+'\',\''+value.id_t_perfil_admin+'\',\''+value.usuario+'\')" type="button" class="btn btn-success btn-sm">'+
						'<span class="glyphicon glyphicon-edit"></span>'+
					'</button>'
				],false);
				 
				}
			});
			$('#tabla_registro').dataTable().fnDraw();
			$('.selectpicker').selectpicker();
		});
	$("#Monitoreo").click(function(){
        window.location.assign("index.html");   
    });

});
var editar= function(id_pa_asignacion,id_usuario,cedula,nombre,apellido,direccion,correo,numero_telefono,id_tipo_usuario,codigo_mun,estado_usuario,contrasegna,id_t_perfil_admin,usuario){
    sessionStorage.id_pa_asignacion=id_pa_asignacion;
    sessionStorage.id_usuario=id_usuario;
    sessionStorage.cedula=cedula;
    sessionStorage.nombre=nombre;
    sessionStorage.apellido=apellido;
    sessionStorage.direccion=direccion;
    sessionStorage.correo=correo;
    sessionStorage.numero_telefono=numero_telefono;
    sessionStorage.id_tipo_usuario=id_tipo_usuario;
    sessionStorage.codigo_mun=codigo_mun;
    sessionStorage.estado_usuario=estado_usuario;
    sessionStorage.contrasegna=contrasegna;
    sessionStorage.id_t_perfil_admin=id_t_perfil_admin;
    sessionStorage.usuario=usuario;
    window.location.assign("Editar_usuario.html");
    
    
};
var llamar= function(numero){
    
    var data_call={"numero":numero,"numero_salida":localStorage.getItem("numero_telefono"),"imei":localStorage.getItem("imei")};
    socket.emit('llamada_general', data_call);    
   
    var msj="Se ha disparado la llamada Exitosamente!!";
    msj_exito(msj);
};




