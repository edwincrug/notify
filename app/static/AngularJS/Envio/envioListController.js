registrationModule.controller("envioListController", function ($scope, $rootScope, localStorageService, notificationFactory, envioRepository) {

    //Propiedades
        
    //Funciones
    //Callback success
    var getListSuccess = function (data, status, headers, config) {
        if (data) {
           $scope.listaEnviosMonitor = data;
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
        $scope.myPromise = envioRepository.getList()
                .success(getListSuccess)
                .error(errorCallBack);
    }

    //Success change stage
    var getChangeStageSuccess = function (data, status, headers, config) {
        $scope.Reload();
        notificationFactory.success('Ha marcado el inicio de este envío.');
    }

    //Cambia el estatus de un envío a :En progreso
    $scope.IniciarEnvio = function (env) {
        //Obtengo la lista de envios del monitor
          $scope.myPromise = envioRepository.changeStage(env.idEnvio,2)
                .success(getChangeStageSuccess)
                .error(errorCallBack);
    }

    $scope.Entregar = function (env) {
        //Obtengo la lista de envios del monitor
        localStorageService.set('envioEntrega', env);
        location.href = '/envioSign'
    }

});



