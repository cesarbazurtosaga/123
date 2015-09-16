 var Lyr_wms=function () {
    this.limite_departamental= new ol.layer.Tile({
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
          url: glo.UrlGeoserver+'gwc/service/wms',
          params: {'LAYERS': 'administrativa:g_colombia_dpto', 'TILED': true, 'SRS':'EPSG%3A3857'},
          serverType: 'geoserver'
        }))
      });
      this.base_SAGA = new ol.layer.Tile({
        source: new ol.source.TileWMS( /*@type {olx.source.TileWMSOptions} */ ({

          url: glo.UrlGeoserver+'gwc/service/wms',
          params: {'LAYERS': 'Base', 'TILED': true,'SRS':'EPSG%3A900913'},
          serverType: 'geoserver',
          extent: [-8889935, 2870341229963, -7627621.31437, 891271],
          attributions: [new ol.Attribution({
            html: '<a href="http://www.cundinamarca.gov.co/wps/portal/Home/Inicio.homegc" target="_blank">Gobernación de Cundinamarca-TIC</a>'
          })],
          ratio: 3      
        }))
      });
      this.limite_provincial=  new ol.layer.Tile({
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
          url: glo.UrlGeoserver+'gwc/service/wms',
          params: {'LAYERS': 'administrativa:g_provincia', 'TILED': true, 'STYLES':'Sym_Provincia_96a4ca5d','SRS':'EPSG%3A900913'},
          serverType: 'geoserver'
        }))
      });
      this.limite_municipio=  new ol.layer.Tile({
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
          url: glo.UrlGeoserver+'gwc/service/wms',
          params: {'LAYERS': 'administrativa:g_municipio', 'TILED': true, 'STYLES':'Sym_Municipio_limite','SRS':'EPSG%3A900913'},
          serverType: 'geoserver'
        }))
      });
      
      this.limite_vereda=   new ol.layer.Tile({
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
           url: glo.UrlGeoserver+'gwc/service/wms',
           params: {'LAYERS':  'administrativa:g_vereda', 'TILED': true, 'STYLES':'Sym_Vereda_623c161d','SRS':'EPSG%3A900913'},
           serverType: 'geoserver'
        }))
      });
      
 };