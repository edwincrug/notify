registrationModule.controller("LEController", function ($scope, $rootScope, LERepository, localStorageService, notificationFactory) {

    //Propiedades
    $rootScope.labelLESucursal = 'Del Valle 1'; 

    //Funciones
    //Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    //Success de Get Oficina
    var getLESuccess = function (data, status, headers, config) {
    	$rootScope.listaLE = data;
    }

    //Success de Get empty
    var getEmptySuccess = function (data, status, headers, config) {
        $rootScope.objLE = data;
        $rootScope.objLE.idSucursal = 1;
        $rootScope.objLE.estatusAsignacion = 'Disponible';
        //Muestro la lista de oficinas
        $scope.Reload();
    }

    $scope.Reload = function() {
		//Oculto el botón de Actualizar
    	$('#btnActualizaLE').hide();
    	//Muestro la ventana modal
    	$('#adminLEs').modal('show');

    	//Muestro la lista de oficinas
        LERepository.getLE()
            .success(getLESuccess)
            .error(errorCallBack);
    }
    
    //////////////////////////////////
    //Administracion de LE
    $scope.ShowLineas = function () {
        //Obtengo un objeto nuevo de oficina
        LERepository.getEmpty()
            .success(getEmptySuccess)
            .error(errorCallBack);
        //Obtengo la lista de Oficinas

    };

    //Nueva oficina set sucursal
    $scope.SetSucursal = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopensucursal = !$scope.status.isopensucursal;
        $rootScope.objLE.idSucursal = valor;
        $rootScope.labelLESucursal = name;
    }

    //Cargo la oficina para actualizar
    $scope.CargaLE = function(le) {
    	$rootScope.objLE = le;
    	//Muestro el botón de Actualizar
    	$('#btnActualizaLE').show();
    }

    //Actualiza Oficina Success
    var actualizaLESuccess = function (data, status, headers, config) {
        $('#btnActualizaLE').hide();
        $('#btnActualizaLE').button('reset');
        notificationFactory.success('Línea Emprendedor actualizada correctamente.');
        //Obtengo un objeto nuevo de oficina
        LERepository.getEmpty()
            .success(getEmptySuccess)
            .error(errorCallBack);
    }

    //Actualiza LE
    $scope.ActualizaLE = function() {
    	$('#btnActualizaLE').button('loading');
    	//Actualizo un objeto nuevo de oficina
        LERepository.put($rootScope.objLE)
            .success(actualizaLESuccess)
            .error(errorCallBack);
    }

    //Agrega LE Success
    var agregaLESuccess = function (data, status, headers, config) {
        $('#btnActualizaLE').hide();
        $('#btnAgregaLE').button('reset');
        notificationFactory.success('Línea Emprendedor agregada correctamente.');
        //Obtengo un objeto nuevo de oficina
        LERepository.getEmpty()
            .success(getEmptySuccess)
            .error(errorCallBack);
    }

    //Agrega LE
    $scope.AgregaLE = function() {
    	$('#btnAgregaLE').button('loading');
    	//Actualizo un objeto nuevo de LE
        LERepository.add($rootScope.objLE)
            .success(agregaLESuccess)
            .error(errorCallBack);
    }

    //Success Elimina LE
    var eliminarLESuccess = function (data, status, headers, config) {
        notificationFactory.success('Línea Emprendedor eliminada correctamente.');
        $scope.Reload();
    }

    //Elimina Oficina
    $scope.EliminaLE = function(le) {
    	//Actualizo un objeto nuevo de oficina
        LERepository.eliminar(le.idLE)
            .success(eliminarLESuccess)
            .error(errorCallBack);
    }
});