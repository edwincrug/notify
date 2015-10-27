registrationModule.controller("notificacionController", function ($scope, $rootScope, localStorageService, alertFactory, notificacionRepository, aprobacionRepository) {

    //Propiedades
    $scope.oneAtATime = true;
    $scope.isSearching = false;
    //Variables de control de orden
    $scope.alphaOrder = false;
    $scope.tooltipAlphabeth = 'Ordenar Descencente';
    $scope.dateOrder = false;
    $scope.tooltipDate = 'Ordenar Descencente';
    //Variable de control de filtros
    $scope.filtrado = false; 

    //Grupo de funciones de inicio
    $scope.init = function () {
        $scope.actualizar = true;
        $rootScope.currentEmployee = getParameterByName('id');

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
            //if (data.length != inicial) {
                if($scope.actualizar)
                    $scope.listaNotificacion = data;  
            //}
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
       //  //Obtengo las notificaciones
       //  notificacionRepository.get($rootScope.currentEmployee)
       //      .success(getNSuccessCallback)
       //      .error(errorCallBack);

       // // Obtengo las aprobaciones
       //  aprobacionRepository.get($rootScope.currentEmployee)
       //          .success(getASuccessCallback)
       //          .error(errorCallBack);
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
        $scope.actualizar = !not.open;
        notificacionRepository.update(not.id)
          .error(errorCallBack);
        not.estado = 1;
    };

    /////////////////////////////////////////////////////////////////
    //Configuracion de Busquedas 
    /////////////////////////////////////////////////////////////////

    $scope.ViewSearch = function() {
        $scope.isSearching = !$scope.isSearching;
        $("#slideIzq").animate({
            width: "toggle"
        });
        if($scope.isSearching == false){
            $('#slideIzq').blur();
            $('#slideIzq').val('');
        }
    };

    $scope.TextSearch = function() {
        $scope.keySearch = $('#slideIzq').val();
    };

    /////////////////////////////////////////////////////////////////
    //Configuracion de Ordenamiento 
    /////////////////////////////////////////////////////////////////

    $scope.AlphaOrder = function() {
        //Administra el estado del botón
        $scope.alphaOrder = !$scope.alphaOrder;
        if($scope.alphaOrder == true){
            $scope.tooltipAlphabeth = 'Orden Descencente';
        }
        else{
            $scope.tooltipAlphabeth = 'Orden Ascendente';
        }

    }

    $scope.DateOrder = function() {
        //Administra el estado del botón
        $scope.dateOrder = !$scope.dateOrder;
        if($scope.dateOrder == true){
            $scope.tooltipDate = 'Orden Descencente';
        }
        else{
            $scope.tooltipDate = 'Orden Ascendente';
        }
    };

    /////////////////////////////////////////////////////////////////
    //Configuracion de Filtros 
    /////////////////////////////////////////////////////////////////

    $scope.ViewFiltro = function() {
        $('#modalFiltro').modal('show');
    };

    $scope.AplicarFiltro = function() {
        $scope.filtrado = true;
        $('#modalFiltro').modal('hide');
    };

    $scope.QuitarFiltro = function() {
        $scope.filtrado = false;
        $('#modalFiltro').modal('hide');
    };

});

