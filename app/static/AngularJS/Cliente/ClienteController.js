registrationModule.controller("clienteController", function ($scope, $rootScope, localStorageService, notificationFactory, loginRepository, facturaRepository, contratoRepository, clienteRepository, contactoRepository, direccionRepository, servicioRepository, correoRepository, correspondenciaRepository, envioRepository, consumoRepository, oficinaRepository, LERepository, salaRepository) {

    //Propiedades
    //Lista de propiedades de clase
    $scope.semilla = "";
    $scope.semillaServicio = "";
    // $scope.clientes = dataRepository.objetos;
    $scope.base = true;
    //$scope.empleado = dataRepository.empleado;
    $scope.info = "";
    //Selector de tipo para Correspondencia
    $scope.radioCorrespondenciaModel = null;


    //Funcioes de CallBack OnInit();
    var clienteSuccess = function (data, status) {
        notificationFactory.info('Clientes cargados');
        localStorageService.set('listadeClientes', data);
        //Finaliza carga
        $('#btnSingIn').show();
        $('#btnSingIn').button('reset');
        $('#dynamic').remove();
        $('#login').trigger('click');
        AsignaValoresGuardados();
    }

    var contactoSuccess = function (data, status) {
        notificationFactory.info('Contactos cargados');
        localStorageService.set('listadeContactos', data);
    }

    var direccionSuccess = function (data, status) {
        notificationFactory.info('Direcciones cargadas');
        localStorageService.set('listadeDirecciones', data);
    }
    var servicioSuccess = function (data, status) {
        notificationFactory.info('Servicios cargados');
        localStorageService.set('listadeServicios', data);
    }

    var getProductosSuccess = function (data, status) {
        notificationFactory.info('Productos cargados');
        localStorageService.set('listaProductos', data);
    }
    
    var autocompleteClienteSuccess = function (data, status) {
        notificationFactory.info('Lista de clientes cargada');
        localStorageService.set('clientes', data);
    }

    var autocompleteContactoSuccess = function (data, status) {
        notificationFactory.info('Lista de contactos cargada');
        localStorageService.set('contactos', data);
    }

    //Autocomplete de productos
    var autocompleteServicioSuccess = function (data, status) {
        notificationFactory.info('Lista de productos cargada');
        localStorageService.set('productosConsumo', data);
    }

    var getServicioEmptySuccess = function (data, status) {
        localStorageService.set('tempProducto', data);
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }

    var CargarDatosGenerales = function () {

            //Objetos de autocomplete clientes
            clienteRepository.getAutocomplete()
            .success(autocompleteClienteSuccess)
            .error(errorCallBack);

            //Objetos de autocomplete contactos
            contactoRepository.getAuto()
            .success(autocompleteContactoSuccess)
            .error(errorCallBack);

            //Obtengo la lista de productos para el search
            servicioRepository.getAutocomplete()
            .success(autocompleteServicioSuccess)
            .error(errorCallBack);

            //Contacto
            contactoRepository.getAll()
            .success(contactoSuccess)
            .error(errorCallBack);
            //Direcciones
            direccionRepository.get()
            .success(direccionSuccess)
            .error(errorCallBack);
            //Servicio
            servicioRepository.getServicios()
            .success(servicioSuccess)
            .error(errorCallBack);

            //Producto
            //Obtengo la lista de productos completa
            servicioRepository.getProductos()
            .success(getProductosSuccess)
            .error(errorCallBack);

            //Clientes
            clienteRepository.getFull()
            .success(clienteSuccess)
            .error(errorCallBack);

            //Obtiene el objeto de correoLlamada
            correoRepository.get(0)
            .success(correoSuccess)
            .error(errorCallBack);

            //Obtiene el objeto de correspondenciaRecibida
            correspondenciaRepository.getR(0)
            .success(correspondenciaRSuccess)
            .error(errorCallBack);

            //Obtiene el objeto de correspondenciaEntregada
            correspondenciaRepository.getE(0)
            .success(correspondenciaESuccess)
            .error(errorCallBack);

            //Obtiene el objeto de producto
            servicioRepository.getServicioEmpty()
            .success(getServicioEmptySuccess)
            .error(errorCallBack);

            //Actualizamos información de la ultima carga
            var tempUltima = new Date();
            localStorageService.set('ultimaCarga', tempUltima);

    }

    var ValidaUltimaCarga = function () {
         //Validar si ya hemos descargado la información
         var ultima = localStorageService.get('ultimaCarga');
         var flag= false;
         if(ultima){
            flag = true;
        }
        return flag;
    }

///////////////////////////////////////////////////////////////////////////
//Autenticación
///////////////////////////////////////////////////////////////////////////

$scope.usuario = "";
$scope.password = "";


    //Funciones CallBack
    var loginSuccess = function (data, status) {
        notificationFactory.info('Bienvenido ' + data.nombre + ' ' + data.apellidoPaterno + ' No has iniciado sesión el los últimos días. esatmos actualizando la información.');
        $rootScope.empleado = data;
        //Guardar el login del usuario para la función remember me
        localStorageService.set('employeeLogged', $rootScope.empleado);

        //Muestra imagen de carga
        var img = $('<img id="dynamic" />');
        img.attr('src', 'Images/gif/loading.gif');
        img.appendTo('#imageDiv');
        $('#btnSingIn').hide();

        //Obtiene la información de clientes
        if(!localStorageService.get('employeeLogged') || !ValidaUltimaCarga()){
            CargarDatosGenerales();
        }
    }

    //Funciones
    $scope.Iniciar = function () {
        if($scope.usuario != "" && $scope.password != ""){
            $('#btnSingIn').button('loading');
            loginRepository.get($scope.usuario, $scope.password)
            .success(loginSuccess)
            .error(errorCallBack);
        }
        else
            notificationFactory.error("Introduzca un usuario y/o password.");
        /* location.href='/cobranza';*/
    }
    //---------------------------------------------------------------------------------
    var AsignaValoresGuardados = function (){

        //Obtenemos los datos del empleado logueado
        $rootScope.empleado = localStorageService.get('employeeLogged');
        $scope.empleado = $rootScope.empleado;

        $rootScope.listadeClientes = localStorageService.get('listadeClientes');
        $rootScope.listadeContactos = localStorageService.get('listadeContactos');
        $rootScope.listadeDirecciones = localStorageService.get('listadeDirecciones');
        $rootScope.listadeServicios = localStorageService.get('listadeServicios');
        $rootScope.listaProductos = localStorageService.get('listaProductos');
        $rootScope.clientes = localStorageService.get('clientes');
        $("#searchEmpresa").autocomplete({
            source: $rootScope.clientes,
        });
        $rootScope.contactos = localStorageService.get('contactos');
        $("#search").autocomplete({
            source: $rootScope.contactos,
        });
        $rootScope.productosConsumo = localStorageService.get('productosConsumo');
        $scope.tempProducto = localStorageService.get('tempProducto');

        $scope.cliente = localStorageService.get('clienteActual');
        if ($scope.cliente){
            $scope.idCliente = $scope.cliente.idActa;
        }
        
        $scope.correoLlamadaTemplate = localStorageService.get('correoLlamadaTemplate');
        $scope.correoLlamada = localStorageService.get('correoLlamada');

        $scope.correspondenciaRecibidaTemplate = localStorageService.get('correspondenciaRecibidaTemplate');
        $scope.correspondenciaRecibida = localStorageService.get('correspondenciaRecibida');

        $scope.correspondenciaEntregadaTemplate = localStorageService.get('correspondenciaEntregadaTemplate');
        $scope.correspondenciaEntregada = localStorageService.get('correspondenciaEntregada');
    }

    //Ejecuta un paquete de funciones de inicio
    $scope.init = function () {
        //Habilito todos los tooltips del sitio
        $('[data-toggle="tooltip"]').tooltip();
        //PopOver de cuenta web
        $('#web').popover({
            html : true, 
            content: function() {
                return $('#popOverCuentaWeb').html();
            }
        });
        //Habilito los PopOver
        // $('[data-toggle="popover"]').popover();
        $("#btnLlamadas").popover({
            html : true, 
            content: function() {
                return $('#popoverExampleTwoHiddenContent').html();
            },
            title: function() {
                return $('#popoverExampleTwoHiddenTitle').html();
            }
        });


        //Habilito el formato de moneda en todas las casillas
        

        //Asigna los eventos de autocomplete
        $('#searchEmpresa').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            Buscar(ui.item.value);
        }).change();
        //Busca el servicio seleccionado
        $('#tServicio').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            BuscarServicio(ui.item.value);
        }).change();
        //Busca el servicio seleccionado para nuevos consumos
        $('#tConsumo').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            BuscarServicio(ui.item.value);
        }).change();
        $('#search').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            Buscar(ui.item.value);
        }).change();


        if(!localStorageService.get('employeeLogged') || !ValidaUltimaCarga()){
            $('#btnSingIn').show();
            $('#logon').trigger('click');
        }
        else{
            AsignaValoresGuardados();
            Cargar();
        }

    };

    //Limpia la caja de Búsqueda
    $scope.Clear = function () {
        $scope.semilla = "";
    }

    function Cargar() {
        if (!$rootScope.listadeClientes){
            AsignaValoresGuardados();
        }
        //Filtramos el cliente de la lista
        $scope.cliente = Enumerable.From($rootScope.listadeClientes)
        .Where(function (x) { return x.idActa == $scope.idCliente })
        .OrderBy(function (x) { return x.idActa })
        .Select(function (x) { return x })
        .FirstOrDefault();

        $rootScope.cliente = $scope.cliente;
        localStorageService.set('clienteActual', $rootScope.cliente);

        //Filtramos la lista de servicios de la base
        $scope.listaServicio = Enumerable.From($rootScope.listadeServicios)
        .Where(function (x) { return x.idActa == $scope.cliente.idActa })
        .OrderBy(function (x) { return x.idContratoPlan })
        .Select(function (x) { return x })
        .ToArray();

        //Filtramos la lista de servicios de la base
        $scope.listaContacto = Enumerable.From($rootScope.listadeContactos)
        .Where(function (x) { return x.idActa == $scope.cliente.idActa })
        .OrderBy(function (x) { return x.idContacto })
        .Select(function (x) { return x })
        .ToArray();
        localStorageService.set('listaContacto', $scope.listaContacto);

        //Filtramos la lista de servicios de la base
        $scope.listaDireccion = Enumerable.From($rootScope.listadeDirecciones)
        .Where(function (x) { return x.idActa == $scope.cliente.idActa })
        .OrderBy(function (x) { return x.idDireccion })
        .Select(function (x) { return x })
        .ToArray();
        //mostramos ventana modal si el cliente se encuentra cancelado.
        if ($scope.cliente.idEstatusContrato == 2)
            $('#cancelCustomer').modal('show');
    }

    //buscar a un cliente en específico
    function Buscar(a) {
        $scope.idCliente = mySplit(a, 0, '|');
        $('#searchEmpresa').val('');
        $('#search').val('');
        Cargar();
        //Aplicamos los cambios al controlador
        $scope.$apply();
    }

    //Busca un producto dentro de la lista de acuerdo al autocomplete
    var BuscarServicio = function (value) {
        var numero = mySplit(value, 0, '|');
        $scope.producto = Enumerable.From($rootScope.listaProductos)
        .Where(function (x) { return x.idProducto == numero })
        .OrderBy(function (x) { return x.idProducto })
        .Select(function (x) { return x })
        .FirstOrDefault();
        $scope.tempProducto.precio = $scope.producto.pesos;
        $scope.tempProducto.idProducto = $scope.producto.idProducto;
        $scope.tempProducto.descripcion = $scope.producto.descripcion;
        $scope.tempProducto.cantidad = 1;

        //Aplicamos los cambios al controlador
        $scope.$apply();
        $('.currencii').formatCurrency();
    }

    //Funciones ANGULAR
    $scope.Mensaje = function () {
        //Establezco el contacto actual
        notificationFactory.success('Hola');
    }

    //Mensaje

    //Informacion de contactos
    $scope.AbrirTarjeta = function (current) {
        //Establezco el contacto actual
        $scope.contacto = current;
        //Muestro la tarjeta de contacto
        $('#cardContact').modal('show');
    }

    //Acción no permitida
    $scope.AccionNoPermitida = function () {
        notificationFactory.error('No cuenta con el servicio.');
    }

    //Botonera de funciones rápidas

    //Funciones de CallBack CorreoLlamada
    //correoRepository.js
    var correoSuccess = function (data, status) {
        $scope.correoLlamadaTemplate = data;
        $scope.correoLlamada = $scope.correoLlamadaTemplate;
        localStorageService.set('correoLlamadaTemplate', $scope.correoLlamadaTemplate);
        localStorageService.set('correoLlamada', $scope.correoLlamada);
    }
    var correoPutSuccess = function (data, status, headers, config) {
        if (data > 0) {
            notificationFactory.success('Mensaje Enviado');
            //Limpio el objeto de mensaje
            $scope.correoLlamada = $scope.correoLlamadaTemplate;
            //Limpiamos la selección ANGULAR SUCKS!
            angular.forEach($scope.myData, function (data, index) {
                $scope.gridOptions.selectItem(index, false);
            });
            //reestablezco los botones
            $('#btnCorreoLlamada').button('reset');
            $('#btnCorreoGeneral').button('reset');

            //Limpio la ventana modal
            $scope.correoLlamada.mensaje = '';
            $scope.correoLlamada.telefonoContacto = '';
            $scope.correoLlamada.correoContacto = '';
            $scope.correoLlamada.nombreContacto = '';

            //Limpio los checkbox
            $('.checkContacto input:radio').removeAttr('checked');
            $('.checkTelefono input:radio').removeAttr('checked');
            $('.checkCorreo input:radio').removeAttr('checked');
            $('.checkMail input:checkbox').removeAttr('checked');

            //Oculto la ventana modal
            $('#fastMessage').modal('hide');
            $('#generalMessage').modal('hide');
        }
        else {
            notificationFactory.error('Algo va mal. Verifique su conexión.');
        }
    }

    var correoGetAllSuccess = function (data, status) {
        if (data != null) {
            $rootScope.listaBuzon = data;
            notificationFactory.success('Mensajes cargados.');
        }
        else
            notificationFactory.error('Error al obtener los registros.');

    }

    //Correo General
    $scope.MostrarCorreoGeneral = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
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

            //Muestro la ventana modal
            $('#generalMessage').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Enviar eMail de llamada
    $scope.EnviarCorreoGeneral = function () {
        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Obtengo la referencia del botón y la bloqueo
            $('#btnCorreoGeneral').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();
            //Lleno variables adicionales
            $scope.correoLlamada.contactos = $scope.listaContactoTemp;
            $scope.correoLlamada.idContrato = $scope.cliente.idContrato;
            $scope.correoLlamada.idEmpleado = $scope.empleado.idEmpleado;

            //Envio la información al server con la maravilla de WEB API
            correoRepository.add($scope.correoLlamada)
                .success(correoPutSuccess)
                .error(errorCallBack);
            $scope.cliente.correo = $scope.cliente.correo + 1;
        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
    }

    //Correo LLamada
    $scope.MostrarCorreoLlamada = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
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

            //Muestro la ventana modal
            $('#fastMessage').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Enviar eMail de llamada
    $scope.EnviarCorreoLlamada = function () {
        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Obtengo la referencia del botón y la bloqueo
            $('#btnCorreoLlamada').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();
            //Lleno variables adicionales
            $scope.correoLlamada.contactos = $scope.listaContactoTemp;
            $scope.correoLlamada.idContrato = $scope.cliente.idContrato;
            $scope.correoLlamada.idEmpleado = $scope.empleado.idEmpleado;

            if ($('.checkContacto input:radio:checked').val() != null)
                $scope.correoLlamada.opcionNombre = $('.checkContacto input:radio:checked').val();
            if ($('.checkMail input:checkbox:checked').val() != null)
                $scope.correoLlamada.opcionMensaje = $('.checkMail input:checkbox:checked').val();
            if ($('.checkTelefono input:radio:checked').val() != null)
                $scope.correoLlamada.opcionTelefono = $('.checkTelefono input:radio:checked').val();
            if ($('.checkCorreo input:radio:checked').val() != null)
                $scope.correoLlamada.opcionCorreo = $('.checkCorreo input:radio:checked').val();

            //Envio la información al server con la maravilla de WEB API
            correoRepository.put($scope.correoLlamada)
                .success(correoPutSuccess)
                .error(errorCallBack);
            $scope.cliente.correo = $scope.cliente.correo + 1;
        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
    }

    //Muestra el buxon de correo
    $scope.AdminBuzon = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            //Llamo a los objetos del buzón
            var desde = new Date().addDays(-7).format("yyyymmdd");
            var hasta = new Date().format("yyyymmdd");
            //Limpio la lista
            $rootScope.listaBuzon = null;

            correoRepository.getAll($scope.cliente.idContrato, desde, hasta)
            .success(correoGetAllSuccess)
            .error(errorCallBack);

            $('#viewBuzon').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Ver mensaje
    $scope.VerMensaje = function(mensaje) {
        $('#viewMensaje').modal('show');
        $('#mensajeContent').html(mensaje.cuerpo);
    }

    //Reenviar mensaje
    $scope.ReenviarMensaje = function (correo) {
        $('#viewBuzon').modal('hide');
        CargaGridDestinatarios();
        $scope.reenviarDestinatario = $scope.cliente.razonSocial;
        $scope.reenviarID = correo.idCorreo;
        $('#reesend').modal('show');

    }

    var correoReesendSuccess = function (data, status, headers, config) {
        if (data > 0) {
            notificationFactory.success('Mensaje re-enviado');
            //Limpio el objeto de mensaje
            $scope.correoLlamada = $scope.correoLlamadaTemplate;
            //Limpiamos la selección ANGULAR SUCKS!
            angular.forEach($scope.myData, function (data, index) {
                $scope.gridOptions.selectItem(index, false);
            });
            //reestablezco los botones
            $('#btnReesend').button('reset');

            //Oculto la ventana modal
            $('#reesend').modal('hide');
        }
        else {
            notificationFactory.error('Algo va mal. Verifique su conexión.');
        }
    }

    $scope.ReenviarMensajeFinal = function (idcorreo) {
        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Obtengo la referencia del botón y la bloqueo
            $('#btnReesend').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();
            //Lleno variables adicionales
            $scope.correoLlamada.contactos = $scope.listaContactoTemp;
            $scope.correoLlamada.idContrato = $scope.reenviarID;
            $scope.correoLlamada.idEmpleado = '999';


            //Envio la información al server con la maravilla de WEB API
            correoRepository.put($scope.correoLlamada)
            .success(correoReesendSuccess)
            .error(errorCallBack);
            $scope.cliente.correo = $scope.cliente.correo + 1;
        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
        
    }

    ///Correspondencia
    //Correspondencia
    //Funciones success
    var correspondenciaRSuccess = function (data, status) {
        $scope.correspondenciaRecibidaTemplate = data;
        $scope.correspondenciaRecibida = $scope.correspondenciaRecibidaTemplate;
        localStorageService.set('correspondenciaRecibidaTemplate', $scope.correspondenciaRecibidaTemplate);
        localStorageService.set('correspondenciaRecibida', $scope.correspondenciaRecibida);
    }

    var correspondenciaESuccess = function (data, status) {
        $scope.correspondenciaEntregadaTemplate = data;
        $scope.correspondenciaEntregada = $scope.correspondenciaEntregadaTemplate;
        localStorageService.set('correspondenciaEntregadaTemplate', $scope.correspondenciaEntregadaTemplate);
        localStorageService.set('correspondenciaEntregada', $scope.correspondenciaEntregada);
    }
    var correspondenciaPutSuccess = function (data, status, headers, config) {
        if (data > 0) {
            notificationFactory.success('Correspondencia Notificada');
            //Limpio el objeto de mensaje
            $scope.correspondenciaRecibida = $scope.correspondenciaRecibidaTemplate;
            //Limpiamos la selección ANGULAR SUCKS!
            angular.forEach($scope.myData, function (data, index) {
                $scope.gridOptions.selectItem(index, false);
            });
            //Reestablezco el boton
            $('#btnEnviarCorrespondencia').button('reset');

            //Oculto la ventana modal
            $('#newCorrespondencia').modal('hide');
        }
        else {
            notificationFactory.error('Algo va mal. Verifique su conexión.');
        }
    }
    var correspondenciaGetRecibidaSuccess = function (data, status, headers, config) {
        if (data != null) {
            $rootScope.listaCorrespondenciaRecibida = data;
            notificationFactory.success('Correspondencia recibida cargada.');
        }
        else {
            notificationFactory.error('Error al obtener los registros.');
        }
    }
    var correspondenciaGetEntregadaSuccess = function (data, status, headers, config) {
        if (data != null) {
            $rootScope.listaCorrespondenciaEntregada = data;
            notificationFactory.success('Correspondencia entregada cargada.');
        }
        else {
            notificationFactory.error('Error al obtener los registros.');
        }
    }

    //Confirmación de entrega de correspondencia
    var correspondenciaPostSuccess =  function (data, status, headers, config) {
        if (data > 0) {
            notificationFactory.success('Correspondencia Entregada');
            //Limpio el objeto de mensaje
            $scope.correspondenciaEntregada = $scope.correspondenciaEntregadaTemplate;
            //Limpiamos la selección de contactos ANGULAR SUCKS!
            angular.forEach($scope.myData, function (data, index) {
                $scope.gridOptions.selectItem(index, false);
            });
             //Limpiamos la selección de materiales ANGULAR SUCKS!
            angular.forEach($scope.myAlmacen, function (data, index) {
                $scope.gridAlmacen.selectItem(index, false);
            });
            //Reestablezco el boton
            $('#btnEntregarCorrespondencia').button('reset');

            //Oculto la ventana modal
            $('#entCorrespondencia').modal('hide');
        }
        else {
            notificationFactory.error('Ocurrio un error al guardar.');
        }

    }

    //Muestra la entrega de correspondencia
    $scope.ShowEntregarCorrespondencia = function (corres) {
        $scope.correspondenciaActual = corres;
        $scope.correspondenciaEntregada.idCorrespondencia = $scope.correspondenciaActual.idCorrespondencia;
        //$scope.correspondenciaEntregada.material = $scope.correspondenciaActual.material;
        $scope.correspondenciaEntregada.idContrato = $scope.correspondenciaActual.idContrato;
        $scope.correspondenciaEntregada.idEmpleado = $scope.empleado.idEmpleado;
        //Oculto la modal
        $('#viewCorrespondencia').modal('hide');
        
        //Cargo el grid de destinatarios
        CargaGridDestinatarios();
        //Cargo el grid de correspondencia
         //Limpio los elementos del grid
        $scope.myAlmacen = [];
        //Agrego los contactos del cliente seleccionado al grid
        angular.forEach($scope.listaCorrespondenciaRecibida, function (value, key) {
            var mat = new Material();
            mat.id = value.idCorrespondencia;
            mat.fecha = value.fechaRecibida;
            mat.tipo = value.tipo;
            mat.material = value.material;
            mat.almacenamiento = value.almacenamiento;
            if(value.tipo == $scope.correspondenciaActual.tipo)
                this.push(mat);
        }, $scope.myAlmacen);

        $scope.correspondenciaEntregada.recibe = '';
        $scope.correspondenciaEntregada.comentarios = '';
        //Asigno el source al controller
        var tiempo = new Date().getTime();
        $scope.correspondenciaEntregada.firma = tiempo.toString();

        $('#firmaCorrespondencia').attr('src', global_settings.urlSignature + tiempo.toString());

        $('#entCorrespondencia').modal('show');
    };

    //Entrega una correspondencia
    $scope.EntregarCorrespondencia = function (corres) {

        //Manejo de contactos seleccionados
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });

        //Manejo de materiales de almacén seleccionados
        var mater = '';
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridAlmacen.selectedItems, function (value, key) {
            mater += value.id + ',';
        });

        //Valido la selacción de contactos
        if (destino.length > 0 && mater.length > 0) {
            //Bloqueo el boton
            $('#btnEntregarCorrespondencia').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();
            //Lleno variables adicionales
            $scope.correspondenciaEntregada.contactos = $scope.listaContactoTemp;
            //Lista de materiales a entregar
            $scope.correspondenciaEntregada.material = mater;
            //Envio la información al server con la maravilla de WEB API
            correspondenciaRepository.add($scope.correspondenciaEntregada)
            .success(correspondenciaPostSuccess)
            .error(errorCallBack);
            //Aumentamos el globo
            $scope.cliente.correspondencia = $scope.cliente.correspondencia - 1;
        }
        else
            notificationFactory.error('Debe seleccionar un contacto y/o material.');
    };

    ///Funciones generales
    $scope.MostrarCorrespondencia = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            //Ocultamos la ventana de correspondencia si se está mostrando
             $('#viewCorrespondencia').modal('hide');
            //CArgo los elementos del grid
            CargaGridDestinatarios();
            //limpio los campos
            $scope.correspondenciaRecibida.material = '';
            $scope.correspondenciaRecibida.almacenamiento = '';
            $scope.correspondenciaRecibida.observaciones = '';
            //Inicializo la propiedad
            $scope.radioCorrespondenciaModel = 'Correspondencia';
            
            //cargamos la información de correspondencia recibida
            //Llamo a los objetos de correspondencia
            var desde = new Date().format("yyyymmdd");
            var hasta = new Date().format("yyyymmdd");

            correspondenciaRepository.getRecibida($scope.cliente.idContrato, desde, hasta)
            .success(correspondenciaGetRecibidaSuccess)
            .error(errorCallBack);

            //Muestro la ventana modal
            $('#newCorrespondencia').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    // //Decide tipo de Correspondencia entregoEMPE
    // var DecideTipoCorrespondencia = function () {
    //     if($scope.radioCorrespondenciaModel == 'EMPE'){
    //         $('#entregoEMPE').show();
    //     }
    //     else{
    //         $('#entregoEMPE').hide();
    //     }
    // }

    //Success
    var correspondenciaCancelarSuccess =  function (data, status, headers, config) {
        var desde = new Date().format("yyyymmdd");
        var hasta = new Date().format("yyyymmdd");

        correspondenciaRepository.getRecibida($scope.cliente.idContrato, desde, hasta)
            .success(correspondenciaGetRecibidaSuccess)
            .error(errorCallBack);

        notificationFactory.success('El paquete se ha eliminado con éxito del almacén.');
    }

    //Elimina la correspondencia recibida
    $scope.CancelarCorrespondencia = function (corres) {
        if(confirm('¿Desea eliminar el registro de correspondencia para este cliente?')){
            correspondenciaRepository.cancelar(corres.idCorrespondencia, $scope.empleado.idEmpleado)
            .success(correspondenciaCancelarSuccess)
            .error(errorCallBack);
        }
    }

    //Validacion de Entrega de correspondencia
    var ValidaEnviarCorrespondencia = function (destinatarios) {
        //Variable de control
        var output = true;

        if(destinatarios < 1){
            notificationFactory.error('Debe seleccionar un contacto.');
            output = false; 
        }

        if(!$scope.radioCorrespondenciaModel){
            notificationFactory.error('Debe elegir el tipo de objeto recibido: Corrrespondencia ó EMPE.');
            output = false;
        }

        if(!$scope.correspondenciaRecibida.material.length > 0){
            notificationFactory.error('Debe capturar el material recibido.');
            output = false;
        }

        if(!$scope.correspondenciaRecibida.almacenamiento.length > 0){
            notificationFactory.error('Debe capturar el lugar de almacenamiento.');
            output = false;
        }

        return output;
    }

    //Envia un objeto de corresspondencia
    $scope.EnviarCorrespondencia = function () {
        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (ValidaEnviarCorrespondencia(destino.length)) {
            //Bloqueo el boton
            $('#btnEnviarCorrespondencia').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();
            //Lleno variables adicionales
            $scope.correspondenciaRecibida.contactos = $scope.listaContactoTemp;
            $scope.correspondenciaRecibida.idContrato = $scope.cliente.idContrato;
            $scope.correspondenciaRecibida.idEmpleado = $scope.empleado.idEmpleado;

            if($scope.radioCorrespondenciaModel == 'Correspondencia')
                $scope.correspondenciaRecibida.tipo = 1
            else
                $scope.correspondenciaRecibida.tipo = 2   

            //Envio la información al server con la maravilla de WEB API
            correspondenciaRepository.put($scope.correspondenciaRecibida)
            .success(correspondenciaPutSuccess)
            .error(errorCallBack);
            //Aumentamos el globo
            $scope.cliente.correspondencia = $scope.cliente.correspondencia + 1;
        }



    };
    
    //Muestra el buxon de correspondencia
    $scope.AdminCorrespondencia = function () {
        if ($scope.cliente != null && $scope.cliente != '') {

            //Administro el tabPanel
            $('#myTabCorrrespondencia a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })

            //Llamo a los objetos de correspondencia
            var desde = new Date().format("yyyymmdd");
            var hasta = new Date().format("yyyymmdd");
            //Limpio las listas
            $rootScope.listaCorrespondenciaRecibida = null;
            $rootScope.listaCorrespondenciaEntregada = null;

            correspondenciaRepository.getRecibida($scope.cliente.idContrato, desde, hasta)
            .success(correspondenciaGetRecibidaSuccess)
            .error(errorCallBack);

            correspondenciaRepository.getEntregada($scope.cliente.idContrato, desde, hasta)
            .success(correspondenciaGetEntregadaSuccess)
            .error(errorCallBack);

            $('#viewCorrespondencia').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }


    //Reservaciones - Salas
    //Funciones de Callback
    //Obtiene las reservaciones pendientes
    var salaGetReservacionSuccess = function (data, status, headers, config) {
        if (data != null) {
            $rootScope.listaReservacion = data;
            notificationFactory.success('Reservaciones cargadas.');
        }
        else
            notificationFactory.error('Error al obtener los registros.');
    }
    //Obtiene los eventos cerrados
    var salaGetEventoSuccess = function (data, status, headers, config) {
        if (data != null) {
            $rootScope.listaEvento = data;
            notificationFactory.success('Eventos cargados.');
        }
        else
            notificationFactory.error('Error al obtener los registros.');
    }


    //Funciones
    //Abre la ventana de reservar en el portal del cliente
    $scope.Reservar = function () {
        location.href = '/salaMain';
    }

    //Cancelar Reservación
    $scope.CancelarReservacion = function (reservacion) {
        $('#showSala').modal('hide');
        CargaGridDestinatarios();
        $scope.reenviarDestinatario = $scope.cliente.razonSocial;
        $scope.idCancelaReservacion = reservacion.idReservacion;
        $scope.motivoCancelaReservacion = '';
        $('#rescancel').modal('show');

    }

    //Success de cancelación
    var cancelarReservacionSuccess = function (data, status, headers, config) {
        if (data != null) {
            $('#btncancelarReservacion').button('reset');
            $('#rescancel').modal('hide');
            notificationFactory.success('La reservación se ha cancelado con éxito.');
        }
        else
            notificationFactory.error('Error al obtener los registros.');
    }

    //Evento al momento de cancelar
    $scope.CancelarReservacionFinal = function () {

        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Obtengo la referencia del botón y la bloqueo
            $('#btncancelarReservacion').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();

            //Objeto de sala
            $scope.objetoSala = _Sala;
            $scope.objetoSala.sala = $scope.idCancelaReservacion;
            $scope.objetoSala.idEmpleado = $scope.empleado.idEmpleado;
            $scope.objetoSala.contactos = $scope.listaContactoTemp;
            $scope.objetoSala.titulo = $scope.motivoCancelaReservacion;
            //Cancelar reservacion
            $scope.objetoSala.sucursal = 1;
            //Envio la información al server con la maravilla de WEB API
            salaRepository.cancelaReservacion($scope.objetoSala)
            .success(cancelarReservacionSuccess)
            .error(errorCallBack);

        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
    }

    //Administración de salas
    $scope.AdminSala = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            $('#myTabSala a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            })
            //Limpio las variables
            $rootScope.listaReservacion = null;
            $rootScope.listaEvento = null;

            //Obtengo las fechas
            var desde = new Date().addDays(-7).format("yyyymmdd");
            var hasta = new Date().format("yyyymmdd");

            //Obtengo las reservaciones pendientes
            salaRepository.getReservacion($scope.cliente.idContrato)
            .success(salaGetReservacionSuccess)
            .error(errorCallBack);

            salaRepository.getEvento($scope.cliente.idContrato, desde, hasta)
            .success(salaGetEventoSuccess)
            .error(errorCallBack);

            $('#showSala').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }


    //Envios
    //Administración de envios
    /////////////////////////////////////////////////////////////
    //Success de envios recibidos
    var envioGetRecibidoSuccess = function (data, status, headers, config) {
        if (data != null) {
            $rootScope.listaEnviosRecibidos = data;
            notificationFactory.success('Envios recibidos cargados.');
        }
        else {
            notificationFactory.error('Error al obtener los registros.');
        }
    }

    //Success de envios entregados
    var envioGetEntregadoSuccess = function (data, status, headers, config) {
        if (data != null) {
            $rootScope.listaEnviosEntregados = data;
            notificationFactory.success('Envios entregados cargados.');
        }
        else {
            notificationFactory.error('Error al obtener los registros.');
        }
    }

    $scope.AdminEnvio = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            $('#myTabEnvio a').click(function (e) {
                e.preventDefault()
                $(this).tab('show')
            });
            

            //Llamo a los objetos de correspondencia
            var desde = new Date().addDays(-7).format("yyyymmdd");
            var hasta = new Date().format("yyyymmdd");
            //Limpio las listas
            $rootScope.listaEnviosRecibidos = null;

            envioRepository.getRecibido($scope.cliente.idContrato)
                .success(envioGetRecibidoSuccess)
                .error(errorCallBack);

            envioRepository.getEntregado($scope.cliente.idContrato, desde, hasta)
                .success(envioGetEntregadoSuccess)
                .error(errorCallBack);

            $('#showEnvio').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Nuevo envío
    $scope.NuevoEnvio = function () {
        location.href = '/envioMain';
    };

    //Success de cancelación de envío
    var envioCancelarSuccess = function (data, status, headers, config) {
        $rootScope.listaEnviosRecibidos = null;
        $rootScope.listaEnviosEntregados = null;
        envioRepository.getRecibido($scope.cliente.idContrato)
            .success(envioGetRecibidoSuccess)
            .error(errorCallBack);
        notificationFactory.success('Envio eliminado correctamente');
    }

    //Procesar acncelación de envío
    $scope.CancelarEnvio = function (env) {
        if(confirm('¿Desea cancelar este envío?')){
            envioRepository.cancelar(env.idEnvio, $scope.empleado.idEmpleado)
                .success(envioCancelarSuccess)
                .error(errorCallBack);
        }
    };


    //Consumos
    /////////////////////////////////////////////////////////////
    $scope.AltaConsumo = function () {
       //Oculto la ventana de consulta
       $('#viewConsumo').modal('hide');
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
       //Asigno los vaklores al autocomplete
       $("#tConsumo").autocomplete({
         source: $rootScope.productosConsumo
     });
        //Limpio las variables
        $scope.tempProducto.idProducto = 0;
        $scope.tempProducto.descripcion = '';
        $scope.tempProducto.cantidad = 0;
        $scope.tempProducto.precio = 0;
       //Configuro la firma
       var tiempo = new Date().getTime();
       $scope.tempProducto.firma = tiempo.toString();

       $('#firmaConsumo').attr('src', global_settings.urlSignature + tiempo.toString());

       $('#newConsumo').modal('show');
       $("#tConsumo").autocomplete("option", "appendTo", ".eventInsForm2");

       //$(".addresspicker").autocomplete("option", "appendTo", ".eventInsForm");

   };

   //Success de cancelar consumo
   var consumoCancelarSuccess = function(data, status, headers, config) {
        notificationFactory.success('Consumo cancelado.');
        //Obtengo las fechas
        var desde = new Date().addDays(-7).format("yyyymmdd");
        var hasta = new Date().format("yyyymmdd");
        //Obtengo los consumos 
        consumoRepository.getConsumo($scope.cliente.idContrato, desde, hasta)
            .success(getConsumoListaSuccess)
            .error(errorCallBack);
   }

   //Cancela un consumo
   $scope.CancelarConsumo = function(con){
        if(confirm('¿Desea eliminar este consumo?')){
            consumoRepository.cancelar(con.idConsumo)
                .success(consumoCancelarSuccess)
                .error(errorCallBack);

        }
   }
    //Funciones success de Consumos
    //-----------------------------------------------
    var consumoAddSuccess = function (data, status, headers, config) {
        if (data != null) {
            $('#btnGuardarConsumo').button('reset');
            $('#newConsumo').modal('hide');
            notificationFactory.success('Consumo Guardado');
        }
        else
            notificationFactory.error('Error al guardar el consumo.');
    };

    //Guarda un consumo en el sistema para el cliente seleccionado
    $scope.GuardarConsumo = function (){
        //Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (destino.length > 0) {
            //Bloqueo el boton
            $('#btnGuardarConsumo').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.listaContactoTemp = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();
            //Lleno variables adicionales
            $scope.tempProducto.contactos = $scope.listaContactoTemp;
            $scope.tempProducto.idContrato = $scope.cliente.idContrato;
            $scope.tempProducto.idEmpleado = $scope.empleado.idEmpleado;
            $scope.tempProducto.precio = $scope.producto.pesos;

            //Envio la información al server con la maravilla de WEB API
            consumoRepository.add($scope.tempProducto)
                .success(consumoAddSuccess)
                .error(errorCallBack);
            //Aumentamos el globo
            $scope.cliente.consumos = $scope.cliente.consumos + 1;
        }
        else
            notificationFactory.error('Debe seleccionar un contacto.');
    };
    
    //Limpia la busqueda de consumos
    $scope.ClearConsumo = function () {
        $('#tConsumo').val('');
    };

    $scope.AjustaPrecio = function () {
        $scope.tempProducto.precio = $scope.tempProducto.cantidad * $scope.producto.pesos;
    };

    //Callback de consumos
    getConsumoListaSuccess = function (data, status, headers, config) {
        notificationFactory.success('Consumos Cargados');
        $rootScope.consumoLista = data;
    } 

    //Administración de consumos
    $scope.AdminConsumo = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            $('#viewConsumo').modal('show');
            //Obtengo las fechas
            var desde = new Date().addDays(-7).format("yyyymmdd");
            var hasta = new Date().format("yyyymmdd");

            $rootScope.consumoLista = null;

            //Obtengo los consumos 
            consumoRepository.getConsumo($scope.cliente.idContrato, desde, hasta)
            .success(getConsumoListaSuccess)
            .error(errorCallBack);
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    };

    //Administración de información general del cliente
    /////////////////////////////////////////////////////////////
    $scope.AdminGeneral = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            //Precargo los datos del cliente
            $scope.clienteTipoPersona = $scope.cliente.idTipoFiscal;
            $scope.labelClienteTipoPersona = $scope.cliente.tipoFiscal;
            //Muestro la ventana modal
            $('#viewGeneral').modal('show');
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Obtengo la lista de servicios y cargo los datos.
    var generalFinalSuccess = function (data, status, headers, config) {

        $rootScope.listadeClientes = data;
        localStorageService.set('listadeClientes', $rootScope.listadeClientes);

        //Filtramos el cliente de la lista
        $scope.cliente = Enumerable.From($rootScope.listadeClientes)
        .Where(function (x) { return x.idActa == $scope.idCliente })
        .OrderBy(function (x) { return x.idActa })
        .Select(function (x) { return x })
        .FirstOrDefault();

        $('#btnGuardaGeneral').button('reset');
        $('#viewGeneral').modal('hide');
        notificationFactory.success('Datos actualizados.');
    }

    //Completed de Servicio Agregado
    var updGeneralSuccess = function (data, status, headers, config) {
        if (isNumber(data)) {
            $scope.myPromise = clienteRepository.getFull()
            .success(generalFinalSuccess)
            .error(errorCallBack);

        }
        else
            notificationFactory.error('Error interno al guardar: ' + data);
    }

    //Actualiza la info General
    $scope.GuardaGeneral = function () {
        $('#btnGuardaGeneral').button('loading');
        //Asigno los valores
        $scope.cliente.idTipoFiscal = $scope.clienteTipoPersona;
        $scope.cliente.tipoFiscal = $scope.labelClienteTipoPersona;
        //Invoco al mètodo de actualización
        clienteRepository.update($scope.cliente)
        .success(updGeneralSuccess)
        .error(errorCallBack);
    }

    //DropDown Tipo de Persona
    $scope.SetClienteTipoPersona = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenClienteTipoPersona = !$scope.status.isopenClienteTipoPersona;
        $scope.clienteTipoPersona = valor;
        $scope.labelClienteTipoPersona = name;
    }

    //Administraciòn de servicios contratados
    /////////////////////////////////////////////////////////////

    $scope.AdminServicios = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            $("#tServicio").autocomplete({
                source: $rootScope.productosConsumo
            });
            //Asigno los valores default al objeto principal
            $scope.tempProducto.idContrato = $scope.cliente.idContrato;
            $scope.tempProducto.idProducto = 0;
            $scope.tempProducto.descripcion = '';
            $scope.tempProducto.cantidad = 0;
            $scope.tempProducto.precio = 0;
            //Muestro la ventana modal
            $('#viewServicios').modal('show');
            //Configuraciòn para mostrar la ventana modal
            $("#tServicio").autocomplete("option", "appendTo", ".eventInsForm");
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Confirma la eliminación de un servicio
    var deleteServicioSuccess = function (data, status, headers, config) {
        if (isNumber(data)) {
            servicioRepository.getServicios()
            .success(servicioFinalSuccess)
            .error(errorCallBack);
        }
        else
            notificationFactory.error('Error interno al guardar: ' + data);
    }

    //Elimina un servicio de un cliente
    $scope.EliminarServicio = function (id) {
        if (confirm('¿Desea eliminar este servicio de contrato?')) {
            servicioRepository.delete(id)
            .success(deleteServicioSuccess)
            .error(errorCallBack);
        }
    } 

    //Limpia la búsqueda de Servicios
    $scope.ClearServicio = function () {
        $scope.semillaServicio = '';
    }

    //Obtengo la lista de servicios y cargo los datos.
    var servicioFinalSuccess = function (data, status, headers, config) {
        localStorageService.set('listadeServicios', data);
        $rootScope.listadeServicios = localStorageService.get('listadeServicios');;
        //Filtramos la lista de servicios de la base
        $scope.listaServicio = Enumerable.From($rootScope.listadeServicios)
        .Where(function (x) { return x.idActa == $scope.cliente.idActa })
        .OrderBy(function (x) { return x.idContratoPlan })
        .Select(function (x) { return x })
        .ToArray();
        $('#btnAgregaServicio').button('reset');
        notificationFactory.success('Datos actualizados.');
    }

    //Completed de Servicio Agregado
    var addServicioSuccess = function (data, status, headers, config) {
        if (isNumber(data)) {
            servicioRepository.getServicios()
                .success(servicioFinalSuccess)
                .error(errorCallBack);
        }
        else
            notificationFactory.error('Error interno al guardar: ' + data);
    }

    //Agrega un nuevo Servicio
    $scope.AgregaServicio = function () {
        $('#btnAgregaServicio').button('loading');
        servicioRepository.add($scope.tempProducto)
            .success(addServicioSuccess)
            .error(errorCallBack);
    }


    //Administración de contactos del contrato
    ///////////////////////////////////////////////////////////////////////

    //Carga completada de objeto direccion
    var contactoEmptySuccess = function (data, status, headers, config) {
        //Asigno nuevo Objeto
        $scope.tempContacto = data;
        $scope.labelContactoTipo = 'Seleccione una opción';
        $('#btnActualizaContacto').hide();
        $('#viewContactos').modal('show');
    }

    //Muestra la ventana de edición
    $scope.AdminContactos = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            //Obtiene un objeto vacío de tipo dirección
            contactoRepository.getEmpty()
            .success(contactoEmptySuccess)
            .error(errorCallBack);
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Carga Contacto
    $scope.CargaContacto = function (idcontacto) {
        //Filtramos la lista de servicios de la base
        $scope.tempContacto = Enumerable.From($rootScope.listadeContactos)
        .Where(function (x) { return x.idContacto == idcontacto })
        .OrderBy(function (x) { return x.idContacto })
        .Select(function (x) { return x })
        .FirstOrDefault();

        $scope.contactoTipo = $scope.tempContacto.idTipo;
        $scope.labelContactoTipo = $scope.tempContacto.tipo;
        $('#btnActualizaContacto').show();
        //$('#btnAgregaContacto').hide();
    }

    //Complete de Contacto Update
    var contactoActualizaSuccess = function (data, status, headers, config) {
        $('#btnActualizaContacto').button('reset');
        if (isNumber(data)) {
            //Cargo nuevamente los datos
            $('#btnActualizaContacto').button('loading');
            contactoRepository.getEmpty()
            .success(contactoEmptySuccess)
            .error(errorCallBack);
            contactoRepository.getAll()
            .success(contactoAllSuccess)
            .error(errorCallBack);
            notificationFactory.success('Contacto actualizado.');
            $('#btnActualizaContacto').hide();
            $('#btnAgregaContacto').show();
        }
        else
            notificationFactory.error('Error interno al actualizar el contacto: ' + data);
    }

    //Actualiza una dirección
    $scope.ActualizaContacto = function (idcontacto) {
        $('#btnActualizaContacto').button('loading');
        $scope.tempContacto.idTipo = $scope.contactoTipo;
        contactoRepository.update($scope.tempContacto)
        .success(contactoActualizaSuccess)
        .error(errorCallBack);
    }

    //Agregar contacto success
    var contactoAgregaSuccess = function (data, status, headers, config) {
        $('#btnAgregaContacto').button('reset');
        if (isNumber(data)) {
            //Cargo nuevamente los datos
            //Deshabilitado temporalmente
            $('#btnAgregaContacto').button('loading');
            contactoRepository.getEmpty()
            .success(contactoEmptySuccess)
            .error(errorCallBack);
            contactoRepository.getAll()
            .success(contactoAllSuccess)
            .error(errorCallBack);
            notificationFactory.success('Contacto agregado.');
        }
        else
            notificationFactory.error('Error interno al actualizar el contacto: ' + data);
    }

    //Validaciones para alta de contacto
    var ValidaAgregaContacto = function () {
        var returnValidate = true;
        if($scope.contactoTipo == null){
            returnValidate = false;
            notificationFactory.error('Debe elegir el tipo de contacto.');
        }
        if($scope.tempContacto.nombre == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer el nombre del contacto.');
        }
        if($scope.tempContacto.apellidoPaterno == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer el Apellido Paterno del contacto.');
        }
        if($scope.tempContacto.apellidoMaterno == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer el Apellido Materno del contacto.');
        }
        if($scope.tempContacto.mail == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer el mail del contacto.');
        }
        //Devuelvo el resultado de la validación
        return returnValidate;
    }

    //Agrega una nuevo contacto
    $scope.AgregaContacto = function (iddireccion) {
        if(ValidaAgregaContacto()){
            $('#btnAgregaContacto').button('loading');
            $scope.tempContacto.idActa = $scope.cliente.idActa;
            $scope.tempContacto.idTipo = $scope.contactoTipo;
            contactoRepository.add($scope.tempContacto)
                .success(contactoAgregaSuccess)
                .error(errorCallBack);
        }
    }

    //Complete de Direccion cargando datos
    var contactoAllSuccess = function (data, status, headers, config) {
        $('#btnActualizaContacto').button('reset');
        $('#btnAgregaContacto').button('reset');
        $rootScope.listadeContactos = data;
        localStorageService.set('listadeContactos', $rootScope.listadeContactos);
        Cargar();
    }

    //Complete de Delete dirección
    var contactoDeleteSuccess = function (data, status, headers, config) {
        if (isNumber(data)) {
            //Cargo nuevamente los datos
            contactoRepository.getAll()
            .success(contactoAllSuccess)
            .error(errorCallBack);
            notificationFactory.success('Contacto eliminado.');
        }
        else
            notificationFactory.error('Error interno al eliminar el contacto: ' + data);
    }

    //Elimina direccion del contrato
    $scope.EliminarContacto = function (idcontacto) {
        if (confirm('¿Desea actualizar los datos del cliente? (Esta acción será notificada al supervisor)')) {
            $('#btnActualizaContacto').button('loading');
            contactoRepository.delete(idcontacto)
            .success(contactoDeleteSuccess)
            .error(errorCallBack);
        }
    }

    //DropDown Tipo de Contacto
    $scope.SetContactoTipo = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopencontactotipo = !$scope.status.isopencontactotipo;
        $scope.contactoTipo = valor;
        $scope.labelContactoTipo = name;
    }


    //Administración de direcciones del contrato
    /////////////////////////////////////////////////////////////////

    //Carga completada de objeto direccion
    var direccionEmptySuccess = function (data, status, headers, config) {
        //Asigno nuevo Objeto
        $scope.tempDireccion = data;
        $scope.labelDireccionTipo = 'Seleccione una opción';
        $scope.labelDireccionEstado = 'Seleccione una opción';
        $('#btnActualizaDireccion').hide();
        $('#viewDirecciones').modal('show');
    }

    //Muestra la ventana de edición
    $scope.AdminDirecciones = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            //Obtiene un objeto vacío de tipo dirección
            direccionRepository.getEmpty()
            .success(direccionEmptySuccess)
            .error(errorCallBack);
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Carga Dirección
    $scope.CargaDireccion = function (iddireccion) {
        //Filtramos la lista de servicios de la base
        $scope.tempDireccion = Enumerable.From($rootScope.listadeDirecciones)
        .Where(function (x) { return x.idDireccion == iddireccion })
        .OrderBy(function (x) { return x.idDireccion })
        .Select(function (x) { return x })
        .FirstOrDefault();
        $scope.direccionTipo = $scope.tempDireccion.idTipoDireccion;
        $scope.labelDireccionTipo = $scope.tempDireccion.tipoDireccion;
        $scope.direccionEstado = $scope.tempDireccion.idEstado;
        $scope.labelDireccionEstado = $scope.tempDireccion.estado;
        $('#btnActualizaDireccion').show();
        $('#btnAgregaDireccion').hide();
    }

    //Complete de Dirección Update
    var direccionActualizaSuccess = function (data, status, headers, config) {
        $('#btnActualizaDireccion').button('reset');
        if (isNumber(data)) {
            //Cargo nuevamente los datos
            $('#btnActualizaDireccion').button('loading');
            direccionRepository.getEmpty()
            .success(direccionEmptySuccess)
            .error(errorCallBack);
            direccionRepository.get()
            .success(direccionAllSuccess)
            .error(errorCallBack);
            notificationFactory.success('Direccion actualizada.');
            $('#btnActualizaDireccion').hide();
            $('#btnAgregaDireccion').show();
        }
        else
            notificationFactory.error('Error interno al actualizar la dirección: ' + data);
    }

    //Actualiza una dirección
    $scope.ActualizaDireccion = function (iddireccion) {
        $('#btnActualizaDireccion').button('loading');
        $scope.tempDireccion.idTipoDireccion = $scope.direccionTipo;
        $scope.tempDireccion.idEstado = $scope.direccionEstado;
        direccionRepository.update($scope.tempDireccion)
        .success(direccionActualizaSuccess)
        .error(errorCallBack);
    }

    //Agregar dirección success
    var direccionAgregaSuccess = function (data, status, headers, config) {
        $('#btnAgregaDireccion').button('reset');
        if (isNumber(data)) {
            //Cargo nuevamente los datos
            $('#btnAgregaDireccion').button('loading');
            direccionRepository.getEmpty()
            .success(direccionEmptySuccess)
            .error(errorCallBack);
            direccionRepository.get()
            .success(direccionAllSuccess)
            .error(errorCallBack);
            notificationFactory.success('Direccion agregada.');
        }
        else
            notificationFactory.error('Error interno al actualizar la dirección: ' + data);
    }

    //Validaciones para alta de direccion
    var ValidaAgregaDireccion = function () {
        var returnValidate = true;
        if($scope.direccionEstado  == null){
            returnValidate = false;
            notificationFactory.error('Debe elegir el estado.');
        }
        if($scope.direccionTipo == null){
            returnValidate = false;
            notificationFactory.error('Debe elegir el tipo de dirección.');
        }
        if($scope.tempDireccion.calle == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer la calle.');
        }
        if($scope.tempDireccion.numeroExterior == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer el número exterior.');
        }
        if($scope.tempDireccion.colonia == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer la colonia.');
        }
        if($scope.tempDireccion.codigoPostal == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer el código postal.');
        }
        if($scope.tempDireccion.ciudad == null){
            returnValidate = false;
            notificationFactory.error('Debe establecer la ciudad.');
        }
        //Devuelvo el resultado de la validación
        return returnValidate;
    }

    //Agrega una nueva dirección
    $scope.AgregaDireccion = function (iddireccion) {
        if(ValidaAgregaDireccion()){
            $('#btnAgregaDireccion').button('loading');
            $scope.tempDireccion.idActa = $scope.cliente.idActa;
            $scope.tempDireccion.idTipoDireccion = $scope.direccionTipo;
            $scope.tempDireccion.idEstado = $scope.direccionEstado;
            direccionRepository.add($scope.tempDireccion)
                .success(direccionAgregaSuccess)
                .error(errorCallBack);
        }
    }

    //Complete de Dete Direccion cargando datos
    var direccionAllSuccess = function (data, status, headers, config) {
        $('#btnActualizaDireccion').button('reset');
        $('#btnAgregaDireccion').button('reset');
        $rootScope.listadeDirecciones = data;
        localStorageService.set('listadeDirecciones', $rootScope.listadeDirecciones);
        Cargar();
    }

    //Complete de Delete dirección
    var direccionDeleteSuccess = function (data, status, headers, config) {
        if (isNumber(data)) {
            //Cargo nuevamente los datos
            direccionRepository.get()
            .success(direccionAllSuccess)
            .error(errorCallBack);
            notificationFactory.success('Direccion eliminada.');
        }
        else
            notificationFactory.error('Error interno al eliminar la dirección: ' + data);
    }

    //Elimina direccion del contrato
    $scope.EliminarDireccion = function (iddireccion) {
        if (confirm('¿Desea actualizar los datos del cliente? (Esta acción será notificada al supervisor)')) {
            $('#btnActualizaDireccion').button('loading');
            direccionRepository.delete(iddireccion)
            .success(direccionDeleteSuccess)
            .error(errorCallBack);
        }
    }
    
    //DropDown Estado de Dirección
    $scope.SetDireccionEstado = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopendireccionestado = !$scope.status.isopendireccionestado;
        $scope.direccionEstado = valor;
        $scope.labelDireccionEstado = name;
    }

    //DropDown Tipo de Dirección
    $scope.SetDireccionTipo = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopendirecciontipo = !$scope.status.isopendirecciontipo;
        $scope.direccionTipo = valor;
        $scope.labelDireccionTipo = name;
    }


    //Administración de header de contrato
    ///////////////////////////////////////////////////////////////////////////
    //DropDown Sucursal
    $scope.SetContratoSucursal = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopencontratosucursal = !$scope.status.isopencontratosucursal;
        $scope.contratoSucursal = valor;
        $scope.labelContratoSucursal = name;
    }
    //DropDown Tipo Clientre
    $scope.SetContratoTipo = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopencontratotipo = !$scope.status.isopencontratotipo;
        $scope.contratoTipo = valor;
        $scope.labelContratoTipo = name;
    }
    //DropDown EstatusContrato
    $scope.SetContratoEstatus = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopencontratoestatus = !$scope.status.isopencontratoestatus;
        $scope.contratoEstatus = valor;
        $scope.labelContratoEstatus = name;
    }

    //Muestra la ventana modal con la información principal
    $scope.AdminContratoHeader = function () {
        if ($scope.cliente != null && $scope.cliente != '') {

            //establezco el tipo de contrato
            $scope.contratoTipo = $scope.cliente.idTipo;
            $scope.labelContratoTipo = $scope.cliente.tipo;
            //establezco el estatus del cliente
            $scope.contratoEstatus = $scope.cliente.idEstatusContrato;
            $scope.labelContratoEstatus = $scope.cliente.estatusContrato;
            //establezco la sucursal
            $scope.contratoSucursal = $scope.cliente.idSucursal;
            $scope.labelContratoSucursal = $scope.cliente.sucursal;

            //Muestro la ventana modal
            $('#viewHeaderContrato').modal('show');
            
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    var actualizaHeaderSuccess2 = function (data, status, headers, config) {
        $('#btnActualizaHeaderContrato').button('reset');
        $rootScope.listadeClientes = data;
        localStorageService.set('listadeClientes', $rootScope.listadeClientes);
        Cargar();
        notificationFactory.success('Contrato actualizado.');
        $('#viewHeaderContrato').modal('hide');
    }

    //Completo actualizar
    var actualizaHeaderSuccess1 = function (data, status, headers, config) {
        $('#btnActualizaHeaderContrato').button('reset');
        if (isNumber(data)) {
            $('#btnActualizaHeaderContrato').button('loading');
            notificationFactory.info('Estableciendo configuraciones personalizadas (Esto puede tardar un par de minutos)...');
            // clienteRepository.getFull()
            //     .success(actualizaHeaderSuccess2)
            //     .error(errorCallBack);
            $('#btnActualizaHeaderContrato').button('reset');
            notificationFactory.warning('La solicitud se ha enviado al administrador para su revisión.');
            $('#viewHeaderContrato').modal('hide');
        }
        else
            notificationFactory.error('Error interno al actualizar el contrato: ' + data);
    }

    //Envìa los datos y actualiza
    $scope.ActualizaHeaderContrato = function () {
        if (confirm('¿Desea actualizar los datos del cliente? (Esta acción será notificada al supervisor)')) {
            $('#btnActualizaHeaderContrato').button('loading');

            contratoRepository.put($scope.cliente.idContrato, $scope.contratoSucursal, $scope.empleado.idEmpleado, $scope.contratoTipo, $scope.contratoEstatus, $scope.actualizaHeaderObservaciones)
                .success(actualizaHeaderSuccess1)
                .error(errorCallBack);
        }
    }

    //Redirecciones
    $scope.IrACobranza = function () {
        if ($scope.cliente != null && $scope.cliente != '') {
            location.href = '/cobranza';
        }
        else
            notificationFactory.error('Debe seleccionar un cliente.');
    }

    //Grid normal
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

    //Grid Almacén
    //NG - GRID
    function Material() { }
    Contacto.prototype.id = 0;
    Contacto.prototype.fecha = '';
    Contacto.prototype.tipo = '';
    Contacto.prototype.material = '';
    Contacto.prototype.almacenamiento = '';

    $scope.myAlmacen = [];
    $scope.gridAlmacen = {
        data: 'myAlmacen',
        columnDefs: [{ field: 'fecha', displayName: 'Fecha' },{ field: 'tipo', displayName: 'Tipo' }, { field: 'material', displayName: 'Material' }, { field: 'almacenamiento', displayName: 'Almacenamiento' }],
        selectedItems: [],
        keepLastSelected: false
    };

    //Abre página WEB
    $scope.OpenWeb = function () {
        if ($scope.cliente.paginaWeb != ''){
            window.open('http://' + $scope.cliente.paginaWeb);
        }
        
    };

    ///////////////////////////////////////
    //Grid de gestión  LE
    //Grid normal
    //NG - GRID
    function LE() { }
    LE.prototype.idLE = '';
    LE.prototype.LE = '';

    $scope.myDataLE = [];

    $scope.gridOptionsLE = {
        data: 'myDataLE',
        columnDefs: [{ field: 'idLE', displayName: 'id' }, { field: 'LE', displayName: 'Linea Emprendedor' }],
        selectedItems: [],
        keepLastSelected: false
    };

    //Establezco la LE seleccionada
    $scope.SetLE = function () {
        //Variable para el manejo de la selección
        var LEs = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptionsLE.selectedItems, function (value, key) {
            LEs.push(value.idLE);
            LEs.push(value.LE);
        });

        //Limpiamos la selección ANGULAR SUCKS!
        angular.forEach($scope.myDataLE, function (data, index) {
            $scope.gridOptionsLE.selectItem(index, false);
        });

        if(LEs.length > 0){
             if(LEs.length == 2){
                $rootScope.newCliente.idLE = LEs[0];
                $rootScope.newCliente.LE = LEs[1];
                $('#newLE').modal('hide');
             }
             else{
                notificationFactory.error('Solo puede seleccionar una línea emprendedor');
             }
        }
        else{
            notificationFactory.error('Debe seleccionar una Línea Emprendedor');
        }
    };

    //Success de carga de LE
    var getLESuccess = function (data, status, headers, config) {
        $scope.listaLE = data;
        notificationFactory.success('Lista de LE cargadas');
        //Limpio los elementos del grid
        $scope.myDataLE = [];
        //Agrego las LE al grid
        angular.forEach($scope.listaLE, function (value, key) {
            var linea = new LE();
            linea.idLE = value.idLE;
            linea.LE = value.numero;
            this.push(linea);
        }, $scope.myDataLE);

        $('#btnShowLE').button('reset');

        //Muestro la ventana modal
        $('#newLE').modal('show');
    }

    $scope.CargaGridLE = function () {
        $('#btnShowLE').button('loading');
        //Llamo a la base de datos
        LERepository.getLEBySucursal($rootScope.newCliente.idSucursal)
                .success(getLESuccess)
                .error(errorCallBack);
    }

    ///////////////////////////////////////
    //Grid de gestión  Oficina
    //Grid normal
    //NG - GRID
    function Oficina() { }
    Oficina.prototype.idOficina = '';
    Oficina.prototype.oficina= '';

    $scope.myDataOficina = [];

    $scope.gridOptionsOficina = {
        data: 'myDataOficina',
        columnDefs: [{ field: 'idOficina', displayName: 'id' }, { field: 'oficina', displayName: 'Oficina' }],
        selectedItems: [],
        keepLastSelected: false
    };

    //Establezco la oficina seleccionada
    $scope.SetOficina = function () {
        //Variable para el manejo de la selección
        var oficinas = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptionsOficina.selectedItems, function (value, key) {
            oficinas.push(value.idOficina);
            oficinas.push(value.oficina);
        });

        //Limpiamos la selección ANGULAR SUCKS!
        angular.forEach($scope.myDataOficina, function (data, index) {
            $scope.gridOptionsOficina.selectItem(index, false);
        });

        if(oficinas.length > 0){
             if(oficinas.length == 2){
                $rootScope.newCliente.idOficina = oficinas[0];
                $rootScope.newCliente.oficina = oficinas[1];
                $('#newOficina').modal('hide');
             }
             else{
                notificationFactory.error('Solo puede seleccionar una Oficina');
             }
        }
        else{
            notificationFactory.error('Debe seleccionar una Oficina');
        }
    };

    //Success de carga de oficina
    var getOficinaSuccess = function (data, status, headers, config) {
        $scope.listaOficina = data;
        notificationFactory.success('Lista de Oficinas cargadas');
        //Limpio los elementos del grid
        $scope.myDataOficina = [];
        //Agrego los contactos del cliente seleccionado al grid
        angular.forEach($scope.listaOficina, function (value, key) {
            var of = new Oficina();
            of.idOficina = value.idOficina;
            of.oficina = value.numero;
            this.push(of);
        }, $scope.myDataOficina);

        $('#btnShowOficina').button('reset');

        //Muestro la ventana modal
        $('#newOficina').modal('show');
    }

    $scope.CargaGridOficina = function () {
        $('#btnShowOficina').button('loading');
        //Llamo a la base de datos
        oficinaRepository.getOficinaBySucursal($rootScope.newCliente.idSucursal)
                .success(getOficinaSuccess)
                .error(errorCallBack);
    }
    
    //---------------------------------------------------
    //Mover data de aqui
    $scope.CallPad = function (param) {
        $("#btnCallList").popover({
            html : true, 
            content: function() {
                return $('#popoverAgendaContent').html();
            },
            title: function() {
                return $('#popoverAgendaTitle').html();
            }
        });
        $scope.padResult= '  -  ';
        $('#divHoldBack').hide();
        $('#callPad').modal('show');
    };

    $scope.AddPad = function (param) {
        $scope.padResult +=  param;
    };

    $scope.ClearPad = function () {
        $scope.padResult =  '  -  ';
    };

    $scope.PutHold = function (param) {
        $scope.holdControl = param;
    };

    $scope.inCall = false;          
    $scope.TomarLlamada = function () {
        $scope.inCall = true;
    };
    
    $scope.Colgar = function () {
        $scope.inCall = false;
    };



});



