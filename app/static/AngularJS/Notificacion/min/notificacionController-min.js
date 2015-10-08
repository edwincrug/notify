registrationModule.controller("notificacionController", function ($scope, $rootScope, localStorageService, alertFactory, notificacionRepository, aprobacionRepository) {

    //Propiedades
    $scope.oneAtATime = true;

    //Grupo de funciones de inicio
    $scope.init = function () {

        $rootScope.currentEmployee = 'AN001';

        //Inicializamos la fecha 
        $scope.hora = new Date();
        //Inicializamos el reloj
        setInterval(function () {
            $scope.ReloadTime();
        }, 1000);
        //Recargamos la lista de notificaciones
        setInterval(function () {
            $rootScope.Reload();
        }, 1000);

        $('[data-toggle="tooltip"]').tooltip()
    };

    //Mensajes en caso de error
    var errorCallBack = function (data, status, headers, config) {
        alertFactory.error('Ocurrio un problema');
        $('#btnReject').button('reset');
        $('#btnApprove').button('reset');
    };

    //Success al obtener notificaciones
    var getNSuccessCallback = function (data, status, headers, config) {
        //Obtiene Notificaciones
        if ($scope.listaNotificacion != null) {
            var inicial = $scope.listaNotificacion.length;
            if (data.length != inicial) {
                $scope.listaNotificacion = data;  
            }
            if (data.length > inicial)
            {
                alertFactory.info((data.length - inicial).toString() + ' nuevas notificaciones.');
            }
        }
        else
            $scope.listaNotificacion = data;
        
    };

    //Success al obtener aprobaciones
    var getASuccessCallback = function (data, status, headers, config) {
        //Obtiene Notificaciones
        if ($scope.listaAprobacion != null) {
            var inicial = $scope.listaAprobacion.length;
            if (data.length != inicial) {
                $scope.listaAprobacion = data;
            }
        }
        else
            $scope.listaAprobacion = data;
    };

    //Consulto el servidor para buscar nuevas notificaciones
    $rootScope.Reload = function () {
        //Obtengo las notificaciones
        notificacionRepository.get($rootScope.currentEmployee)
            .success(getNSuccessCallback)
            .error(errorCallBack);

       // Obtengo las aprobaciones
        aprobacionRepository.get($rootScope.currentEmployee)
                .success(getASuccessCallback)
                .error(errorCallBack);
    }

    //Rercargo el reloj
    $scope.ReloadTime = function () {
        $scope.hora = new Date();
        $scope.$apply();
    };

    //////////////////////////////////////////////////////////////////
    //Funcionalidad de visto
    /////////////////////////////////////////////////////////////////
    $scope.Visto = function (not) {
        notificacionRepository.update(not.id)
          .error(errorCallBack);
        not.estado = 1;
    };



});

