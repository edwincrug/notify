registrationModule.controller("bitacoraController", function ($scope, $rootScope, bitacoraRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    //Success de addBitacora
    var addBitacoraSuccess = function (data, status, headers, config) {
        notificationFactory.success('Nota guardada correctamente.');
        $scope.notaBitacora = '';
        $('#btnNota').button('reset');
        $rootScope.RootReload();
    }

    //Agrega un nuevo registro de bitacora
 	$scope.AgregarBitacora = function() {
 		//Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

 		$('#btnNota').button('loading');
 		bitacoraRepository.add($scope.empleado.idEmpleado, $scope.notaBitacora)
 			.success(addBitacoraSuccess)
            .error(errorCallBack);
 	}


});