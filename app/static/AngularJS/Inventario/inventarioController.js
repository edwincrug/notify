registrationModule.controller("inventarioController", function ($scope, $rootScope, inventarioRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    
});