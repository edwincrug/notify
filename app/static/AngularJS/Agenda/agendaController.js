registrationModule.controller("agendaController", function ($scope, $rootScope, agendaRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
    }

    $scope.MostrarCalendario = function() {
        $('#viewAgenda').modal('show');
    }

    //Success de addagenda
    var addAgendaSuccess = function (data, status, headers, config) {
        notificationFactory.success('Evento guardado correctamente.');
        $('#btnNewAgenda').button('reset');
        $('#viewAgenda').modal('hide');
        $rootScope.RootReload();
    }

    //Agrega nuevo evento en la agenda
    $scope.NewAgenda = function() {
        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        //Arreglo la fecha desde
        var dsd = new Date($scope.fechaAgenda.getFullYear(), $scope.fechaAgenda.getMonth(), $scope.fechaAgenda.getDate(), $scope.desdeAgenda.getHours(), $scope.desdeAgenda.getMinutes(), 0, 0);
        var hst = new Date($scope.fechaAgenda.getFullYear(), $scope.fechaAgenda.getMonth(), $scope.fechaAgenda.getDate(), $scope.hastaAgenda.getHours(), $scope.hastaAgenda.getMinutes(), 0, 0);
        //Oculto el botón
        $('#btnNewAgenda').button('loading');
        agendaRepository.add($scope.empleado.idEmpleado, dsd.format("yyyymmddHHMM"), hst.format("yyyymmddHHMM"), $scope.notaAgenda)
            .success(addAgendaSuccess)
            .error(errorCallBack);
    }

    var eliminaAgendaSuccess = function (data, status, headers, config) {
        notificationFactory.success('Evento eliminado correctamente.');
        $rootScope.RootReload();
    }

    //Elimina el evento de la agenda
    $scope.EliminarAgenda = function(age) {
        if(confirm('¿Desea eliminar este evento de la agenda?')){
            agendaRepository.eliminar(age.idAgenda)
                .success(eliminaAgendaSuccess)
                .error(errorCallBack);
        }
    }

    //COntroles de fecha

    //Controles de time picker
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.desdeAgenda = new Date();
    $scope.hastaAgenda = new Date();

    $scope.ismeridian = false;

    //DatePicker
    $scope.today = function () {
        $scope.fechaAgenda = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.fechaAgenda = null;
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