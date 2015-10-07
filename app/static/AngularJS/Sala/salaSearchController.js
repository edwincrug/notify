registrationModule.controller("salaSearchController", function ($scope, $rootScope, salaRepository, localStorageService, notificationFactory) {

    //Propiedades

    //Funciones
    //Callback
    var getReservacionHoy1Success = function (data, status, headers, config) {
        $scope.listaReservacionesHoy1 = data
        $scope.lastUpdate = new Date().format("dd/mm/yy hh:MM");
    }

	var getReservacionHoy2Success = function (data, status, headers, config) {
        $scope.listaReservacionesHoy2 = data
        $scope.lastUpdate = new Date().format("dd/mm/yy hh:MM");
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema al obtener los datos.');
    }

 	//Ejecuta un paquete de funciones de inicio
    $scope.init = function () {
        //Establezco la fecha
        $scope.today();
        //Cargo el contenido de la pantalla 
        $scope.Reload();
        
        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        //Obtengo la lista de contactos
        $scope.listadeContactos = localStorageService.get('listadeContactos');
        $scope.listadeClientes = localStorageService.get('listadeClientes');

         var myRefresh = setInterval(function () { 
            //Establezco la fecha
            $scope.today();
            $scope.Reload();
        }, 180000);

    };

    //Actualiza el contenido de la página
    $scope.Reload = function() {
        //Obtengo la fecha
        var dateString = $scope.dt.format('yyyymmddHHMM');
        $scope.myPromise = salaRepository.getReservacionHoy(1, dateString)
            .success(getReservacionHoy1Success)
            .error(errorCallBack);
        
        $scope.myPromise = salaRepository.getReservacionHoy(2, dateString)
            .success(getReservacionHoy2Success)
            .error(errorCallBack);
    }

    //Recarga las reservaciones por fecha
    $scope.RecargaReservaciones = function(){
        $scope.Reload();
    }

    var getReservacionQuitarSuccess = function (data, status, headers, config) {
        notificationFactory.success('La reservación se ha eliminado con éxito.');
        $scope.init();
    }

    $scope.EliminarReservacion = function(sala){

    	if(confirm('¿Desea quitar esta reservación de la lista? El consumo no se eliminará.')){
    		$scope.myPromise = salaRepository.getReservacionQuitar(sala.idReservacion, $scope.empleado.idEmpleado)
			.success(getReservacionQuitarSuccess)
             .error(errorCallBack);
    	}
    };

    $scope.CancelarReservacion = function(sala){
        //Obtengo el cliente seleccionado
        $scope.cliente = Enumerable.From($scope.listadeClientes)
            .Where(function (x) { return x.idContrato == sala.idContrato })
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
        $scope.reenviarDestinatario = $scope.cliente.razonSocial;
        $scope.idCancelaReservacion = sala.idReservacion;
        $scope.motivoCancelaReservacion = '';
        $('#rescancel').modal('show');
    };

     //Success de cancelación
    var cancelarReservacionSuccess = function (data, status, headers, config) {
        if (data != null) {
            $('#btncancelarReservacion').button('reset');
            $('#rescancel').modal('hide');
            notificationFactory.success('La reservación se ha cancelado con éxito.');
            $scope.init();
        }
        else
            notificationFactory.error('Error al obtener los registros.');
    }

    //Evento al momento de cancelar
    $scope.CancelarReservacionFinal = function () {

        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Obtengo la referencia del botón y la bloqueo
            $('#btncancelarReservacion').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
              .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
              .OrderBy(function (x) { return x.idContacto })
              .Select(function (x) { return x })
              .ToArray();

            //Objeto de sala
            $scope.objetoSala = _Sala;
            $scope.objetoSala.sala = $scope.idCancelaReservacion;
            $scope.objetoSala.idEmpleado = $scope.empleado.idEmpleado;
            $scope.objetoSala.contactos = $scope.listaContactoTemp;
            $scope.objetoSala.titulo = $scope.motivoCancelaReservacion;
            //Cancelar reservacion
            $scope.objetoSala.sucursal = 1;
            //Envio la información al server con la maravilla de WEB API
            salaRepository.cancelaReservacion($scope.objetoSala)
              .success(cancelarReservacionSuccess)
              .error(errorCallBack);
        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
    }

    //Success de marcar vista
    var changeStage2Success = function (data, status, headers, config) {
        notificationFactory.success('Sala liberada.');
        $scope.Reload();
    }

    $scope.LiberarReservacion = function (sala) {
        if($scope.empleado.idEmpleado == 8 || $scope.empleado.idEmpleado == 1 ) {
            if(confirm('¿Desea liberar la sala?')){
                //Confirmamos el contenido de la sala
                salaRepository.changeStage(sala.idReservacion, 2)
                    .success(changeStage2Success)
                    .error(errorCallBack);     
            }
        }
        else
            notificationFactory.info('Debe pertenecer al departamento de cobranza para confirmar el pago.');
    }

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

    //DatePicker
    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1 || date.getDay() === 7));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date().addYears(-1);
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

});