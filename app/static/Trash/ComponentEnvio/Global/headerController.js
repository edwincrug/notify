envioModule.controller("headerController", function ($scope, $rootScope, notificationFactory) {

    //Propiedades
    $scope.searchy = "";


    //Funciones CallBack
    $scope.Cleary = function () {
        $scope.searchy = "";
    }

    //Valida la ultima carga de información
    var ValidaUltimaCarga = function () {
         //Validar si ya hemos descargado la información
        var ultima = localStorageService.get('ultimaCarga');
        //Dejamos cargar al controlador principal
        if(ultima == null){
            return;
        }
            
        var date = new Date();
        dateMsec = date.getTime();
        // Get the difference in milliseconds.
        var interval = dateMsec - ultima;
        //Validamos los datos de salida
        var flag = false;
        if(interval > global_settings.msecPerReload){
            flag = true;
        }

        return flag;
    }

    //CallBacks
    //Funcioes de CallBack OnInit();
    var clienteSuccess = function (data, status) {
        $scope.listadeClientes = data;
        localStorageService.set('listadeClientes', $scope.listadeClientes);
        //Guardamos el registro de ultima carga
        //Actualizamos información de la ultima carga
        var tempUltima = new Date();
        localStorageService.set('ultimaCarga', tempUltima.getTime());
        //Finaliza carga
        // $('#btnSingIn').button('reset');
    }

    var contactoSuccess = function (data, status) {
        $scope.listadeContactos = data;
        localStorageService.set('listadeContactos', $scope.listadeContactos);
    }

    var direccionSuccess = function (data, status) {
        $scope.listadeDirecciones = data;
        localStorageService.set('listadeDirecciones', $scope.listadeDirecciones);
    }
    var servicioSuccess = function (data, status) {
        $scope.listadeServicios = data;
        localStorageService.set('listadeServicios', $scope.listadeServicios);
    }

    var getProductosSuccess = function (data, status) {
        $scope.listaProductos = data;
        localStorageService.set('listaProductos', $scope.listaProductos);
    }
    
    var autocompleteClienteSuccess = function (data, status) {
        $scope.clientes = data;
        localStorageService.set('clientes', $scope.clientes);
    }

    var autocompleteContactoSuccess = function (data, status) {
        $scope.contactos = data;
        localStorageService.set('contactos', $scope.contactos);
    }

    //Autocomplete de productos
    var autocompleteServicioSuccess = function (data, status) {
        $scope.productosConsumo = data;
        localStorageService.set('productosConsumo', $scope.productosConsumo);

    }

    var getServicioEmptySuccess = function (data, status) {
        $scope.tempProducto = data;
        localStorageService.set('tempProducto', $scope.tempProducto);
    }
   
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('No ha sido posible conectar con el servidor. Verifique su conexión a internet.');
    }

    //Recarga la información de los clientes
    var CargarDatosGenerales = function () {

        //Inicio modalidad Loading


            //Lista General de Datos
            //-------------------------------------------------

            //Obtiene el objeto de producto
            servicioRepository.getServicioEmpty()
                .success(getServicioEmptySuccess)
                .error(errorCallBack);

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

        $('[data-toggle="tooltip"]').tooltip()

        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        // setInterval(function () {
        //     if(ValidaUltimaCarga()){
        //          ReloadGenerales();   
        //     }

        // }, 3000);

    };

    $scope.Reload = function () {
        $('#reload').css('content', 'url(../images/gif/arrows.gif)');
        setTimeout( function () {
            $('#reload').css('content', 'url(../images/nav/reload.png)');
        }, 30000);
    };

});