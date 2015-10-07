registrationModule.controller("autorizacionController", function ($scope, $rootScope, autorizacionRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    $scope.ShowAprobar = function (aut) {
        //MOstramos la ventana modal
        $('#adminAutorizacion').modal('show');
        $rootScope.observacionesAprobacion = '';
        $rootScope.objAutorizacion = aut;
    }
    
    var aprobarSuccess = function (data, status, headers, config) {
        $('#btnAprobar').button('reset');
        $('#btnRechazar').button('reset');
        notificationFactory.info('Aprobación procesada');
        $rootScope.RootReload();
        $('#adminAutorizacion').modal('hide');
    }

    $scope.Aprobar = function (decision) {
        if(decision == 2){ //Aprobado
            $('#btnAprobar').button('loading');
        }
        else{ //Rechazado
            $('#btnRechazar').button('loading');
        }
        //Obtengo la informacion del empleado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        autorizacionRepository.aprobar($rootScope.objAutorizacion.idAutorizacion, $scope.empleado.idEmpleado, $rootScope.observacionesAprobacion, decision)
            .success(aprobarSuccess)
            .error(errorCallBack);
    }


});