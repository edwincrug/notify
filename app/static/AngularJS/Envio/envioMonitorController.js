registrationModule.controller("envioMonitorController", function ($scope, $rootScope, envioRepository, notificationFactory) {

    //Propiedades

    //Funciones
    //Callback success
    var getMonitorSuccess = function (data, status, headers, config) {
        if (data) {
           $scope.listaEnviosMonitor = data;
           $scope.lastUpdate = new Date().format("dd/mm/yy hh:MM");
        }
        else
            notificationFactory.error('Ocurrió un problema: ' + data.Message);
    }

    //Callback error
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema: status ' + status);
    }

 	//Ejecuta un paquete de funciones de inicio
    $scope.init = function () {
        //Obtengo la lista de envios del monitor
        $scope.Reload();
        //Inicio repetidor        
        var myRefresh = setInterval(function () { 
            $scope.Reload();
        }, 180000);
    };

    //Cargo el contenido del monitor
    $scope.Reload = function () {
        //Obtengo la lista de envios del monitor
        $scope.myPromise = envioRepository.getMonitor()
                .success(getMonitorSuccess)
                .error(errorCallBack);
    }

});