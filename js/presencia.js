var socket = io.connect(glo.UrlSocket+'/webmap');
$(document).ready(function(){
	
	var oTable = $('#tabla_registro').dataTable( {
			"aLengthMenu": [[10, 15, 50, 100 , -1], [10, 15, 50, 100, "Todos"]],
			"iDisplayLength": 10,
			"iDisplayStart": 10,
			"order": [[ 5, "desc" ]],
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
	$.getJSON(glo.UrlSaga+'/SIG/servicios/m123/m123_get_presencia.php' )
	.done(function( data ) {
		var text="";
		cont=0;
		  $.each( data, function( key, value ) {
			if(cont==0){
				cont++;
			}else{
				$('#tabla_registro').dataTable().fnAddData( [
				    //value.cedula,
					value.nombre,
					value.direccion,
					value.nombre_mun,
					value.descripcion,
					value.fecha_ubicacion,
					/*value.fecha_presencia,
					value.estado_gps,
					value.estado_app,*/
					value.numero_telefono,
					'<center><button id="llamar_'+value.id+'" onclick="llamar('+value.numero_telefono+')" type="button" class="btn btn-info btn-xs">'+
					  '<span class="glyphicon glyphicon-earphone"></span> Llamar'+
					'</button></center>'
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

var llamar= function(numero){
    
    var data_call={"numero":numero,"numero_salida":localStorage.getItem("numero_telefono"),"imei":localStorage.getItem("imei")};
    socket.emit('llamada_general', data_call);    
   
    var msj="Se ha disparado la llamada Exitosamente!!";
    msj_exito(msj);
};




