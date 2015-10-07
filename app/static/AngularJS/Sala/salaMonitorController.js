registrationModule.controller("salaMonitorController", function ($scope, $rootScope,localStorageService, salaRepository, notificationFactory) {

    //Propiedades
    $scope.isCollapsed = true;
    //Funciones
    //Asigno las reservaciones para AO
    var getReservacionMonitor1Success = function (data, status, headers, config) {
        $scope.listaReservacionesMonitor1 = data
        $scope.lastUpdate = new Date().format("dd/mm/yy hh:MM");
    }
    //Asigno las reservaciones para LUSA
    var getReservacionMonitor2Success = function (data, status, headers, config) {
        $scope.listaReservacionesMonitor2 = data
        $scope.lastUpdate = new Date().format("dd/mm/yy hh:MM");
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema al obtener los datos.');
    }

    //Cargo el contenido del monitor para ambas sucursales
    $scope.Reload = function () {
        $scope.myPromise = salaRepository.getReservacionMonitor(1)
        .success(getReservacionMonitor1Success)
        .error(errorCallBack);
        
        $scope.myPromise = salaRepository.getReservacionMonitor(2)
        .success(getReservacionMonitor2Success)
        .error(errorCallBack);
    }

    $scope.init = function () {
        //Cargo el contenido del monitor
        $scope.Reload();

        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        //Obtengo la lista de contactos
        $scope.listadeContactos = localStorageService.get('listadeContactos');
        $scope.listadeClientes = localStorageService.get('listadeClientes');

        var myRefresh = setInterval(function () { 
            $scope.Reload();
        }, 180000);
        
    };

    var cerrarSalaSuccess = function (data, status, headers, config) {
        $scope.isCollapsed = !$scope.isCollapsed;
        $('#btnCerrarSala').button('reset');
        $scope.Reload();
        notificationFactory.success('Sala cerrada correctamente.');
        location.reload();
    }

    //Valida si hay excedente
    $scope.TerminarCierre = function() {
        if($scope.cierreExcedente > 0){
            if(confirm('¿Desea cerrar la sala con un excedente de ' + $scope.cierreExcedente + ' hora(s)?')){
                TerminaCierreProceed();
            }
        }
        else{
            TerminaCierreProceed();
        }
    }
    //Finaliza el cierre de sala
    var TerminaCierreProceed = function() {
            //Variable para el manejo de la selección
            var destino = [];
            //Agregamos los elementos seleccionados a una lista
            angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
                destino.push(value.mail);
            });
            //Valido la selacción de contactos
            if (destino.length > 0) {
                //Bloqueo el boton
                $('#btnCerrarSala').button('loading');

                //Filtro los objetos de tipo contacto selecciondos
                $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
                .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
                .OrderBy(function (x) { return x.idContacto })
                .Select(function (x) { return x })
                .ToArray();
                //Lleno variables adicionales
                $scope.currentSala.contactos = $scope.listaContactoTemp;

                $scope.currentSala.desde = new Date().format('yyyymmddHHMM');
                $scope.currentSala.horas = $scope.cierreExcedente;

                salaRepository.terminarCierre($scope.currentSala)
                .success(cerrarSalaSuccess)
                .error(cerrarSalaSuccess);
            }
            else
                notificationFactory.error('Debe seleccionar un contacto.');
    }

    $scope.CerrarSala = function (sala) {
        if (sala.etapa == 3) {
            $scope.isCollapsed = !$scope.isCollapsed;
            $scope.currentSala = _Sala;
            if(!$scope.isCollapsed) {
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

                //Cargo la firma
                //Asigno el source al controller
                var tiempo = new Date().getTime();

                $('#firmaMonitor').attr('src', global_settings.urlSignature + tiempo.toString());

                $scope.cierreCliente = sala.cliente;
                $scope.cierreInicio = sala.desde;
                $scope.cierreFin = sala.hasta;
                $scope.cierreSalida = new Date().format('HH:MM:ss');
                var exc = 0.0;
                var entero = Math.trunc(((sala.transcurridos - sala.reservados) / 60) );
                exc = entero;
                if(((sala.transcurridos - sala.reservados) % 60) >= 15 && ((sala.transcurridos - sala.reservados) % 60) <= 44 ){
                    exc += 0.5;
                }
                if(((sala.transcurridos - sala.reservados) % 60) >= 45 && ((sala.transcurridos - sala.reservados) % 60) <= 59 ){
                    exc += + 1;
                }
                if(exc < 0){
                    exc = 0;
                }
                    
                $scope.cierreExcedente =  exc;
                //Asigno valores excedentes
                $scope.currentSala.contactos = $scope.listaContacto;
                $scope.currentSala.idEmpleado = $scope.empleado.idEmpleado;
                $scope.currentSala.idReservacion = sala.idReservacion;
                $scope.currentSala.idContrato = sala.idContrato;
                $scope.currentSala.sucursal = 2;
                $scope.currentSala.firma = tiempo.toString();
            }
        }
        else {
            notificationFactory.info('Debe marcar la entrada antes de cerrar la sala.');
        }
        
    }

    //Success extensión el horario de la sala
    var terminarExtenderSalaSuccess = function (data, status, headers, config) {
        $('#extendSala').modal('hide');
        $scope.Reload();
        notificationFactory.success('Sala extendida correctamente.');
    }

    //Procesar la extensión el horario de la sala
    $scope.TerminarExtender = function() {
        salaRepository.extenderSala($scope.extendSala.idReservacion, $scope.extendSala.idSala,new Date($scope.mydesde).format("yyyymmddHHMM"), new Date($scope.myhasta).format("yyyymmddHHMM"))
        .success(terminarExtenderSalaSuccess)
        .error(errorCallBack);
    }

    //Extender el horario de la sala
    $scope.Extender = function(sala){
        $('#extendSala').modal('show');
        $scope.extendSala = sala;
        $scope.mydesde = $scope.extendSala.desdeF;
        $scope.myhasta= $scope.extendSala.hastaF;
    }

    //Toggle de sala
    $scope.toggleSala = function ($event,id) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.extendSala.idSala = id;
        $scope.extendSala.sala = $event.target.innerText;
    };

    $scope.Cancelar = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    }
    //Success de marcar vista
    var changeStage2Success = function (data, status, headers, config) {
        $('.btnVista').button('reset');
        $scope.Reload();
    }

    $scope.MarcarVista = function (sala) {
        if(sala.tipo != 3) {
            $('.btnVista').button('loading');
            salaRepository.changeStage(sala.idReservacion, 2)
            .success(changeStage2Success)
            .error(errorCallBack);
        }
        else {
            if(sala.etapa > 1 && sala.tipo == 3){
                notificationFactory.success('Sala liberada, ahora puede marcar la entrada.');
            }
            else {
                notificationFactory.info('El departamento de cobranza debe confirmar el pago antes de marcar la reservacion como vista.');
            }
        }
    }

    $scope.ShowComment = function(sala) {
        $scope.comentarios = sala.comentarios;
        $('#viewComentarios').modal('show');
    }

    //Success de marcar entrada
    var changeStage2Success = function (data, status, headers, config) {
        $('.btnEntrada').button('reset');
        $scope.Reload();
    }

    $scope.MarcarEntrada = function (sala) {
        if(sala.etapa > 1) {
            $('.btnEntrada').button('loading');
            salaRepository.changeStage(sala.idReservacion, 3)
            .success(changeStage2Success)
            .error(errorCallBack);
        }
        else {
            notificationFactory.info('Debe marcar la sala como vista antes de iniciar.');
        }
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

    //COntroles de time picker

    $scope.hstep = 1;
    $scope.mstep = 30;

    $scope.ismeridian = false;
    

});