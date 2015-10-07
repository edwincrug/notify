registrationModule.controller("sesionController", function ($scope, $rootScope, sesionRepository, localStorageService, notificationFactory) {


    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    //Success de session
    var getSession1Success = function (data, status, headers, config) {
        $rootScope.estatus1 = data.idEtapa;
        $rootScope.nombre1 = data.empleado;
        $rootScope.imagen1 = global_settings.pathAvatar + data.avatar;
    }
    //Success de session
    var getSession2Success = function (data, status, headers, config) {
        $rootScope.estatus2 = data.idEtapa;
        $rootScope.nombre2 = data.empleado;
        $rootScope.imagen2 = global_settings.pathAvatar + data.avatar;
    }
    //Success de session
    var getSession6Success = function (data, status, headers, config) {
        $rootScope.estatus6 = data.idEtapa;
        $rootScope.nombre6 = data.empleado;
        $rootScope.imagen6 = global_settings.pathAvatar + data.avatar;
    }
    //Success de session
    var getSession8Success = function (data, status, headers, config) {
        $rootScope.estatus8 = data.idEtapa;
        $rootScope.nombre8 = data.empleado;
        $rootScope.imagen8 = global_settings.pathAvatar + data.avatar;
    }
    //Success de session
    var getSession9Success = function (data, status, headers, config) {
        $rootScope.estatus9 = data.idEtapa;
        $rootScope.nombre9 = data.empleado;
        $rootScope.imagen9 = global_settings.pathAvatar + data.avatar;
    }
//Success de session
    var getSession11Success = function (data, status, headers, config) {
        $rootScope.estatus11 = data.idEtapa;
        $rootScope.nombre11 = data.empleado;
        $rootScope.imagen11 = global_settings.pathAvatar + data.avatar;
    }
//Success de session
    var getSession12Success = function (data, status, headers, config) {
        $rootScope.estatus12 = data.idEtapa;
        $rootScope.nombre12 = data.empleado;
        $rootScope.imagen12 = global_settings.pathAvatar + data.avatar;
    }
//Success de session
    var getSession15Success = function (data, status, headers, config) {
        $rootScope.estatus15 = data.idEtapa;
        $rootScope.nombre15 = data.empleado;
        $rootScope.imagen15 = global_settings.pathAvatar + data.avatar;
    }
//Success de session
    var getSession17Success = function (data, status, headers, config) {
        $rootScope.estatus17 = data.idEtapa;
        $rootScope.nombre17 = data.empleado;
        $rootScope.imagen17 = global_settings.pathAvatar + data.avatar;
    }
//Success de session
    var getSession18Success = function (data, status, headers, config) {
        $rootScope.estatus18 = data.idEtapa;
        $rootScope.nombre18 = data.empleado;
        $rootScope.imagen18 = global_settings.pathAvatar + data.avatar;
    }

    $scope.ShowChat = function() {
        //Marco el botón loading
        //$('#chat').button('loading');
        $('#viewChat').modal('show');
        //Obtengo la lista de chats
        sesionRepository.getSesion(1)
            .success(getSession1Success)
            .error(errorCallBack);
        sesionRepository.getSesion(2)
            .success(getSession2Success)
            .error(errorCallBack);
        sesionRepository.getSesion(6)
            .success(getSession6Success)
            .error(errorCallBack);
        sesionRepository.getSesion(8)
            .success(getSession8Success)
            .error(errorCallBack);
        sesionRepository.getSesion(9)
            .success(getSession9Success)
            .error(errorCallBack);
        sesionRepository.getSesion(11)
            .success(getSession11Success)
            .error(errorCallBack);
        sesionRepository.getSesion(12)
            .success(getSession12Success)
            .error(errorCallBack);
        sesionRepository.getSesion(15)
            .success(getSession15Success)
            .error(errorCallBack);
        sesionRepository.getSesion(17)
            .success(getSession17Success)
            .error(errorCallBack);
        sesionRepository.getSesion(18)
            .success(getSession18Success)
            .error(errorCallBack);
        
    }

});