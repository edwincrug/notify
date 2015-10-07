registrationModule.controller("aprobacionController", function ($scope, $rootScope, localStorageService, alertFactory, aprobacionRepository) {


    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        $('#btnEnviar').button('reset');
        alertFactory.error('Ocurrio un problema');
    };

    //////////////////////////////////////////////////////////////////
    // Aprobación y Rechazo
    /////////////////////////////////////////////////////////////////
    $scope.Aprobar = function (not) {
        if ($scope.observacion != null)
        {
            $('#btnApprove').button('loading');
            aprobacionRepository.add(not.id, $rootScope.currentEmployee, $scope.observacion, 1)
                .success(putASuccessCallback)
                .error(errorCallBack);
        }
        else {
            alertFactory.info('Debe incluir un comentario.');
        }
        
    };

    var putASuccessCallback = function (data, status, headers, config) {
        alertFactory.info('Aprobada Correctamente.')
        $('#btnApprove').button('reset');
        $rootScope.Reload();
    };

    $scope.Rechazar = function (not) {
        if ($scope.observacion != null ) {
            $('#btnReject').button('loading');
            aprobacionRepository.add(not.id, $rootScope.currentEmployee, $scope.observacion, 2)
                .success(putRSuccessCallback)
                .error(errorCallBack);
        }
        else {
            alertFactory.info('Debe incluir un comentario.');
        }
    };

    var putRSuccessCallback = function (data, status, headers, config) {
        alertFactory.warning('Rechazada Correctamente.')
        $('#btnReject').button('reset');
        $rootScope.Reload();
    };
});