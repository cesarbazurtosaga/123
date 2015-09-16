if(!localStorage.id_usr){
        window.location.assign("/SIG/login/index_nuse.html");
    }else if(!localStorage.numero_telefono){
        window.location.assign(glo.UrlSaga+"/SIG/login/index_nuse.html");
    }else{
        navigator.geolocation.getCurrentPosition(showPosition);
        $.post( glo.UrlSaga+"/SIG/servicios/Administracion/f.php", { id_usuario: localStorage.id_usr, verticales: localStorage.verticales,latitud: '0',logitud:'0',pathname: window.location.pathname,evento:'ingreso'})
          .done(function( data ) {
          });
        function showPosition(position) {
           $.post(glo.UrlSaga+"/SIG/servicios/Administracion/f.php", { id_usuario: localStorage.id_usr, verticales: localStorage.verticales,latitud: position.coords.latitude,logitud:position.coords.longitude,pathname: window.location.pathname,evento:'coordenada'})
          .done(function( data ) {
          });  
        }
}

setInterval(function(){
    if(!localStorage.id_usr){
        window.location.assign("../login/index_nuse.html");
    }else if(!localStorage.numero_telefono){
        window.location.assign("../login/index_nuse.html");
    }else{
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}, 1000*10);