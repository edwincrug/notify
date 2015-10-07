registrationModule.controller("correoController", function ($scope, $rootScope, correoRepository, notificationFactory) {
    //Propiedades
    $scope.fechadesdeBuzon = new Date();
    $scope.fechahastaBuzon = new Date();
    

    //Funciones
    //Callback
    var getAllSuccess = function (data, status) {
        notificationFactory.success('Datos buzon cargados');
        $rootScope.listaBuzon = data;
        //Marco el botón para loading
        $('#btnBuscarBuzon').button('reset');
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }

    //Funciones del controlador
    var GetCorreos = function () {
        var desdeString = $scope.fechadesdeBuzon.format("yyyymmdd");
        var hastaString = $scope.fechahastaBuzon.format("yyyymmdd");
        //Marco el botón para loading
        $('#btnBuscarBuzon').button('loading');

        correoRepository.getAll($scope.cliente.idContrato, desdeString, hastaString)
          .success(getAllSuccess)
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
        $scope.fechadesdeBuzon = new Date().addDays(-7);
        $scope.fechahastaBuzon = new Date();
        GetCorreos();
        //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    };
    $scope.toggleMes = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.labelDrop = 'Último mes';
        $scope.fechadesdeBuzon = new Date().addMonths(-1);
        $scope.fechahastaBuzon = new Date();
        GetCorreos();
    };
    $scope.toggleHoy = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.fechadesdeBuzon = new Date();
        $scope.fechahastaBuzon = new Date();
        $scope.labelDrop = 'El día de hoy';
        GetCorreos();
    };

    $scope.labelDrop = 'Esta semana';

    $scope.Buscar = function () {
        $scope.fechadesdeBuzon = $scope.dt2;
        $scope.fechahastaBuzon = $scope.dt1;
        GetCorreos();
    };

   

});