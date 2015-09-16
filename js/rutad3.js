 function getJson(data) {

     var LayerRoute;
     console.log("Ruta");
     console.log(data);
     if (data.features.length > 1) {
         LayerRoute = L.geoJson(data);//.addTo(map_ruta);
         map_ruta.fitBounds(LayerRoute.getBounds());
         map_ruta.setZoom(map_ruta.getZoom() - 1);
         MapearRutaD3(data);
     } else {
         if (data.features.length == 1) {
             msj_info("Solo hay una posición en el rango selecionado, No se puede generar ruta");
         } else {
             msj_peligro("No hay datos de Ruta para el dia seleccionado");
         }
     }
 }

 var ruta_d3 = function(map_ruta, id_pa_asignacion_equipo, fechaIni, fechaFin) {


     map_ruta.eachLayer(function(layer) {
         map_ruta.removeLayer(layer);
     });

     g.selectAll(".lineConnect").transition().remove();
     svg.remove();

     // cbasurto.2c5cff03
     var mapboxTiles =  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
		type: 'map',
		ext: 'jpg',
		attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: '1234'
	});
     map_ruta.addLayer(mapboxTiles);

     var cont = 0;
     var url = glo.UrlGeoserver+'modulo123/ows?service=WFS&' +
         'version=1.0.0&request=GetFeature&typeName=modulo123:t_historico_ubicacion&' +
         'CQL_FILTER= id_pa_asignacion_equipo =' + id_pa_asignacion_equipo + ' and fecha_captura> ' + fechaIni + ' and fecha_captura< ' + fechaFin + '&' +
         'outputFormat=text/javascript&format_options=callback:getJson&sortBy=fecha_captura,fecha_recepcion' +
         '&srsname=EPSG:4326';

     $.ajax({
         url: url,
         dataType: 'jsonp'
     });

 };


 var MapearRutaD3 = function(collection) {

     var featuresdata = collection.features;
     if (collection.features.length > 1) {
         var cont = 1;
         svg = d3.select(map_ruta.getPanes().overlayPane).append("svg");
         g = svg.append("g").attr("class", "leaflet-zoom-hide");
         console.log(featuresdata.length);
         //stream transform. transforms geometry before passing it to
         // listener. Can be used in conjunction with d3.geo.path
         // to implement the transform. 

         var transform = d3.geo.transform({
             point: projectPoint
         });

         //d3.geo.path translates GeoJSON to SVG path codes.
         //essentially a path generator. In this case it's
         // a path generator referencing our custom "projection"
         // which is the Leaflet method latLngToLayerPoint inside
         // our function called projectPoint
         var d3path = d3.geo.path().projection(transform);


         // Here we're creating a FUNCTION to generate a line
         // from input points. Since input points will be in 
         // Lat/Long they need to be converted to map_ruta units
         // with applyLatLngToLayer
         var toLine = d3.svg.line()
             .interpolate("linear")
             .x(function(d) {
                 return applyLatLngToLayer(d).x
             })
             .y(function(d) {
                 return applyLatLngToLayer(d).y
             });


         // From now on we are essentially appending our features to the
         // group element. We're adding a class with the line name
         // and we're making them invisible

         // these are the points that make up the path
         // they are unnecessary so I've make them
         // transparent for now
         var ptFeatures = g.selectAll("circle")
             .data(featuresdata)
             .enter()
             .append("circle")
             .attr("r", 3)
             .attr("class", "waypoints");

         // Here we will make the points into a single
         // line/path. Note that we surround the featuresdata
         // with [] to tell d3 to treat all the points as a
         // single line. For now these are basically points
         // but below we set the "d" attribute using the 
         // line creator function from above.
         var linePath = g.selectAll(".lineConnect")
             .data([featuresdata])
             .enter()
             .append("path")
             .attr("class", "lineConnect");

         // This will be our traveling circle it will
         // travel along our path
         var marker = g.append("circle")
             .attr("r", 7)
             .attr("id", "marker")
             .attr("class", "travelMarker");


         // For simplicity I hard-coded this! I'm taking
         // the first and the last object (the origin)
         // and destination and adding them separately to
         // better style them. There is probably a better
         // way to do this!
         //console.log(featuresdata);
         var originANDdestination = [featuresdata[collection.features.length - 1]];
         //console.log(originANDdestination);

         var final = g.selectAll(".final")
             .data(originANDdestination)
             .enter()
             .append("circle", ".final")
             .attr("r", 8)
             .style("fill", "red")
             .style("opacity", "1");


         originANDdestination = [featuresdata[0]];

         var inicial = g.selectAll(".inicial")
             .data(originANDdestination)
             .enter()
             .append("circle", ".inicial")
             .attr("r", 8)
             .style("fill", "green")
             .style("opacity", "1");



         originANDdestination = [featuresdata[0], featuresdata[collection.features.length - 1]];
         // I want names for my coffee and beer
         var text = g.selectAll("text")
             .data(originANDdestination)
             .enter()
             .append("text")
             .text(function(d) {
                 var date_moment = moment(d.properties.fecha_captura, moment.ISO_8601).format("HH:mm");
                 return date_moment;

             })
             .attr("class", "locnames")
             .attr("y", function(d) {
                 return -10
             });


         // when the user zooms in or out you need to reset
         // the view
         map_ruta.on("viewreset", reset);

         var segments = [0];
         for (var i = 1; i < featuresdata.length; i++) {
             var tmp = svg.append("path")
                 .datum([featuresdata[i - 1], featuresdata[i]])
                 .attr("d", toLine);
             segments.push(segments[i - 1] + tmp.node().getTotalLength());
             tmp.remove();
         }
         console.log(segments[featuresdata.length - 1]);
         // this puts stuff on the map! 
         reset();
         transition();

         // Reposition the SVG to cover the features.
         function reset() {
             var bounds = d3path.bounds(collection),
                 topLeft = bounds[0],
                 bottomRight = bounds[1];


             // here you're setting some styles, width, heigh etc
             // to the SVG. Note that we're adding a little height and
             // width because otherwise the bounding box would perfectly
             // cover our features BUT... since you might be using a big
             // circle to represent a 1 dimensional point, the circle
             // might get cut off.

             text.attr("transform",
                 function(d) {
                     return "translate(" +
                         applyLatLngToLayer(d).x + "," +
                         applyLatLngToLayer(d).y + ")";
                 });


             // for the points we need to convert from latlong
             // to map units

             inicial.attr("transform",
                 function(d) {
                     return "translate(" +
                         applyLatLngToLayer(d).x + "," +
                         applyLatLngToLayer(d).y + ")";
                 });
             final.attr("transform",
                 function(d) {
                     return "translate(" +
                         applyLatLngToLayer(d).x + "," +
                         applyLatLngToLayer(d).y + ")";
                 });

             ptFeatures.attr("transform",
                 function(d) {
                     return "translate(" +
                         applyLatLngToLayer(d).x + "," +
                         applyLatLngToLayer(d).y + ")";
                 });

             // again, not best practice, but I'm harding coding
             // the starting point

             marker.attr("transform",
                 function() {
                     var y = featuresdata[0].geometry.coordinates[1]
                     var x = featuresdata[0].geometry.coordinates[0]
                     return "translate(" +
                         map_ruta.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
                         map_ruta.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
                 });

             segments = [0];
             for (var i = 1; i < featuresdata.length; i++) {
                 var tmp = svg.append("path")
                     .datum([featuresdata[i - 1], featuresdata[i]])
                     .attr("d", toLine);
                 segments.push(segments[i - 1] + tmp.node().getTotalLength());
                 tmp.remove();
             }
             console.log(segments[featuresdata.length - 1]);
             // Setting the size and location of the overall SVG container
             svg.attr("width", bottomRight[0] - topLeft[0] + 120)
                 .attr("height", bottomRight[1] - topLeft[1] + 120)
                 .style("left", topLeft[0] - 50 + "px")
                 .style("top", topLeft[1] - 50 + "px");


             // linePath.attr("d", d3path);
             linePath.attr("d", toLine);
             // ptPath.attr("d", d3path);
             g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

         } // end reset

         // the transition function could have been done above using
         // chaining but it's cleaner to have a separate function.
         // the transition. Dash array expects "500, 30" where 
         // 500 is the length of the "dash" 30 is the length of the
         // gap. So if you had a line that is 500 long and you used
         // "500, 0" you would have a solid line. If you had "500,500"
         // you would have a 500px line followed by a 500px gap. This
         // can be manipulated by starting with a complete gap "0,500"
         // then a small line "1,500" then bigger line "2,500" and so 
         // on. The values themselves ("0,500", "1,500" etc) are being
         // fed to the attrTween operator
         function transition() {
             linePath.transition()
                 .duration(featuresdata.length * 600)
                 .attrTween("stroke-dasharray", tweenDash)
                 .each("end", function(d) {
                     /*console.log("d.properties");
                     console.log(d.properties);*/
                     d3.select(this).call(transition); // infinite loop
                 });
         } //end transition

         // this function feeds the attrTween operator above with the 
         // stroke and dash lengths
         var tweenToggle = 0;

         function tweenDash() {
             return function(t) {
                 //total length of path (single value)
                 //console.log(linePath.node());
                 var l = linePath.node().getTotalLength();

                 // this is creating a function called interpolate which takes
                 // as input a single value 0-1. The function will interpolate
                 // between the numbers embedded in a string. An example might
                 // be interpolatString("0,500", "500,500") in which case
                 // the first number would interpolate through 0-500 and the
                 // second number through 500-500 (always 500). So, then
                 // if you used interpolate(0.5) you would get "250, 500"
                 // when input into the attrTween above this means give me
                 // a line of length 250 followed by a gap of 500. Since the
                 // total line length, though is only 500 to begin with this
                 // essentially says give me a line of 250px followed by a gap
                 // of 250px.
                 interpolate = d3.interpolateString("0," + l, l + "," + l);
                 //t is fraction of time 0-1 since transition began
                 var marker = d3.select("#marker");

                 // p is the point on the line (coordinates) at a given length
                 // along the line. In this case if l=50 and we're midway through
                 // the time then this would 25.
                 var p = linePath.node().getPointAtLength(t * l);

                 //Move the marker to that point
                 marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
                 //console.log(interpolate(t))

                 cont++;

                 if (cont > 900 && cont < 3000) {
                     //console.log(cont);
                     //console.log(t);
                     //	console.log(l);	

                 }

                 if (tweenToggle == 0) {
                     tweenToggle = 1;
                     var newCenter = map_ruta.layerPointToLatLng(new L.Point(p.x, p.y));
                     map_ruta.panTo(newCenter, 14);
                 } else {
                     tweenToggle = 0;
                 }
                 var currentloc = parseFloat(interpolate(t).split(",")[0]);
                 var seq = [];
                 for (var i = 0; i != segments.length - 1; ++i) seq.push(i)

                 sumval = seq.filter(function(d, i) {
                     return segments[i] < currentloc
                 });

                 console.log(sumval.length);
                 var segments_data = featuresdata[sumval.length];

                 $('#routediaanio').text(moment(segments_data.properties.fecha_captura, moment.ISO_8601).format('dddd MMMM Do YYYY'));
                 $('#routehour').text(moment(segments_data.properties.fecha_captura, moment.ISO_8601).format('h:mm a'));

                 return interpolate(t);
             };
         } //end tweenDash

         // Use Leaflet to implement a D3 geometric transformation.
         // the latLngToLayerPoint is a Leaflet conversion method:
         //Returns the map layer point that corresponds to the given geographical
         // coordinates (useful for placing overlays on the map).
         function projectPoint(x, y) {
             var point = map_ruta.latLngToLayerPoint(new L.LatLng(y, x));
             //console.log(point);
             this.stream.point(point.x, point.y);
         } //end projectPoint
         function applyLatLngToLayer(d) {
             var y = d.geometry.coordinates[1];
             var x = d.geometry.coordinates[0];
             return map_ruta.latLngToLayerPoint(new L.LatLng(y, x));
         }
     } //Cierra if de cantidad de elemetos

 };