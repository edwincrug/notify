registrationModule.controller("recordatorioController", function ($scope, $rootScope, recordatorioRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

 
    $scope.MostrarRecordatorio = function() {
        $('#viewRecordatorio').modal('show');
    }

    //Success de addagenda
    var addRecordatorioSuccess = function (data, status, headers, config) {
        notificationFactory.success('Recordatorio guardado correctamente.');
        $('#btnNewRecordatorio').button('reset');
        $('#viewRecordatorio').modal('hide');
        $rootScope.RootReload();
    }

    //Agrega nuevo evento en la agenda
    $scope.NewRecordatorio = function() {
        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;
		//Oculto el botón
        $('#btnNewRecordatorio').button('loading');
        recordatorioRepository.add($scope.empleado.idEmpleado, $scope.notaRecordatorio)
            .success(addRecordatorioSuccess)
            .error(errorCallBack);
    }

    var eliminaRecordatorioSuccess = function (data, status, headers, config) {
        notificationFactory.success('Recordatorio eliminado correctamente.');
        $rootScope.RootReload();
    }

    //Elimina el evento de la agenda
    $scope.EliminarRecordatorio = function(rec) {
        if(confirm('¿Desea eliminar este recordatorio?')){
            recordatorioRepository.eliminar(rec.idRecordatorio)
                .success(eliminaRecordatorioSuccess)
                .error(errorCallBack);
        }
    }

    //Success completa recordatorio
	var completarRecordatorioSuccess = function (data, status, headers, config) {
        notificationFactory.success('Recordatorio actualizado.');
        $rootScope.RootReload();
    }

    //Completa el recordatorio
    $scope.CompletarRecordatorio = function(rec){
    	recordatorioRepository.actualizar(rec.idRecordatorio, 4)
                .success(completarRecordatorioSuccess)
                .error(errorCallBack);
    }

    //Completa el recordatorio
    $scope.PlayRecordatorio = function(rec){
    	recordatorioRepository.actualizar(rec.idRecordatorio, 2)
                .success(completarRecordatorioSuccess)
                .error(errorCallBack);
    }

	//Completa el recordatorio
    $scope.PauseRecordatorio = function(rec){
    	recordatorioRepository.actualizar(rec.idRecordatorio, 3)
                .success(completarRecordatorioSuccess)
                .error(errorCallBack);
    }

});