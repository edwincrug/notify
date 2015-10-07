registrationModule.controller("correspondenciaController", function ($scope, $rootScope, correspondenciaRepository, notificationFactory) {
    //Propiedades
    $scope.fechadesdeCorrespondencia = new Date();
    $scope.fechahastaCorrespondencia = new Date();


    //Funciones
    //Callback
    var getEntregadaSuccess = function (data, status) {
        notificationFactory.success('Datos cargardos');
        $rootScope.listaCorrespondenciaEntregada = data;
        $('#btnBuscarAlmacen').button('reset');
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }

    //Funciones del controlador
    var GetEntregada = function () {
        var desdeString = $scope.fechadesdeCorrespondencia.format("yyyymmdd");
        var hastaString = $scope.fechahastaCorrespondencia.format("yyyymmdd");
        $('#btnBuscarAlmacen').button('loading');
        correspondenciaRepository.getEntregada($scope.cliente.idContrato, desdeString, hastaString)
          .success(getEntregadaSuccess)
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
        $scope.fechadesdeCorrespondencia = new Date().addDays(-7);
        $scope.fechahastaCorrespondencia = new Date();
        GetEntregada();
        //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    };
    $scope.toggleMes = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.labelDrop = 'Último mes';
        $scope.fechadesdeCorrespondencia = new Date().addMonths(-1);
        $scope.fechahastaCorrespondencia = new Date();
        GetEntregada();
    };
    $scope.toggleHoy = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.fechadesdeCorrespondencia = new Date();
        $scope.fechahastaCorrespondencia = new Date();
        $scope.labelDrop = 'El día de hoy';
        GetEntregada();
    };

    $scope.labelDrop = 'Seleccione Una Opción';

    $scope.Buscar = function () {
        $scope.fechadesdeCorrespondencia = $scope.dt2;
        $scope.fechahastaCorrespondencia = $scope.dt1;
        GetEntregada();
    };

    $scope.Entregar = function () {
        //Construyo un ID único
        var myID = new date();
        $scope.idFirma = myDate.getFullYear() + '' + myDate.getMonth() + '' + myID.myDate.getDate() + '' + myDate.getHours() + '' + myDate.getMinutes() + '' + myDate.getSeconds();
        //Armo la URL
        var url = 'http:/173.192.85.206:555/signature' + $scope.idFirma;
        //La muestro
        alert(url);
        $('#firma').attr('src', url);
    };
});