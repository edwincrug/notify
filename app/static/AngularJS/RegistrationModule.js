var registrationModule = angular.module("registrationModule", ["ngRoute", "cgBusy", "ngGrid", "ui.bootstrap", "LocalStorageModule"])
.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '/AngularJS/Templates/Cliente.html',
        controller: 'clienteController'
    });

    $routeProvider.when('/factura', {
        templateUrl: '/AngularJS/Templates/Factura.html',
        controller: 'facturaController'
    });

    $routeProvider.when('/cobranza', {
        templateUrl: '/AngularJS/Templates/Cobranza.html',
        controller: 'cobranzaController'
    });

    $routeProvider.when('/consumo', {
        templateUrl: '/AngularJS/Templates/ConsumoAlta.html',
        controller: 'consumoAltaController'
    });

    $routeProvider.when('/correspondencia', {
        templateUrl: '/AngularJS/Templates/CorrespondenciaEntrega.html',
        controller: 'correspondenciaEntregaController'
    });

    $routeProvider.when('/solos', {
        templateUrl: '/AngularJS/Templates/Solos.html',
        controller: 'solosController'
    });

    $routeProvider.when('/reporteclientes', {
        templateUrl: '/AngularJS/Templates/Reportes/Clientes.html',
        controller: 'clienteReporteController'
    }); 

    $routeProvider.when('/reportefacturas', {
        templateUrl: '/AngularJS/Templates/Reportes/Facturas.html',
        controller: 'facturaReporteController'
    });

    $routeProvider.when('/salaMain', {
        templateUrl: '/AngularJS/Templates/Sala/Main.html',
        controller: 'salaMainController'
    });

    $routeProvider.when('/salaSearch', {
        templateUrl: '/AngularJS/Templates/Sala/Search.html',
        controller: 'salaSearchController'
    });
    $routeProvider.when('/salaMonitor', {
        templateUrl: '/AngularJS/Templates/Sala/Monitor.html',
        controller: 'salaMonitorController'
    });

    $routeProvider.when('/envioMain', {
        templateUrl: '/AngularJS/Templates/Envio/Main.html',
        controller: 'envioMainController'
    });
    
    $routeProvider.when('/envioMonitor', {
        templateUrl: '/AngularJS/Templates/Envio/Monitor.html',
        controller: 'envioMonitorController'
    });

    $routeProvider.when('/envioSearch', {
        templateUrl: '/AngularJS/Templates/Envio/Search.html',
        controller: 'envioSearchController'
    });

    $routeProvider.when('/envioList', {
        templateUrl: '/AngularJS/Templates/Envio/List.html',
        controller: 'envioListController'
    });

    $routeProvider.when('/envioSign', {
        templateUrl: '/AngularJS/Templates/Envio/Sign.html',
        controller: 'envioSignController'
    });

    $routeProvider.when('/home', {
        templateUrl: '/AngularJS/Templates/Home.html',
        controller: 'homeController'
    });

    $routeProvider.when('/empleado', {
        templateUrl: '/AngularJS/Templates/Empleado.html',
        controller: 'empleadoController'
    });
    
    $routeProvider.when('/inventario', {
        templateUrl: '/AngularJS/Templates/Inventario.html',
        controller: 'inventarioController'
    });
    
    $routeProvider.when('/proveedor', {
        templateUrl: '/AngularJS/Templates/Proveedor.html',
        controller: 'proveedorController'
    });
    
    $routeProvider.when('/perfil', {
        templateUrl: '/AngularJS/Templates/Perfil.html',
        controller: 'perfilController'
    });
    
    $routeProvider.when('/administracion', {
        templateUrl: '/AngularJS/Templates/Administracion.html',
        controller: 'administracionController'
    });

    $routeProvider.when('/finanzas', {
        templateUrl: '/AngularJS/Templates/Finanzas.html',
        controller: 'finanzasController'
    });

    $routeProvider.when('/reporte', {
        templateUrl: '/AngularJS/Templates/Reporte.html',
        controller: 'reporteController'
    });

    $routeProvider.otherwise({redirecTo: '/'});

    $locationProvider.html5Mode({  
        enabled: true
    });
});

registrationModule.run(function ($rootScope) {
    $rootScope.empleado = "";
    $rootScope.cliente = "";
})

registrationModule.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.height(), 'w': w.width() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h -70) + 'px',
                    'width': (newValue.w - 0) + 'px',
                    'position': 'relative' 
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})