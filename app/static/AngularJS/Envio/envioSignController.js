registrationModule.controller("envioSignController", function ($scope, $rootScope, localStorageService, notificationFactory, envioRepository) {

    //Propiedades
    $scope.currentEnvio = _Envio;

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema al obtener los datos.');
    }

    $scope.init = function () {
        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        //Obtengo la lista de contactos
        $scope.listadeContactos = localStorageService.get('listadeContactos');
        $scope.listadeClientes = localStorageService.get('listadeClientes');

        //CArgamos el envío
        $scope.envio = localStorageService.get('envioEntrega');
        $scope.comentarios = '';

        //Obtengo el cliente seleccionado
        $scope.cliente = Enumerable.From($scope.listadeClientes)
                .Where(function (x) { return x.idContrato == $scope.envio.idContrato })
                .OrderBy(function (x) { return x.idActa })
                .Select(function (x) { return x })
                .FirstOrDefault();
        //Obtengo los contactos del cliente
        $scope.listaContacto = Enumerable.From($scope.listadeContactos)
                .Where(function (x) { return x.idActa == $scope.cliente.idActa })
                .OrderBy(function (x) { return x.idContacto })
                .Select(function (x) { return x })
                .ToArray();

        //Cargamos el grid de contactos
        CargaGridDestinatarios();

        //Cargo la firma
        //Asigno el source al controller
        var tiempo = new Date().getTime();

        $('#firmaMonitor').attr('src', global_settings.urlSignature + tiempo.toString());
        $scope.currentEnvio.lugar = tiempo.toString();

    };

    var finalizarEnvioSuccess = function (data, status, headers, config) {
        $scope.isCollapsed = !$scope.isCollapsed;
        $('#btnFinalizarEnvio').button('reset');
        notificationFactory.success('Envio entregado correctamente.');
        location.href = '/envioList';
    }

    $scope.FinalizarEntrega = function() {
        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Bloqueo el boton
            $('#btnFinalizarEnvio').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();

            //Lleno variables adicionales
            $scope.currentEnvio.contactos = $scope.listaContactoTemp;
            $scope.currentEnvio.idActa = $scope.envio.idEnvio;
            $scope.currentEnvio.idEmpleado = $scope.empleado.idEmpleado;
            $scope.currentEnvio.condiciones = $scope.comentarios;

            envioRepository.finalizaEnvio($scope.currentEnvio)
                .success(finalizarEnvioSuccess)
                .error(errorCallBack);
        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
    };

    $scope.Cancelar = function () {
        location.href = '/envioList';

    };

    //Lista de propiedades de clase
    //NG - GRID
    function Contacto() { }
    Contacto.prototype.name = '';
    Contacto.prototype.mail = '';

    $scope.myData = [];


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{ field: 'name', displayName: 'Nombre' }, { field: 'mail', displayName: 'Correo' }],
        selectedItems: [],
        keepLastSelected: false
    };

    var CargaGridDestinatarios = function () {
        //Limpio los elementos del grid
        $scope.myData = [];
        //Agrego los contactos del cliente seleccionado al grid
        angular.forEach($scope.listaContacto, function (value, key) {
            var cont = new Contacto();
            cont.name = value.nombre;
            cont.mail = value.mail;
            if (cont.mail != '')
                this.push(cont);
        }, $scope.myData);
    }

});



