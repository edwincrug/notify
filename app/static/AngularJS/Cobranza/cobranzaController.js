registrationModule.controller("cobranzaController", function ($scope, $rootScope, localStorageService, clienteRepository, cobranzaRepository, facturaRepository, notificationFactory) {
    //Propiedades
    $scope.x= new Date();
    $scope.y = new Date();

    $scope.pagoReferencia = '';
    $scope.pagoMonto = 0.0;
    $scope.sFolio = '';
    $scope.sCliente = '';

    $scope.semilla = '';

    //Funciones
    //Limpiar el texto
    $scope.Clear = function () {
        $scope.semilla = '';
    }

    //Callback
    var getDatosSuccess = function (data, status) {
        $rootScope.datosCliente = data;
    }

    var getFacturasSuccess = function (data, status) {
        notificationFactory.success('Datos cargardos');
        $rootScope.listaFacturas = data;
    }

    var pagarSuccess = function (data, status) {
        if(data.length > 0){
            window.open(global_settings.urlReportRecibo + data.replace(/"/g, ''), "RptWindow", "width=1024, height=768");
        }
        $('#btnProcesarPago').button('reset');
        $('#newPago').modal('hide');
        $scope.init();
        notificationFactory.success('Pago procesado');
    }

    var autocompleteClienteSuccess = function (data, status) {
        $scope.clientes = data;

        $('#search').autocomplete({
            source: $scope.clientes
        });
    }

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('No se pudieron obtener los datos.');
    }


    //Función de carga inicial
    $scope.init = function () {
        //Obtenemos los datos del cliente actual
        $rootScope.cliente = localStorageService.get('clienteActual');
        $scope.cliente = $rootScope.cliente

         //Obtego el empleado logueado
        $scope.empleado = localStorageService.get('employeeLogged');

        $scope.listadeClientes = localStorageService.get('listadeClientes');
        //Obtiene los datos del cliente
        $scope.myPromise = cobranzaRepository.getDatos($scope.cliente.idActa)
               .success(getDatosSuccess)
               .error(errorCallBack);
        //Obtiene la lista de facturas
        $scope.myPromise = cobranzaRepository.getFacturas($scope.cliente.idContrato)
             .success(getFacturasSuccess)
             .error(errorCallBack);

        $scope.myPromise = clienteRepository.get(2)
               .success(autocompleteClienteSuccess)
               .error(errorCallBack);

        //Asigna los eventos de autocomplete
        $('#search').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            CargarByCliente(ui.item.value);
        }).change();

        $scope.cuentaDePago = 'No identificado';
        $scope.labelFormaDePago = 'Seleccione Una Opción';
        $scope.labelPromocion = 'Seleccione Una Opción';
    }

    //buscar a un cliente en específico
    function CargarByCliente(a) {
        $scope.idCliente = mySplit(a, 0, '|');
        $('#search').val('');
        $scope.cliente = Enumerable.From($scope.listadeClientes)
            .Where(function (x) { return x.idActa == $scope.idCliente })
            .OrderBy(function (x) { return x.idActa })
            .Select(function (x) { return x })
            .FirstOrDefault();
        $rootScope.cliente = $scope.cliente;
        localStorageService.set('clienteActual', $rootScope.cliente);

        $scope.myPromise = cobranzaRepository.getDatos($scope.cliente.idActa)
              .success(getDatosSuccess)
              .error(errorCallBack);
        //Obtiene la lista de facturas
        $scope.myPromise = cobranzaRepository.getFacturas($scope.cliente.idContrato)
             .success(getFacturasSuccess)
             .error(errorCallBack);
        //Aplicamos los cambios al controlador
        $scope.$apply();
    }

    var buscaFolioSuccess = function (data, status, headers, config) {
        if (isNumber(data)) {
            $scope.idCliente = data;
            $scope.cliente = Enumerable.From($scope.listadeClientes)
               .Where(function (x) { return x.idActa == $scope.idCliente })
               .OrderBy(function (x) { return x.idActa })
               .Select(function (x) { return x })
               .FirstOrDefault();
            $rootScope.cliente = $scope.cliente;
            localStorageService.set('clienteActual', $rootScope.cliente);

            $scope.myPromise = cobranzaRepository.getDatos($scope.cliente.idActa)
                  .success(getDatosSuccess)
                  .error(errorCallBack);
            //Obtiene la lista de facturas
            $scope.myPromise = cobranzaRepository.getFacturas($scope.cliente.idContrato)
                 .success(getFacturasSuccess)
                 .error(errorCallBack);
        }
        else
            notificationFactory.error('Error interno al obtener el cliente: ' + data);
    }

    //Buscar Folio
    $scope.BuscarFolio = function () {
        cobranzaRepository.getFacturasByFolio($scope.sFolio)
         .success(buscaFolioSuccess)
         .error(errorCallBack);
    }

    //Envía a reportes de clientes
    $scope.ReporteClientes = function () {
        location.href = '/reporteclientes';
    }

    //Envía a reportes de Facturas
    $scope.ReporteFacturas = function () {
        location.href = '/reportefacturas';
    }

    //Muestra la ventana de factura
    $scope.EmitirFactura = function () {
        location.href = '/factura';
    }

    //Muestra la ventanilla de pago
    $scope.MostrarPago = function () {
        $scope.recibo = false;
        $('#newPago').modal('show');
    }

    //Procesa un nuevo pago
    $scope.ProcesarPago = function () {
        if (confirm('¿Desea procesar el pago por: $ ' + $scope.pagoMonto + '?')) {
            $('#btnProcesarPago').button('loading');
            cobranzaRepository.Pagar($scope.cliente.idContrato, $scope.pagoReferencia, $scope.pagoMonto, $scope.dt.format("yyyymmdd"), $scope.recibo, $scope.cliente.idActa + ' | ' + $scope.cliente.razonSocial)
               .success(pagarSuccess)
               .error(errorCallBack);
        }
    }

    //Abre un documento de lìnea de cuenta (factura)
    $scope.AbrirCuenta = function (path) {
            window.open(path);
    
    }


    //Lista la cancelaciòn de factura
    var delFacturaSuccess = function (data, status) {
        var resultado = data;
        $('#btnCancelarFactura').button('reset');
        notificationFactory.warning('La solicitud se ha enviado al administrador para su revisión.');
        $scope.init();
        $('#showCancel').modal('hide');
    }

    //Lista la canclación de pago
    var delCobranzaSuccess = function (data, status) {
        var resultado = data;
        $('#btnCancelarFactura').button('reset');
        if (resultado.length < 10) {
            notificationFactory.success('Pago cancelado.');
            $scope.init();
        }
      else
            notificationFactory.error('Error al cancelar el pago: ' + resultado);  
    }

    //Confirmo la cancelación
    $scope.ConfirmarCancelar = function() {
        $('#btnCancelarFactura').button('loading');
        facturaRepository.delete($scope._id, $scope.empleado.idEmpleado, $scope.motivoCancelacion)
                .success(delFacturaSuccess)
                .error(errorCallBack);
    }

    //Cancela un movimiento de la cuenta
    $scope.CancelarCuenta = function (id, mov) {
         if (mov == 1) {
            $scope._id = id;
            $('#showCancel').modal('show');
        }
        else {
            if(confirm('¿Desea cancelar el pago?')){
                cobranzaRepository.delete(id)
                    .success(delCobranzaSuccess)
                    .error(errorCallBack);
            }
        }
    }

    ////////////////////////////////////////////////////////////////
    //Configuración de una nueva promoción
    /////////////////////////////////////////////////////////////////
    var getPromocionSuccess = function (data, status, headers, config) {
        $scope.listaPromocion = data;
        CargaGridPromociones();
        $('#newPromocion').modal('show');
    }

    //Muestra la ventana de promoción
    $scope.Promocion = function () {
        cobranzaRepository.getPromocion()
            .success(getPromocionSuccess)
            .error(errorCallBack);
    };

    //CallBack Factura de promoción
    var addPromocionSuccess = function (data, status) {
        var resultado = data;
        $('#btnProcesaPromocion').button('reset');
        if (data.length < 10) {
            $('#newPromocion').modal('hide');
            notificationFactory.success('Factura Generada.');
            $scope.init();
        }
        else
            notificationFactory.error('Ha ocurrido un error al procesar la factura: ' + data);

        
    };

    //Procesa factura de promoción
    $scope.ProcesarPromocion = function () {
        if (confirm('¿Desea procesar la promoción?')) {
            //Variable para el manejo de la selección
            var promo = [];
            //Agregamos los elementos seleccionados a una lista
            angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
                promo.push(value.id);
            });
            //Valido la selacción de contactos
            if (promo.length == 1) {
                $('#btnProcesaPromocion').button('loading');
                var promodesde = $scope.dtPromoDesde.format("yyyymmdd");
                var promohasta = $scope.dtPromoHasta.format("yyyymmdd");
                //Obtengo la promoción
                $scope.promocion = promo[0];

                facturaRepository.promocion($scope.cliente.idContrato, $scope.promocion, promodesde, promohasta, $scope.promocionFormaDePago, 1)
                .success(addPromocionSuccess)
                .error(errorCallBack);

            }
            else
                notificationFactory.error('Debe seleccionar una promoción.');
            
        }
    };


    //NG - GRID
    function Promocion() { }
    Promocion.prototype.id = '';
    Promocion   .prototype.descripcion = '';

    $scope.myData = [];


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{ field: 'descripcion', displayName: 'Promoción' }],
        selectedItems: [],
        keepLastSelected: false
    };

    var CargaGridPromociones = function () {
        //Limpio los elementos del grid
        $scope.myData = [];
        //Agrego los contactos del cliente seleccionado al grid
        angular.forEach($scope.listaPromocion, function (value, key) {
            var pro = new Promocion();
            pro.id = value.idPromocion;
            pro.descripcion = value.descripcion;
            this.push(pro);
        }, $scope.myData);
    }


    //Buscar Cliente
    $scope.BuscarCliente = function () {
        cobranzaRepository.getFacturasByCliente($scope.sCliente)
         .success(byClienteSuccess)
         .error(errorCallBack);
    }

    ///////////////////////////////////////////////////////////////
    //Control de Fecha
    ///////////////////////////////////////////////////////////////
    //DatePicker
    $scope.today = function () {
        $scope.dt = new Date();
        $scope.dtPromoDesde = new Date();
        $scope.dtPromoHasta = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
        $scope.dtPromoDesde = null;
        $scope.dtPromoHasta = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1 || date.getDay() === 7));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date().addYears(-1);
    };
    $scope.toggleMin();
    //Abre calendario de PAgo
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    //Abre claendario de Promocion desde
    $scope.openPromoDesde = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedPromoDesde = true;
    };
    //Abre claendario de Promocion hasta
    $scope.openPromoHasta = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedPromoHasta = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    //DropDowns
    //DropDown Forma de Pago
    $scope.SetPago = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenFormaDePago = !$scope.status.isopenFormaDePago;
        $scope.promocionFormaDePago = valor;
        $scope.labelFormaDePago = name;
    }
    //DropDown Promocion
    $scope.SetPromocion = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenPromocion = !$scope.status.isopenPromocion;
        $scope.promocion = valor;
        $scope.labelPromocion = name;
    }


});