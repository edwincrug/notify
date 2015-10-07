registrationModule.controller("envioController", function ($scope, $rootScope, envioRepository, notificationFactory) {

    //Propiedades
    $scope.fechadesdeEnvio = new Date();
    $scope.fechahastaEnvio = new Date();

    //Funciones
    //Callback
    var getEntregadoSuccess = function (data, status) {
        notificationFactory.success('Datos cargardos');
        $rootScope.listaEnviosEntregados = data;
        $('#btnBuscarEnvio').button('reset');
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }

    //Funciones del controlador
    var GetEvento = function () {
        var desdeString = $scope.fechadesdeEnvio.format("yyyymmdd");
        var hastaString = $scope.fechahastaEnvio.format("yyyymmdd");
        $('#btnBuscarEnvio').button('loading');
        envioRepository.getEntregado($scope.cliente.idContrato, desdeString, hastaString)
          .success(getEntregadoSuccess)
          .error(errorCallBack);
    }

    //DatePicker
    $scope.today = function () {
        $scope.dt1 = new Date();
        $scope.dt2 = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1 || date.getDay() === 7));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date().addYears(-1);
    };
    $scope.toggleMin();

    $scope.open1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = true;
    };

    $scope.open2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened2 = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


    //Dropdown de opciones a selaccionar
    $scope.toggleSemana = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.labelDrop = 'Esta semana';
        $scope.fechadesdeEnvio = new Date().addDays(-7);
        $scope.fechahastaEnvio = new Date();
        GetEvento();
        //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    };
    $scope.toggleMes = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.labelDrop = 'Último mes';
        $scope.fechadesdeEnvio = new Date().addMonths(-1);
        $scope.fechahastaEnvio = new Date();
        GetEvento();
    };
    $scope.toggleHoy = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.fechadesdeEnvio = new Date();
        $scope.fechahastaEnvio = new Date();
        $scope.labelDrop = 'El día de hoy';
        GetEvento();
    };

    $scope.labelDrop = 'Esta semana';

    //Busca un conjunto de reservaciones
    $scope.Buscar = function () {
        $scope.fechadesdeEnvio = $scope.dt2;
        $scope.fechahastaEnvio = $scope.dt1;
        GetEvento();
    };

});