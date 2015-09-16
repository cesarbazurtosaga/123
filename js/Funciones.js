   var applyMargins = function() {
       //alert("hola");
       var leftToggler = $(".mini-submenu-left");
       var rightToggler = $(".mini-submenu-right");
       if (leftToggler.is(":visible")) {
           $("#olmap .ol-zoom")
               .css("margin-left", 0)
               .removeClass("zoom-top-opened-sidebar")
               .addClass("zoom-top-collapsed");
       } else {
           $("#olmap .ol-zoom")
               .css("margin-left", $(".sidebar-left").width())
               .removeClass("zoom-top-opened-sidebar")
               .removeClass("zoom-top-collapsed");
       }
       if (rightToggler.is(":visible")) {
           $("#olmap .ol-rotate")
               .css("margin-right", 0)
               .removeClass("zoom-top-opened-sidebar")
               .addClass("zoom-top-collapsed");
       } else {
           $("#olmap .ol-rotate")
               .css("margin-right", $(".sidebar-right").width())
               .removeClass("zoom-top-opened-sidebar")
               .removeClass("zoom-top-collapsed");
       }
       google.maps.event.trigger(gmap, 'resize');
       var center = ol.proj.transform(appMap.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
       gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
   };

   var isConstrained = function() {
       return $("div.mid").width() == $(window).width();
   };

   var applyInitialUIState = function() {
       if (isConstrained()) {
           $(".sidebar-left .sidebar-body").fadeOut('slide');
           $(".sidebar-right .sidebar-body").fadeOut('slide');
           $('.mini-submenu-left').fadeIn();
           $('.mini-submenu-right').fadeIn();
       }
   };


   var calcular_dif = function(feature) {
       var time = moment(feature.get("fecha_recepcion"));
       var ms = moment().diff(moment(time, "DD/MM/YYYY HH:mm:ss"));
       var d = moment.duration(ms);
       var s = Math.floor(d.asHours());
       return s;
   };
   var calcular_dif_total = function(time) {
       var ms = moment().diff(moment(time, "DD/MM/YYYY HH:mm:ss"));
       var d = moment.duration(ms);
       var s = Math.floor(d.asMinutes());
       return s;
   };
   var asig_icono = function(d) {

       return d == 2 ? 'Gobernacion.png' :
           d == 3 ? 'Policia-NUSE.png' :
           d == 4 ? 'Policia-NUSE.png' :
           d == 5 ? 'DefensaCivil.png' :
           d == 6 ? 'Bomberos.png' :
           d == 7 ? 'Ejercito.png' :
           d == 8 ? 'Gobernacion.png' :
           d == 9 ? 'UAEPRAE.png' :
           d == 10 ? 'Gobernacion.png' :
           d == 11 ? 'CRUE.png' :
           d == 12 ? 'Ambulancias.png' :
           'Gobernacion.png';
   };
   var asig_tipo = function(d) {

       return d == 2 ? 'Gobernacion' :
           d == 3 ? 'Policia' :
           d == 4 ? 'Policia' :
           d == 5 ? 'Defensa Civil' :
           d == 6 ? 'Bomberos' :
           d == 7 ? 'Ejercito' :
           d == 8 ? 'Gobernacion' :
           d == 9 ? 'UAEPRAE' :
           d == 10 ? 'Gobernacion' :
           d == 11 ? 'CRUE' :
           d == 12 ? 'Ambulancias' :
           'Gobernacion';
   };
   var asig_icono_llamada = function(e,m) {
   	   var img;
       return e=='PD' ? img='../img/icons/SECAD_PD.png' :
           e=='ED' ? img='../img/icons/SECAD_ED.png':
           e=='SE' ? img='../img/icons/SECAD_SE.png':
           e=='CR'?  img='../img/icons/SECAD_CR.png':
           		img='../img/icons/SECAD_CR.png';
           
   };
   var layer_on_off_id = function(d) {

       switch (d) {
           case 3:
               if (layer_Ubicacion.getVisible() == false) {
                   layer_Ubicacion.setVisible(true)
               } else {
                   layer_Ubicacion.setVisible(false)
               }
               break;
           case 4:
               if (layer_Ubicacion.getVisible() == false) {
                   layer_Ubicacion.setVisible(true)
               } else {
                   layer_Ubicacion.setVisible(false)
               }
               break;
           case 5:
               if (layer_Ubicacion_dcivil.getVisible() == false) {
                   layer_Ubicacion_dcivil.setVisible(true);
               } else {
                   layer_Ubicacion_dcivil.setVisible(false);
               }
               break;
           case 6:
               if (layer_Ubicacion_bomberos.getVisible() == false) {
                   layer_Ubicacion_bomberos.setVisible(true);
               } else {
                   layer_Ubicacion_bomberos.setVisible(false);
               }
               break;
           case 7:
               if (layer_Ubicacion_Ejercito.getVisible() == false) {
                   layer_Ubicacion_Ejercito.setVisible(true);
               } else {
                   layer_Ubicacion_Ejercito.setVisible(false);
               }
               break;
           case 9:
               if (layer_Ubicacion_UAEPRAE.getVisible() == false) {
                   layer_Ubicacion_UAEPRAE.setVisible(true);
               } else {
                   layer_Ubicacion_UAEPRAE.setVisible(false);
               }
               break;
           case 11:
               if (layer_Ubicacion_CRUE.getVisible() == false) {
                   layer_Ubicacion_CRUE.setVisible(true);
               } else {
                   layer_Ubicacion_CRUE.setVisible(false);
               }
               break;
           case 12:
               if (layer_Ubicacion_AMBU.getVisible() == false) {
                   layer_Ubicacion_AMBU.setVisible(true);
               } else {
                   layer_Ubicacion_AMBU.setVisible(false);
               }
               break;
           default:

               if (layer_Ubicacion_otros.getVisible() == false) {
                   layer_Ubicacion_otros.setVisible(true);
               } else {
                   layer_Ubicacion_otros.setVisible(false);
               }
       }
   };

   var layer_on_id = function(d) {

       switch (d) {
           case '3':
               if (layer_Ubicacion.getVisible() == false) {
                   $("#lyr_policia").trigger("click");
               }
               break;
           case '4':
               if (layer_Ubicacion.getVisible() == false) {
                   $("#lyr_policia").trigger("click");
               }
               break;
           case '5':

               if (layer_Ubicacion_dcivil.getVisible() == false) {

                   $("#lyr_dcivil").trigger("click");
               }
               break;
           case '6':
               if (layer_Ubicacion_bomberos.getVisible() == false) {
                   $("#lyr_bomberos").trigger("click");
               }
               break;
           case '7':
               if (layer_Ubicacion_Ejercito.getVisible() == false) {
                   $("#lyr_ejercito").trigger("click");
               }
               break;
           case '9':
               if (layer_Ubicacion_UAEPRAE.getVisible() == false) {
                   $("#lyr_uaeprae").trigger("click");
               }
               break;
           case '11':
               if (layer_Ubicacion_CRUE.getVisible() == false) {
                   $("#lyr_crue").trigger("click");
               }
               break;
           case '12':
               if (layer_Ubicacion_AMBU.getVisible() == false) {
                   $("#lyr_ambulancias").trigger("click");
               }
               break;
           default:
               if (layer_Ubicacion_otros.getVisible() == false) {
                   $("#lyr_otros").trigger("click");
               }
       }
   };

   function degToRad(deg) {
       return deg * Math.PI * 2 / 360;
   }

   function capitaliseFirstLetter(string) {
       return string.charAt(0).toUpperCase() + string.slice(1);
   }