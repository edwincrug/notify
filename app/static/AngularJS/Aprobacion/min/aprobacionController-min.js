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
        if(confirm('¿Desea aprobar el folio: ' + not.identificador + '?')){
            if ($scope.observacion != null){
                $('#btnApprove').button('loading');
                aprobacionRepository.responder(not.idAprobacion, 1,$scope.observacion)
                    .success(putASuccessCallback)
                    .error(errorCallBack);
            }
            else {
                alertFactory.info('Debe incluir un comentario.');
            }
        }
        
    };

    var putASuccessCallback = function (data, status, headers, config) {
        alertFactory.info('Aprobada Correctamente.')
        $('#btnApprove').button('reset');
        $rootScope.actualizar = true;
        $rootScope.Reload();
    };

    $scope.Rechazar = function (not) {
        if(confirm('¿Desea rechazar el folio: ' + not.identificador + '?')){
            if ($scope.observacion != null ) {
                $('#btnReject').button('loading');
                aprobacionRepository.responder(not.idAprobacion, 0, $scope.observacion)
                    .success(putRSuccessCallback)
                    .error(errorCallBack);
            }
            else {
                alertFactory.info('Debe incluir un comentario.');
            }
        }
    };

    var putRSuccessCallback = function (data, status, headers, config) {
        alertFactory.warning('Rechazada Correctamente.')
        $('#btnReject').button('reset');
        $rootScope.actualizar = true;
        $rootScope.Reload();
    };
});

