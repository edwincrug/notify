registrationModule.controller("homeController", function ($scope, $rootScope, localStorageService, notificationFactory, autorizacionRepository, agendaRepository, recordatorioRepository, bitacoraRepository, contratoRepository, homeRepository) {

    //Propiedades
    $scope.newPublicacion = _Publicacion;
    $scope.departamento = '';

	//Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    $scope.init = function () {
    	//Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        $scope.departamento = $scope.empleado.nombreArea + ' - ' + $scope.empleado.nombreDepartamento;
        //Cargo la lista inicialmente
        $scope.Reload();
        //Obtengo los datos periodicos
        var myRefresh = setInterval(function () { 
            $scope.Reload();
        }, 180000);
    };

    //Success de publicaciones
    var getPublicacionSuccess = function (data, status, headers, config) {
    	$scope.listaPublicaciones = data;
    	notificationFactory.success('Publicaciones cargadas.');
    }

    //Success de autorizacion
    var getAutorizacionSuccess = function (data, status, headers, config) {
        $scope.listaAutorizaciones = data;
        notificationFactory.success('Autorizaciones cargadas.');
    }

    //Success de agenda
    var getAgendaSuccess = function (data, status, headers, config) {
        $scope.listaAgenda = data;
        notificationFactory.success('Agenda cargada.');
    }

    //getRecordatorioSuccess
    var getRecordatorioSuccess = function (data, status, headers, config) {
        $scope.listaRecordatorio = data;
        notificationFactory.success('Recordatorios cargados.');
    }

    //getBitacoraSuccess
    var getBitacoraSuccess = function (data, status, headers, config) {
        $scope.listaNotas = data;
        notificationFactory.success('Notas cargadas.');
    }

    //Get retención success
    var getRetencionSuccess = function (data, status, headers, config) {
        $scope.listRetencion = data;
        notificationFactory.success('Retenciones cargadas.');
    }

    //Recarga de información en pantalla
    $scope.Reload = function () {
    	//Obtengo las Publicaciones
    	homeRepository.getPublicaciones($scope.empleado.idEmpleado)
    		.success(getPublicacionSuccess)
            .error(errorCallBack);
        //Obtengo la lista de autorizaciones
        autorizacionRepository.getAll($scope.empleado.idEmpleado)
            .success(getAutorizacionSuccess)
            .error(errorCallBack);
        //Obtenfo la lista de eventos de agenda
        agendaRepository.getByEmpleado($scope.empleado.idEmpleado, new Date().format("yyyymmdd"))
            .success(getAgendaSuccess)
            .error(errorCallBack);
        //Obtenfo la lista de recordatorios
        recordatorioRepository.getByEmpleado($scope.empleado.idEmpleado)
            .success(getRecordatorioSuccess)
            .error(errorCallBack);
        //Obtenfo la lista de recordatorios
        bitacoraRepository.getByEmpleado($scope.empleado.idEmpleado)
            .success(getBitacoraSuccess)
            .error(errorCallBack);
        //Obtiene la lista de clientes para retrención
        contratoRepository.getRetencion()
            .success(getRetencionSuccess)
            .error(errorCallBack);
    }

    //Recarga root de panel
    $rootScope.RootReload =  function() {
        $scope.Reload();
    }

    //Success de publicación 
    var addPublicacionSuccess = function (data, status, headers, config) {
    	$('#btnPublicar').button('reset');
    	notificationFactory.success('Publicación guardada, folio: ' + data);
    	$scope.Reload();
    }

    $scope.Publicar = function () {
    	if($scope.newPublicacion.texto != null){
    		//Armo el objeto de publicacion
    		$scope.newPublicacion.idEmpleado = $scope.empleado.idEmpleado;
    		$scope.newPublicacion.idSucursal = 1;//$scope.empleado.idSucursal;
            $scope.newPublicacion.tipo = 1;//$scope.empleado.idSucursal;
            //Marco el boton
    		$('#btnPublicar').button('loading');
    		homeRepository.addPublicacion($scope.newPublicacion)
    			.success(addPublicacionSuccess)
                .error(errorCallBack);
    	}
    };

    $scope.Contactar = function(reten) {
        //Obtengo el cliente actual
        $scope.listadeClientes = localStorageService.get('listadeClientes');
        //Obtengo el cliente seleccionado
        $scope.cliente = Enumerable.From($scope.listadeClientes)
            .Where(function (x) { return x.idContrato == reten.idContrato })
            .OrderBy(function (x) { return x.idActa })
            .Select(function (x) { return x })
            .FirstOrDefault();

        localStorageService.set('clienteActual', $scope.cliente);
        location.href = "/";
    } 

});