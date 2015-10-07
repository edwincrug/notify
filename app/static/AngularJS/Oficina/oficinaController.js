registrationModule.controller("oficinaController", function ($scope, $rootScope, oficinaRepository, localStorageService, notificationFactory) {

    //Propiedades
    $rootScope.labelOficinaSucursal = 'Del Valle 1'; 

    //Funciones
    //Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    //Success de Get Oficina
    var getOficinaSuccess = function (data, status, headers, config) {
    	$rootScope.listaOficinas = data;
    }

    //Success de Get empty
    var getEmptySuccess = function (data, status, headers, config) {
        $rootScope.objOficina = data;
        $rootScope.objOficina.idSucursal = 1;
        $rootScope.objOficina.estatusAsignacion = 'Disponible';
        //Muestro la lista de oficinas
        $scope.Reload();
    }

    $scope.Reload = function() {
		//Oculto el botón de Actualizar
    	$('#btnActualizaOficina').hide();
    	//Muestro la ventana modal
    	$('#adminOficinas').modal('show');

    	//Muestro la lista de oficinas
        oficinaRepository.getOficina()
            .success(getOficinaSuccess)
            .error(errorCallBack);
    }
    
    //////////////////////////////////
    //Administracion de oficinas
    $scope.ShowOficinas = function () {
        //Obtengo un objeto nuevo de oficina
        oficinaRepository.getEmpty()
            .success(getEmptySuccess)
            .error(errorCallBack);
        //Obtengo la lista de Oficinas

    };

    //Nueva oficina set sucursal
    $scope.SetSucursal = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopensucursal = !$scope.status.isopensucursal;
        $rootScope.objOficina.idSucursal = valor;
        $rootScope.labelOficinaSucursal = name;
    }

    //Cargo la oficina para actualizar
    $scope.CargaOficina = function(ofn) {
    	$rootScope.objOficina = ofn;
    	//Muestro el botón de Actualizar
    	$('#btnActualizaOficina').show();
    }

    //Actualiza Oficina Success
    var actualizaOficinaSuccess = function (data, status, headers, config) {
        $('#btnActualizaOficina').hide();
        $('#btnActualizaOficina').button('reset');
        notificationFactory.success('Oficina actualizada correctamente.');
        //Obtengo un objeto nuevo de oficina
        oficinaRepository.getEmpty()
            .success(getEmptySuccess)
            .error(errorCallBack);
    }

    //Actualiza Oficina
    $scope.ActualizaOficina = function() {
    	$('#btnActualizaOficina').button('loading');
    	//Actualizo un objeto nuevo de oficina
        oficinaRepository.put($rootScope.objOficina)
            .success(actualizaOficinaSuccess)
            .error(errorCallBack);
    }

    //Agrega Oficina Success
    var agregaOficinaSuccess = function (data, status, headers, config) {
        $('#btnActualizaOficina').hide();
        $('#btnAgregaOficina').button('reset');
        notificationFactory.success('Oficina agregada correctamente.');
        //Obtengo un objeto nuevo de oficina
        oficinaRepository.getEmpty()
            .success(getEmptySuccess)
            .error(errorCallBack);
    }

    //Agrega Oficina
    $scope.AgregaOficina = function() {
    	$('#btnAgregaOficina').button('loading');
    	//Actualizo un objeto nuevo de oficina
        oficinaRepository.add($rootScope.objOficina)
            .success(agregaOficinaSuccess)
            .error(errorCallBack);
    }

    //Success Elimina Oficina
    var eliminarOficinaSuccess = function (data, status, headers, config) {
        notificationFactory.success('Oficina eliminada correctamente.');
        $scope.Reload();
    }

    //Elimina Oficina
    $scope.EliminaOficina = function(ofn) {
    	//Actualizo un objeto nuevo de oficina
        oficinaRepository.eliminar(ofn.idOficina)
            .success(eliminarOficinaSuccess)
            .error(errorCallBack);
    }
});