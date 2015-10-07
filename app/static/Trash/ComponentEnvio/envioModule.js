var envioModule = angular.module("envioModule", ["ngRoute", "cgBusy", "ngGrid", "ui.bootstrap", "LocalStorageModule"])
.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '/ComponentEnvio/Templates/Main.html',
        controller: 'mainController'
    });

    $routeProvider.when('/firmar', {
        templateUrl: '/ComponentEnvio/Templates/Sign.html',
        controller: 'signController'
    });

    $routeProvider.otherwise({redirecTo: '/'});

    $locationProvider.html5Mode({  
        enabled: true
    });
});

envioModule.run(function ($rootScope) {
    $rootScope.empleado = "";
    $rootScope.cliente = "";
});