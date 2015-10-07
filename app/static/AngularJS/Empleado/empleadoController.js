registrationModule.controller("empleadoController", function ($scope, $rootScope, empleadoRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
    	$('#btnGuardarEmpleado').button('reset');
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    //Success de obtener empleados
    var getEmpleadoSuccess = function (data, status, headers, config) {
        $scope.listaEmpleados = data;
        notificationFactory.success('Lista de empleados cargada');
    }

    //Obtengo un empleado vacío
    var getEmpleadoEmptySuccess = function (data, status, headers, config) {
    	$scope.empleadoTemp = data;
    	$scope.empleadoTemp.idArea = 1;
    	$scope.empleadoTemp.idDepartamento = 1;
    	$scope.empleadoTemp.nombre = '';
    	$scope.empleadoTemp.apellidoPaterno = '';
    	$scope.empleadoTemp.apellidoMaterno = '';
    	$scope.empleadoTemp.email = '';
    	$scope.empleadoTemp.usuario = '';
    	$scope.empleadoTemp.contrasena = '';
    	$scope.empleadoTemp.estatus = 1;
    	$scope.empleadoTemp.sexo = 1;
    	$('#viewEmpleado').modal('show');
    }

    //Inicio del frame
    $scope.init = function() {
    	$scope.Reload();
        //Inicio los tooltips
        $('[data-toggle="tooltip"]').tooltip();
    };

    $scope.Reload = function() {
    	//Obtengo la lista completa de emplados
    	empleadoRepository.getEmpleado()
    		.success(getEmpleadoSuccess)
            .error(errorCallBack);
    }

    //Edita un empleado
    $scope.EditarEmpleado = function(emp) {
    	$scope.empleadoTemp = emp;
    	$('#viewEmpleado').modal('show');
    };
    

    //Almacena un nuevo empleado
    $scope.NuevoEmpleado = function() {
    	//Obtengo un empleado vacío
    	empleadoRepository.getEmpty()
    		.success(getEmpleadoEmptySuccess)
            .error(errorCallBack);
    }

    //Success de nuevo empleado
    var addEmpleadoSuccess = function (data, status, headers, config) {
    	notificationFactory.success('Empleado agregado correctamente');
    	$('#btnGuardarEmpleado').button('reset');
    	$('#viewEmpleado').modal('hide');
    	$scope.Reload();
    }
    
 	//Success de actualización de empleado
    var putEmpleadoSuccess = function (data, status, headers, config) {
    	notificationFactory.success('Empleado actualizado correctamente');
    	$('#btnGuardarEmpleado').button('reset');
    	$('#viewEmpleado').modal('hide');
    	$scope.Reload();
    }

    //Guarda el nuevo empleado
    $scope.GuardarEmpleado = function() {
    	$('#btnGuardarEmpleado').button('loading');
    	if($scope.empleadoTemp.idEmpleado > 0){
    		empleadoRepository.put($scope.empleadoTemp)
    			.success(putEmpleadoSuccess)
            	.error(errorCallBack);
    	}
    	else{
    		empleadoRepository.add($scope.empleadoTemp)
    			.success(addEmpleadoSuccess)
            	.error(errorCallBack);
    	}
    }

    //Toggle Área
    $scope.toggleArea = function ($event, opc) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen1 = !$scope.status.isopen1;
        $scope.empleadoTemp.idArea = opc;
        $scope.labelArea = $event.target.innerText;
    };

    $scope.labelArea = 'Gerencia';

    //Toggle Departamento
    $scope.toggleDepartamento = function ($event, opc) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen2 = !$scope.status.isopen2;
        $scope.empleadoTemp.idDepartamento = opc;
        $scope.labelDepartamento = $event.target.innerText;
    };

    $scope.labelDepartamento = 'Gerencia Operativa';

});