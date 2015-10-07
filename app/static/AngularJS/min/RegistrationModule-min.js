var registrationModule=angular.module("registrationModule",["ngRoute","cgBusy","ngGrid","ui.bootstrap","LocalStorageModule"]).config(function(e,l){e.when("/",{templateUrl:"/AngularJS/Templates/Cliente.html",controller:"clienteController"}),e.when("/factura",{templateUrl:"/AngularJS/Templates/Factura.html",controller:"facturaController"}),e.when("/cobranza",{templateUrl:"/AngularJS/Templates/Cobranza.html",controller:"cobranzaController"}),e.when("/consumo",{templateUrl:"/AngularJS/Templates/ConsumoAlta.html",controller:"consumoAltaController"}),e.when("/correspondencia",{templateUrl:"/AngularJS/Templates/CorrespondenciaEntrega.html",controller:"correspondenciaEntregaController"}),e.when("/solos",{templateUrl:"/AngularJS/Templates/Solos.html",controller:"solosController"}),e.when("/reporteclientes",{templateUrl:"/AngularJS/Templates/Reportes/Clientes.html",controller:"clienteReporteController"}),e.when("/reportefacturas",{templateUrl:"/AngularJS/Templates/Reportes/Facturas.html",controller:"facturaReporteController"}),e.when("/salaMain",{templateUrl:"/AngularJS/Templates/Sala/Main.html",controller:"salaMainController"}),e.when("/salaSearch",{templateUrl:"/AngularJS/Templates/Sala/Search.html",controller:"salaSearchController"}),e.when("/salaMonitor",{templateUrl:"/AngularJS/Templates/Sala/Monitor.html",controller:"salaMonitorController"}),e.when("/envioMain",{templateUrl:"/AngularJS/Templates/Envio/Main.html",controller:"envioMainController"}),e.when("/envioMonitor",{templateUrl:"/AngularJS/Templates/Envio/Monitor.html",controller:"envioMonitorController"}),e.when("/envioSearch",{templateUrl:"/AngularJS/Templates/Envio/Search.html",controller:"envioSearchController"}),e.when("/envioList",{templateUrl:"/AngularJS/Templates/Envio/List.html",controller:"envioListController"}),e.when("/envioSign",{templateUrl:"/AngularJS/Templates/Envio/Sign.html",controller:"envioSignController"}),e.when("/home",{templateUrl:"/AngularJS/Templates/Home.html",controller:"homeController"}),e.when("/empleado",{templateUrl:"/AngularJS/Templates/Empleado.html",controller:"empleadoController"}),e.when("/inventario",{templateUrl:"/AngularJS/Templates/Inventario.html",controller:"inventarioController"}),e.when("/proveedor",{templateUrl:"/AngularJS/Templates/Proveedor.html",controller:"proveedorController"}),e.when("/perfil",{templateUrl:"/AngularJS/Templates/Perfil.html",controller:"perfilController"}),e.when("/administracion",{templateUrl:"/AngularJS/Templates/Administracion.html",controller:"administracionController"}),e.when("/finanzas",{templateUrl:"/AngularJS/Templates/Finanzas.html",controller:"finanzasController"}),e.when("/reporte",{templateUrl:"/AngularJS/Templates/Reporte.html",controller:"reporteController"}),e.otherwise({redirecTo:"/"}),l.html5Mode({enabled:!0})});registrationModule.run(function(e){e.empleado="",e.cliente=""}),registrationModule.directive("resize",function(e){return function(l,r){var t=angular.element(e);l.getWindowDimensions=function(){return{h:t.height(),w:t.width()}},l.$watch(l.getWindowDimensions,function(e,r){l.windowHeight=e.h,l.windowWidth=e.w,l.style=function(){return{height:e.h-70+"px",width:e.w-0+"px",position:"relative"}}},!0),t.bind("resize",function(){l.$apply()})}});