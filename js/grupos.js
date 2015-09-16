	var socket = io.connect(glo.UrlSocket+'/webmap');
$(document).ready(function(){
	
	var oTable = $('#tabla_registro').dataTable( {
			"aLengthMenu": [[5, 10, 50, 100 , -1], [5, 10, 50, 100, "Todos"]],
			"iDisplayLength": 5,
			"iDisplayStart": 5,
			"oLanguage": {
					"sProcessing":     "Procesando...",
					"sLengthMenu":     "Mostrar _MENU_ registros",
					"sZeroRecords":    "No se encontraron resultados",
					"sEmptyTable":     "Ningún dato disponible en esta tabla",
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
						"sLast":     "Último",
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
	$.getJSON('../../SIG/servicios/m123/m123_get_grupos.php' )
	.done(function( data ) {
		var text="";
		cont=0;
		$.each( data, function( key, value ) {
			if(cont==0){
				cont++;
			}else{
				$('#tabla_registro').dataTable().fnAddData( [
					value.grupo,
					value.activo,
					
						'<center><button onclick="editar('+value.id+','+value.id_usuario+')" type="button" class="btn btn-success btn-sm">'+
						'<span class="glyphicon glyphicon-edit"></span>'+
					'</button>'
				])
				  $('.selectpicker').selectpicker();
				}
			})
		});
	
var editar= function(id_pa_asignacion,id_usuario){
	//alert("Activacion Usuario");
	sessionStorage.id_pa_asignacion=id_pa_asignacion;
	sessionStorage.id_usuario=id_usuario;
	
	window.location.assign("Editar_usuario.html");
	/*$.get('../../SIG/servicios/m123/m123_set_activacion.php',{
	    tipo_usuario: $("#select_"+id_pa_asignacion).val(),
	    id_usuario: id_usuario,
	    id_pa_asignacion: id_pa_asignacion
	},function(data) {
		msj_exito("Se Activo el usuario");
		location.reload();
	});*/
	
};
var llamar= function(numero){
    
    var data_call={"numero":numero};
    socket.emit('llamada_activacion', data_call);    
   
    var msj="Se ha disparado la llamada Exitosamente!!";
    msj_exito(msj);
};

$("#Monitoreo").click(function(){
	window.location.assign("index.html");	
});


