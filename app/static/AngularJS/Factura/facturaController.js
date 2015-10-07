registrationModule.controller("facturaController", function ($scope, $rootScope, localStorageService, facturaRepository, servicioRepository, notificationFactory) {
    //Propiedades
    $scope.subtotal = 0.0;
    $scope.iva = 0.0;
    $scope.total = 0.0;

    //Callback Success con la lista de productos
    var autocompleteSuccess = function (data, status) {
        notificationFactory.info('Lista productos cargada');
        $scope.productos = data;
        //Inicializo el autocomplete
        $('#tProducto').autocomplete({
            source: $scope.productos,
        });

        $('#tProducto').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            Buscar(ui.item.value);
        }).change();
    }

    //Obtiene la lista de productos
    var getProductosSuccess = function (data, status) {
        $scope.listaProductos = data;

    }

    //Obtengo la factura vacìa
    var getFacturaEmptySuccess = function (data, status) {
        $scope.factura = data;
        //Se asignan valores por default
        $scope.cuentaDePago = 'No Identificado';
        $scope.factura.formaDePago = 0;
        $scope.factura.idEmpleado = 1;
        $scope.factura.idContrato = $scope.cliente.idContrato;
        $scope.factura.observaciones = '';
    }

    //Obtiene un objeto de tipo lista de servicios
    var getServicioEmptySuccess = function (data, status) {
        $scope.tempProducto = data;
    }

    //Error callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }

    //Función de carga inicial
    $scope.init = function () {
        //Obtenemos los datos del cliente actual
        $rootScope.cliente = localStorageService.get('clienteActual');
        $scope.cliente = $rootScope.cliente

        //Obtengo el objeto de factura vacío
        $scope.myPromise = facturaRepository.getEmpty()
            .success(getFacturaEmptySuccess)
            .error(errorCallBack);

        //Obtengo el objeto de servicio
        $scope.myPromise = facturaRepository.getServicioEmpty()
            .success(getServicioEmptySuccess)
            .error(errorCallBack);

        //Obtengo la lista de productos para el search
        $scope.myPromise = servicioRepository.getAutocomplete()
                  .success(autocompleteSuccess)
                  .error(errorCallBack);

        //Obtengo la lista de productos completa
        $scope.myPromise = servicioRepository.getProductos()
                  .success(getProductosSuccess)
                  .error(errorCallBack);


    }

    //Limpia la caja de Búsqueda
    $scope.Clear = function () {
        $scope.semilla = "";
    }

    //Regresa la llamada a las finanzas del cliente
    $scope.Cancelar = function () {
        location.href = '/cobranza';
    }

    //Busca un producto dentro de la lista de acuerdo al autocomplete
    var Buscar = function (value) {
        var numero = mySplit(value, 0, '|');

        $scope.producto = Enumerable.From($scope.listaProductos)
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
    }

    //Agregar un producto a la lista
    $scope.Agregar = function () {
        //Valido si se seleccionó un producto
        if ($scope.tempProducto.descripcion != '' && $scope.tempProducto.descripcion != null) {
            //Obtengo el  número de productos
            var cuantos = $scope.factura.listaServicios.length;

            //Creo un nuevo objeto
            var newProducto = {
                id: 0,
                idProducto: 0,
                descripcion: '',
                cantidad: 0,
                precio: 0.0
            };
            newProducto.id = cuantos + 1;
            newProducto.descripcion = $scope.tempProducto.descripcion;
            newProducto.idProducto = $scope.tempProducto.idProducto;
            newProducto.cantidad = $scope.tempProducto.cantidad;
            newProducto.precio = $scope.tempProducto.precio;
            //Agrego el nuevo producto a la lista
            $scope.factura.listaServicios.push(newProducto);
            //Calculo el subtotal IVA y total
            RecalcularMontos();
            //Aplicamos los cambios al controlador
            $scope.tempProducto.descripcion = '';
            $scope.tempProducto.idProducto = 0;
            $scope.tempProducto.cantidad = 1;
            $scope.tempProducto.precio = 0.0;
            //limpio el control de búsqueda
            $scope.semilla = ""
        }
        else
            notificationFactory.warning('Elija un producto.');
    }

    
    //Elimino un producto de la lista
    $scope.Eliminar = function (id) {
        var ind = -1;
        for (i = 0; i < $scope.factura.listaServicios.length; i++) {
            if ($scope.factura.listaServicios[i].id == id) {
                ind = i;
                break;
            }
        }
        $scope.factura.listaServicios.splice(ind, 1);
        RecalcularMontos();
    }

    var RecalcularMontos = function () {
        //Limpio el subtotal
        $scope.subtotal = 0.0;
        //recorro los productos seleccionados
        for (i = 0; i < $scope.factura.listaServicios.length; i++) {
            $scope.subtotal += ($scope.factura.listaServicios[i].cantidad * $scope.factura.listaServicios[i].precio);
        }
        //Asigno IVA y total final
        $scope.iva = $scope.subtotal * 0.16;
        $scope.total = $scope.subtotal * 1.16;
    }

    //Callback  de add Factura
    var addEventualSuccess = function (data, status) {
        var resultado = data;
        if (data.length < 10) {
            notificationFactory.success('Factura Generada.');
            setTimeout(
                function () {
                    location.href = '/cobranza';
                }
            , 2000);
        }
        else
            notificationFactory.error('Ha ocurrido un error al procesar la factura: ' + data );
    }

    //Genera una nueva factura
    $scope.Procesar = function () {
        if ($scope.factura.formaDePago != 0)
        {
            if (confirm('¿Desea procesar la factura por un importe total de: ' + $scope.total + '?'))
            {
                //Asigno los valores restantes
                $scope.factura.cuenta = 1;
                $scope.factura.desde = $scope.dtDesde;
                $scope.factura.hasta = $scope.dtHasta;

                $scope.myPromise = facturaRepository.eventual($scope.factura)
                    .success(addEventualSuccess)
                    .error(errorCallBack);
            }
        }
        else
            notificationFactory.warning("Elija una forma de pago.")
    }

    //Control de Fecha
        //DatePicker
    $scope.today = function () {
        $scope.dtDesde = new Date();
        $scope.dtHasta = new Date();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dtDesde = null;
        $scope.dtHasta = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1 || date.getDay() === 7));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date().addYears(-1);
    };
    $scope.toggleMin();

    $scope.openDesde = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedDesde = true;
    };

    $scope.openHasta = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedHasta = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    //DropDown Forma de Pago
    $scope.SetPago = function (valor,$event,name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
        $scope.factura.formaDePago = valor;
        $scope.labelDrop = name;
    }

    $scope.labelDrop = 'Seleccione Una Opción';

});