registrationModule.controller("consumoController", function ($scope, $rootScope, localStorageService, consumoRepository, notificationFactory) {

    //Propiedades
    $scope.fechadesdeConsumo = new Date();
    $scope.fechahastaConsumo = new Date();

    //Funciones
    //Callback
    getConsumosListaSuccess = function (data, status, headers, config) {
        $rootScope.consumoLista = data;
        notificationFactory.success('Consumos Cargados');
        $('#btnBuscarConsumo').button('reset');
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }

    //Funciones del controlador
    var GetConsumo = function () {
        //Obtengo al clioente actual
        $rootScope.cliente = localStorageService.get('clienteActual');
        $scope.cliente = $rootScope.cliente

        var desdeString = $scope.fechadesdeConsumo.format("yyyymmdd");
        var hastaString = $scope.fechahastaConsumo.format("yyyymmdd");
        $('#btnBuscarConsumo').button('loading');
        consumoRepository.getConsumo($scope.cliente.idContrato, desdeString, hastaString)
            .success(getConsumosListaSuccess)
            .error(errorCallBack);
    }

    //Success de reporte
   var consumoReporteSuccess = function(data, status, headers, config) {
        notificationFactory.success('Reporte generado.');
        $('#btnConsumoExportar').button('reset');
        window.open(global_settings.urlReportConsumos + data.replace(/"/g, ''), "RptWindow", "width=1024, height=768");
    };

   //Reporte de consumos
   $scope.ReporteConsumos = function() {
        //Obtengo al clioente actual
        $rootScope.cliente = localStorageService.get('clienteActual');
        $scope.cliente = $rootScope.cliente
        //Tomo los valores de la pantalla
        var desdeString = $scope.fechadesdeConsumo.format("yyyymmdd");
        var hastaString = $scope.fechahastaConsumo.format("yyyymmdd");
        $('#btnConsumoExportar').button('loading');
        consumoRepository.getReporte($scope.cliente.idContrato, desdeString, hastaString, $scope.cliente.idActa + ' | ' + $scope.cliente.razonSocial)
                .success(consumoReporteSuccess)
                .error(errorCallBack);
   }

    //DatePicker
    $scope.today = function () {
        $scope.dt1 = new Date();
        $scope.dt2 = new Date();
        $rootScope.fechaConsumo = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
        $rootScope.fechaConsumo = null;
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

    $rootScope.openConsumo = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $rootScope.openedConsumo = true;
    };
    

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.fechadesdeConsumo = new Date().addDays(-7);
    $scope.fechahastaConsumo = new Date();

    //Dropdown de opciones a seleccionar
    $scope.toggleSemana = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.labelDrop = 'Esta semana';
        $scope.fechadesdeConsumo = new Date().addDays(-7);
        $scope.fechahastaConsumo = new Date();
        GetConsumo();
        //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    };
    $scope.toggleMes = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.labelDrop = 'Último mes';
        $scope.fechadesdeConsumo = new Date().addMonths(-1);
        $scope.fechahastaConsumo = new Date();
        GetConsumo();
    };
    $scope.toggleHoy = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.fechadesdeConsumo = new Date();
        $scope.fechahastaConsumo = new Date();
        $scope.labelDrop = 'El día de hoy';
        GetConsumo();
    };

    $scope.labelDrop = 'Esta semana';

    //Busca un conjunto de reservaciones
    $scope.Buscar = function () {
        $scope.fechadesdeConsumo = $scope.dt2;
        $scope.fechahastaConsumo = $scope.dt1;
        GetConsumo();
    };

});