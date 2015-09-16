var proj4node = require('proj4node');
epgs3857 = proj4node('+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
var oracledb = require('oracledb');
oracledb.maxRows = 10000;
var moment = require('moment');
var turf = require('turf');
var fc='0',features=[],contFeature=0,cantFeature=0;
var DatelastGeo='0',DatelastEstado='0';
var pg = require('pg');
var conStringSAGA = "postgres://postgres:p0s76r3s@172.20.5.200/sig_plus";
var clientSAGA;


var io = require('socket.io').listen(3321);


nspmmp = io.of('/mobilemap');
nspmmp.on('connection', function(socket){
    
    setInterval(function(){
      socket.emit('validad_conexion', { conexion: 'OK' });    
    }, 30000);
    
  	socket.emit('news', { hello: 'Se conecto la aplicacion Movil' });
  	socket.on('disconnect', function () { 
  		console.log("se desconecto la aplicacion movil")
  	});
});
nspact = io.of('/activacion');
nspact.on('connection', function(socket){
  console.log("se conecto la aplicacion movil");
    socket.emit('news', { hello: 'Se conecto la aplicacion Movil' });
    socket.on('disconnect', function () { 
        console.log("se desconecto la aplicacion movil")
    });
});

nspwmp = io.of('/webmap');
nspwmp.on('connection', function(socket){
  	console.log("se conecto la aplicacion web");
  	socket.emit('news', { hello: 'Se conecto la aplicacion Web' });
  	socket.on('llamada', function (numero) {
	    //console.log(numero);
	    nspmmp.emit('llamada',numero);
  	});
  	socket.on('llamada_general', function (numero) {
         nspmmp.emit('llamada_general',numero);
    });
  	socket.on('llamada_activacion', function (numero) {
        nspact.emit('llamada',numero);
    });
    socket.on('get_refrescar_caso', function (numero) {
        nspwmp.emit('set_refrescar_caso',"refrescar_casos");
    });
  	socket.on('disconnect', function () { 
  		console.log("se desconecto la aplicacion web");
  	});
});



nspsms = io.of('/serversms');
nspsms.on('connection', function(socket){
    console.log("se conecto el servidor sms");
    socket.emit('news', { hello: 'Se conecto el servidor sms' });
    ///nspsms.emit('setsms', { clave: 'Nan7',telefono:'3004122332',id:'29' });
    socket.on('disconnect', function () { 
        console.log("se desconecto el servidor sms");
    });
});
nspmr = io.of('/mobileregistro');
nspmr.on('connection', function(socket){
    console.log("se conecto la aplicacion movil cliente");
    socket.emit('news', { hello: 'Se conecto la aplicacion Movil Cliente' });
    socket.on('getsms', function (datasms) { 
        console.log(datasms);
        nspsms.emit('setsms', datasms);
    });
    socket.on('disconnect', function () { 
        console.log("se desconecto el cliente de registro");
        
        
    });
});


nsMapComp = io.of('/MapComparative');
nsMapComp.on('connection', function(socket){
    socket.emit('news', { hello: 'Se conecto la aplicacion al servicio de mapas comparativos' });
    socket.on('disconnect', function () { 
        console.log("se desconecto el cliente de registro");
    });
    socket.on('SetChangueMap', function (view) { 
        console.log(view);
        nsMapComp.emit('GetChangueMap', view);
    });
});

nspwmpCaso = io.of('/webmapCaso');
nspwmpCaso.on('connection', function(socket){
	console.log("se conecto la de operador secad");
	if(fc!='0'){
		nspwmpCaso.emit('GejsonCall',fc);	
	}	 
    socket.emit('connect', { connect: 'Se conecto operador secad' });
    socket.on('disconnect', function () { 
        console.log("se desconecto operador secad");        
    });
});

oracledb.getConnection(
  {
  	user          : "APP_CADALMDECUN",
    password      : "CADALMDECUN",
    connectString : "172.22.161.8:1521/SECAD123"
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    //console.log('Se conecto a SECAD');
    setInterval(function(){
    	NewGeo(connection);
    }, 1500);
    
 });
 
 function NewGeo(connection){
 	connection.execute(
	 	"SELECT TO_CHAR(max(FECHA_GRABACION),'DD-MM-YYYY HH24:MI:SS') FECHA_GRABACION,TO_CHAR(max(FECHA_MODIFICACION),'DD-MM-YYYY HH24:MI:SS') FECHA_MODIFICACION  "+
		" FROM  USR_CAD.CADPEDIDOS_COORDXY",function(err, result){
    	if (err) {
      		console.error(err.message);
      		return;
		}
		
		var DatenewGeo=moment(result.rows[0][0],'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss');
		var DateEstado=moment(result.rows[0][1],'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss');
		
		//emitGeo(connection);
		//console.log(DatelastGeo);
		if(DatelastGeo!='0'){
			//console.log(DatelastGeo+'Geo');
			//console.log(DatelastEstado+'Estado');
			if(DatelastGeo!=DatenewGeo||DatelastEstado!=DateEstado){
				DatelastGeo=DatenewGeo;
				DatelastEstado=DateEstado;
				
				emitGeo(connection);	
			}
		}else{
			DatelastGeo=DatenewGeo;
			DatelastEstado=DateEstado;
			
			emitGeo(connection);	
		//	console.log(DatelastGeo);
		}
	});			
 }
 function emitGeo(connection){ 
 	//var FechaIni=moment().subtract(1, 'day').format('DD-MM-YYYY HH:mm');
 	var FechaIni=moment().subtract(15, 'minutes').format('DD-MM-YYYY HH:mm');
 	
 	console.log(FechaIni+'server')	
 	var sql=
 	" select t.* from ( "+
 	" SELECT CADPEDI_NUMELLAMADA ID,X_COORD LON,Y_COORD LAT,ESTADO ES,RADIO RAD,CADUSUA_USUARIO USU,OPERADOR OPE,NUME_TELEFONO NUM, TO_CHAR(FECHA_GRABACION,'DD-MM-YYYY HH24:MI:SS') FE, TO_CHAR(TIME_,'DD-MM-YYYY HH24:MI:SS') TI,TIME_  FROM USR_CAD.CADPEDIDOS_COORDXY "+  
 	" WHERE ESTADO<>'CR'"+
    " union all "+
 	" SELECT CADPEDI_NUMELLAMADA ID,X_COORD LON,Y_COORD LAT,ESTADO ES,RADIO RAD,CADUSUA_USUARIO USU,OPERADOR OPE,NUME_TELEFONO NUM, TO_CHAR(FECHA_GRABACION,'DD-MM-YYYY HH24:MI:SS') FE, TO_CHAR(TIME_,'DD-MM-YYYY HH24:MI:SS') TI,TIME_  FROM USR_CAD.CADPEDIDOS_COORDXY "+  
 	" WHERE TIME_>TO_DATE('"+FechaIni+"','DD-MM-YYYY HH24:MI') "+
	" and ESTADO='CR' "+
 	" ) t order by TIME_ DESC";
 	console.log('Peticion');
 	connection.execute(sql,function(err, dataXY){
		var rows = dataXY.rows;
		features=[];
		contFeature=0;
		cantFeature=rows.length;
		clientSAGA = new pg.Client(conStringSAGA);
		clientSAGA.connect(function(err) {
		  if(err) {
		    return console.error('could not connect to postgres', err);
		  }
		  //console.log("Se conecto a SAGA")
		});	
		
		for (var i = 0; i < rows.length; i++){
			GeoInverso(rows[i]);
		}
    });
}

function GeoInverso(rows){
	
	clientSAGA.query('select geocode_reverse_ver('+rows[1]+','+rows[2]+')', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    //console.log('ingreso pg');
	    //console.log(result.rows[0]);
	    var res=[];
	    if(result.rows[0]!==undefined){
	    	//console.log('valida');
	    	res = result.rows[0].geocode_reverse_ver.replace("(", "");
	    	res = res.replace(")", "");
	    	res = res.replace(/"/g, '');
	    	res = res.split(",");
	    }else{
	    	//console.log(' No valida');
	    	res.push('-');
	    	res.push('Fuera Cundinamacar');	
	    }
	    
	    
	    var p = epgs3857.transform(proj4node.WGS84, {x:rows[1], y:rows[2]});
	    features.push(turf.point([p.x, p.y], {
    		ID: rows[0],	ES: rows[3],
    		RAD: rows[4],USU: rows[5],
    		OPE: rows[6],NUM: rows[7],
    		FE: moment(rows[8],'DD-MM-YYYY HH:mm:ss').subtract(4, 'minutes').format('DD-MM-YYYY HH:mm:ss'),
    		TI: moment(rows[9],'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'),
    		MUN:res[1],
    		VER:res[0]
    	}));
    	contFeature++;    	
    	if(contFeature==cantFeature){
    		
    		fc= turf.featurecollection(features);
    		//console.log(fc);
        	nspwmpCaso.emit('GejsonCall',fc);
        	clientSAGA.end();
    	}
    	
	});	
}



