registrationModule.controller("contratoController", function ($scope, $rootScope, localStorageService, clienteRepository, contratoRepository, notificationFactory) {
    
    //Propiedades
    $rootScope.newCliente = _Cliente;
    $scope.labelNewSucursal = 'Del Valle 1';
    $scope.labelNewTipo = 'Virtual';
    $scope.labelNewTipoPersona = 'Persona Física';


    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    //Muestra el modal del nuevo contrato
    $scope.NuevoContrato = function() {
        //establecemos los valores predeterminados
        $rootScope.newCliente.grupoEstadistico1 = 2; //Virtual
        $rootScope.newCliente.idSucursal = 1; //Del valle 1
        $rootScope.newCliente.idTipo = 1; //Tipo
        $rootScope.newCliente.RFC = ''; //RFC
        $rootScope.newCliente.nota = ''; //Nota

        //Muestro la ventana modal
        $('#newCliente').modal('show');
    }

    var autocompleteClienteSuccess = function (data, status) {
        notificationFactory.info('Agregando el cliente a las búsquedas.');
        localStorageService.set('clientes', data);
        $scope.clientes = localStorageService.get('clientes');
    }

    var clienteReloadSuccess = function (data, status) {
        notificationFactory.success('Cliente agregado correctamente');
        $scope.listaTempdeClientes = data;
        localStorageService.set('listadeClientes', data);
        //Finaliza carga
        //Filtramos el cliente de la lista
        $scope.cliente = Enumerable.From($scope.listaTempdeClientes)
        .Where(function (x) { return x.idActa == $scope.idActaNew })
        .OrderBy(function (x) { return x.idActa })
        .Select(function (x) { return x })
        .FirstOrDefault();
        $rootScope.cliente = $scope.cliente;
        localStorageService.set('clienteActual', $rootScope.cliente);
        $('#btnNuevoContrato').button('reset');
        $('#newCliente').modal('hide');
        location.href = '/home';
    }

    //Success de agregar contrato
    var addContratoSuccess = function (data, status, headers, config) {
        notificationFactory.info('El número de folio del nuevo cliente es: ' + data);
        $scope.idActaNew = data;
        notificationFactory.info('Configurando nuevo cliente en el sistema (Esto puede tardar varios minutos)...');
        //Cargo la lista completa de clientes
        clienteRepository.getFull()
            .success(clienteReloadSuccess)
            .error(errorCallBack);

        //Objetos de autocomplete clientes
        clienteRepository.getAutocomplete()
            .success(autocompleteClienteSuccess)
            .error(errorCallBack);

    }

    //GuardaNuevoContrato
    $scope.GuardaNuevoContrato = function() {
        notificationFactory.info('Agregando al nuevo cliente...');
        $('#btnNuevoContrato').button('loading');
        //Llamo a la función de guardar
        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;
        $rootScope.newCliente.idEmpleado = $scope.empleado.idEmpleado;

        contratoRepository.add($rootScope.newCliente)
                .success(addContratoSuccess)
                .error(errorCallBack);

    }

    //Nuevo cliente set sucursal
    $scope.SetNewSucursal = function (valor, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopennewsucursal = !$scope.status.isopennewsucursal;
        $rootScope.newCliente.idSucursal = valor;
        $scope.labelNewSucursal = $event.target.innerText;
    }
    //New Cliente set Tipo
    $scope.SetNewTipo = function (valor, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopennewtipo = !$scope.status.isopennewtipo;
        $rootScope.newCliente.grupoEstadistico1 = valor;
        $scope.labelNewTipo = $event.target.innerText;
    }

    //New Cliente set Tipo Presona
    $scope.SetNewTipoPersona = function (valor, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenNewTipoPersona = !$scope.status.isopenNewTipoPersona;
        $rootScope.newCliente.idTipo = valor;
        $scope.labelNewTipoPersona = $event.target.innerText;
    }

    //Emite nuevo contrato
    $scope.MostrarContrato = function() {
        //Emite el PDF
        $('#newPDF').modal('show');
    }

    var getPDFSuccess = function (data, status, headers, config) {
        $('#btnEmitirContrato').button('reset');
        window.open(global_settings.urlReportContrato + data.replace(/"/g, ''), "RptWindow", "width=1024, height=768");
    }
    //Emite nuevo contrato
    $scope.EmitirContrato = function() {
        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;
        //Obtengo el cliente actualç
        $scope.cliente = localStorageService.get('clienteActual');
        //Emite el PDF
        if($scope.PDFRepresentanteLegal != null){
            $('#btnEmitirContrato').button('loading');
            contratoRepository.getPDF($scope.empleado.idEmpleado, $scope.cliente.idContrato, $scope.PDFRepresentanteLegal, $scope.cliente.idActa)
                .success(getPDFSuccess)
                .error(errorCallBack);
        }
        else{
            notificationFactory.error('Debe establecer el nombre del representante legal.');
        }
    }

    //Muestra un contrato
    $scope.VerContrato = function () {
        var URL = global_settings.urlReportContrato + $scope.cliente.idActa + '.pdf';
        if(UrlExists(URL)){
            $scope.cliente = localStorageService.get('clienteActual');
            window.open(URL, "RptWindow", "width=1024, height=768");
        }
        else{
            notificationFactory.error('No existe contrato para este cliente.');
        }
    }

    //DatePicker
    $scope.today = function () {
        $rootScope.newCliente.fechaInicio = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $rootScope.newCliente.fechaInicio = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1 || date.getDay() === 7));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date().addYears(-1);
    };
    $scope.toggleMin();

    $scope.openNew = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedNew = true;
    };
    
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


});