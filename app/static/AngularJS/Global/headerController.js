registrationModule.controller("headerController", function ($scope, $rootScope, notificationFactory, servicioRepository, contactoRepository, clienteRepository, direccionRepository, localStorageService) {

    //Propiedades
    $scope.searchy = "";

    //Funciones CallBack
    $scope.Cleary = function () {
        $scope.searchy = "";
    }

    //Valida la ultima carga de información
    // var ValidaUltimaCarga = function () {
    //      //Validar si ya hemos descargado la información
    //     var ultima = localStorageService.get('ultimaCarga');
    //     //Dejamos cargar al controlador principal
    //     if(ultima == null){
    //         return;
    //     }
            
    //     var date = new Date();
    //     dateMsec = date.getTime();
    //     // Get the difference in milliseconds.
    //     var interval = dateMsec - ultima;
    //     //Validamos los datos de salida
    //     var flag = false;
    //     if(interval > global_settings.msecPerReload){
    //         flag = true;
    //     }

    //     return flag;
    // }

    //CallBacks
    //Funcioes de CallBack OnInit();
    var clienteSuccess = function (data, status) {
        $rootScope.listadeClientes = data;
        localStorageService.set('listadeClientes', $rootScope.listadeClientes);
        //Guardamos el registro de ultima carga
        //Actualizamos información de la ultima carga
        $scope.cargando = 0;
        $scope.ultimaCarga = 'Actualizado: ' + new Date().format('dd/mm/yy HH:MM');
        localStorageService.set('ultimaCarga', $scope.ultimaCarga);
        $('#reload').css('content', 'url(../images/nav/reload.png)');
        notificationFactory.info('Datos del sistema actualizados al: ' + new Date().format('dd/mm/yy HH:MM'));
    }

    var contactoSuccess = function (data, status) {
        $rootScope.listadeContactos = data;
        localStorageService.set('listadeContactos', $rootScope.listadeContactos);
    }

    var direccionSuccess = function (data, status) {
        $rootScope.listadeDirecciones = data;
        localStorageService.set('listadeDirecciones', $rootScope.listadeDirecciones);
    }
    var servicioSuccess = function (data, status) {
        $rootScope.listadeServicios = data;
        localStorageService.set('listadeServicios', $rootScope.listadeServicios);
    }

    var getProductosSuccess = function (data, status) {
        $rootScope.listaProductos = data;
        localStorageService.set('listaProductos', $rootScope.listaProductos);
    }
    
    var autocompleteClienteSuccess = function (data, status) {
        $rootScope.clientes = data;
        localStorageService.set('clientes', $rootScope.clientes);
    }

    var autocompleteContactoSuccess = function (data, status) {
        $rootScope.contactos = data;
        localStorageService.set('contactos', $rootScope.contactos);
    }

    //Autocomplete de productos
    var autocompleteServicioSuccess = function (data, status) {
        $rootScope.productosConsumo = data;
        localStorageService.set('productosConsumo', $rootScope.productosConsumo);

    }
   
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('No ha sido posible conectar con el servidor. Verifique su conexión a internet.');
    }

    //Recarga la información de los clientes
    var CargarDatosGenerales = function () {

        //Inicio modalidad Loading
            //Lista General de Datos
            //-------------------------------------------------
            //Obtengo la lista de productos para el search
            servicioRepository.getAutocomplete()
                .success(autocompleteServicioSuccess)
                .error(errorCallBack);

            //Objetos de autocomplete contactos
            contactoRepository.getAuto()
             .success(autocompleteContactoSuccess)
             .error(errorCallBack);

            //Objetos de autocomplete clientes
            clienteRepository.get(2)
               .success(autocompleteClienteSuccess)
               .error(errorCallBack);

            //Producto
            //Obtengo la lista de productos completa
            servicioRepository.getProductos()
                .success(getProductosSuccess)
                .error(errorCallBack);

            //Servicio
            servicioRepository.getServicios()
                .success(servicioSuccess)
                .error(errorCallBack);

            //Direcciones
            direccionRepository.get()
                .success(direccionSuccess)
                .error(errorCallBack);

            //Contacto
            contactoRepository.getAll()
                .success(contactoSuccess)
                .error(errorCallBack);

            //Clientes
            clienteRepository.get(1)
                .success(clienteSuccess)
                .error(errorCallBack);

    }

    //Ejecuta un paquete de funciones de inicio
    $scope.init = function () {

        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        $scope.cargando = 0;
        //Obtengo la última carga 
        $scope.ultimaCarga = localStorageService.get('ultimaCarga');

        var myRefresh = setInterval(function () { 
            $scope.Reload();
        }, 600000);

       // $('[data-toggle="tooltip"]').tooltip()
    };


    $scope.Reload = function () {
        if($scope.cargando == 0){
            //Marcamos el inicio de la carga
            $scope.cargando = 1;
            //Iniciamos la carga
            $('#reload').css('content', 'url(../images/gif/arrows.gif)');
            CargarDatosGenerales();
            $scope.ultimaCarga = 'Descargando información del servidor.';
        }
    };

});