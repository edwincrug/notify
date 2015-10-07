registrationModule.controller("proveedorController", function ($scope, $rootScope, proveedorRepository, servicioRepository, ordenCompraRepository, cuentaPorPagarRepository, localStorageService, notificationFactory) {
    
    //Funciones Callback
    //Error Callback
    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema ' +  data.message);
        //Limpio los botones de callback
        $('#btnGuardarProveedor').button('reset');
    }

    var getServicioEmptySuccess = function (data, status) {
        $scope.tempProducto= data;
    }
        //Autocomplete de productos
    var autocompleteServicioSuccess = function (data, status) {
        notificationFactory.info('Lista de productos cargada');
        $scope.productosCompra = data;
    }

    var getProductosSuccess = function (data, status) {
        notificationFactory.info('Productos cargados');
        $scope.listaProductos = data;
    }

    //Inicio del frame
    $scope.init = function() {
    	$scope.Reload();
        //Inicio los tooltips
        $('[data-toggle="tooltip"]').tooltip();

        //Obtengo la lista de productos para el search
        servicioRepository.getAutocomplete()
            .success(autocompleteServicioSuccess)
            .error(errorCallBack);

            //Obtiene el objeto de producto
        servicioRepository.getServicioEmpty()
            .success(getServicioEmptySuccess)
            .error(errorCallBack);

        servicioRepository.getProductos()
            .success(getProductosSuccess)
            .error(errorCallBack);

        //Busca el servicio seleccionado
        $('#tServicio').on('autocompleteselect', function (event, ui) {
            //Cargo la info del cliente seleccionado
            BuscarServicio(ui.item.value);
        }).change();

        //Obtengo el empleado logueado
        $scope.empleado = localStorageService.get('employeeLogged');
    };

    var addOCEmptyMaestroSuccess = function (data, status, headers, config) {
        $scope.tempOrdenCompra = data;
    }

    var addOCEmptyDetalleSuccess = function (data, status, headers, config) {
        $scope.tempOrdenCompraDetalle = data;
    }

    var getOrdenCompraSuccess = function (data, status, headers, config) {
        notificationFactory.success('Lista de ordenes de compra cargada');
        $scope.listaOrdenesCompra = data;
    }

    var getCuentaPorPagarSuccess = function (data, status, headers, config) {
        notificationFactory.success('Lista de cuentas por pagar cargada');
        $scope.listaCuentaPorPagar = data;
    }

    $scope.Reload = function() {
    	//Obtengo la lista completa de proveedores
    	proveedorRepository.getAll()
    		.success(getProveedorSuccess)
            .error(errorCallBack);
        //Obtengo la lista completa de Ordenes de Compra
        ordenCompraRepository.getAll()
    		.success(getOrdenCompraSuccess)
            .error(errorCallBack);
        //Obtenermos el objeto maestro de OC
        ordenCompraRepository.getEmptyMaestro($scope.tempProducto)
                .success(addOCEmptyMaestroSuccess)
                .error(errorCallBack);
        //Obtenemos el Objeto detalle de OC
        ordenCompraRepository.getEmptyDetalle($scope.tempProducto)
                .success(addOCEmptyDetalleSuccess)
                .error(errorCallBack);
        //Onbtengo el objeto de detalle CPP
        cuentaPorPagarRepository.getAll()
            .success(getCuentaPorPagarSuccess)
            .error(errorCallBack);
    }

    /////////////////////////////////////////////////////
    // Proveedores
    /////////////////////////////////////////////////////
    //Success de obtener proveedores
    var getProveedorSuccess = function (data, status, headers, config) {
        $scope.listaProveedores = data;
        notificationFactory.success('Lista de proveedores cargada');
    }

    //Obtengo un proveedor vacío
    var getProveedorEmptySuccess = function (data, status, headers, config) {
    	$scope.proveedorTemp = data;
    	$scope.proveedorTemp.razonSocial = '';
    	$scope.proveedorTemp.contacto = '';
    	$scope.proveedorTemp.email = '';
    	$scope.proveedorTemp.paginaWeb = '';
    	$scope.proveedorTemp.telefono = '';
    	$scope.proveedorTemp.rfc = '';
    	$scope.proveedorTemp.estatus = 1;
    	$scope.proveedorTemp.calle = '';
    	$scope.proveedorTemp.numeroExterior = '';
    	$scope.proveedorTemp.colonia = '';
    	$scope.proveedorTemp.codigoPostal = '';
    	$scope.proveedorTemp.ciudad = '';
    	$scope.proveedorTemp.idEstado = 9;
    	$scope.proveedorTemp.idClasificacion = 1;
    	$('#viewProveedor').modal('show');
    }

    //Edita un proveedor
    $scope.EditarProveedor = function(pro) {
    	$scope.proveedorTemp = pro;
    	$('#viewProveedor').modal('show');
    };
    

    //Almacena un nuevo empleado
    $scope.NuevoProveedor = function() {
    	//Obtengo un empleado vacío
    	proveedorRepository.getEmpty()
    		.success(getProveedorEmptySuccess)
            .error(errorCallBack);
    }

    //Success de nuevo proveedor
    var addProveedorSuccess = function (data, status, headers, config) {
    	notificationFactory.success('Proveedor agregado correctamente');
    	$('#btnGuardarProveedor').button('reset');
    	$('#viewProveedor').modal('hide');
    	$scope.Reload();
    }
    
 	//Success de actualización de proveedor
    var putProveedorSuccess = function (data, status, headers, config) {
    	notificationFactory.success('Proveedor actualizado correctamente');
    	$('#btnGuardarProveedor').button('reset');
    	$('#viewProveedor').modal('hide');
    	$scope.Reload();
    }

    //Guarda el nuevo empleado
    $scope.GuardarProveedor = function() {
    	$('#btnGuardarProveedor').button('loading');
    	if($scope.proveedorTemp.idProveedor > 0){
    		proveedorRepository.put($scope.proveedorTemp)
    			.success(putProveedorSuccess)
            	.error(errorCallBack);
    	}
    	else{
    		proveedorRepository.add($scope.proveedorTemp)
    			.success(addProveedorSuccess)
            	.error(errorCallBack);
    	}
    }

    //Toggle Clasificación
    $scope.SetClasificacion = function (opc, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenclasificacion = !$scope.status.isopenclasificacion;
        $scope.proveedorTemp.idClasificacion = opc;
        $scope.labelClasificacion = $event.target.innerText;
    };

    $scope.labelClasificacion = 'Consumibles';

    //Toggle Departamento
    $scope.SetEstado = function (opc, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenestado = !$scope.status.isopenestado;
        $scope.proveedorTemp.idEstado = opc;
        $scope.labelEstado = $event.target.innerText;
    };

    $scope.labelEstado = 'Distrito Federal';


    ////////////////////////////////////////////////
    //Ordenes de compra
    ///////////////////////////////////////////////

    //Limpia la búsqueda de Servicios
    $scope.ClearServicio = function () {
        $scope.semillaServicio = '';
        $scope.tempProducto.cantidad = '';
        $scope.tempProducto.precio = '';
    }

    //Busca un producto dentro de la lista de acuerdo al autocomplete
    var BuscarServicio = function (value) {
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
        $('.currencii').formatCurrency();
    }

    var addOrdenCompraSuccess = function (data, status, headers, config) {
        $scope.idOrdenCompra = data;
        //Autocomplete
        $("#tServicio").autocomplete({
            source: $scope.productosCompra
        });
        //Muestro la ventana modal
        $('#newOrdenCompra').modal('show');
        //Configuraciòn para mostrar la ventana modal
        $("#tServicio").autocomplete("option", "appendTo", ".eventInsForm");
    }

    $scope.NuevaOrden = function(pro) {
        if(confirm('¿Desea generar una nueva orden de compra para ' + pro.razonSocial + '?')){
            //Limpiamos la orden de compra
            $scope.semillaServicio = '';
            //Asigno los valores default al objeto principal
            $scope.tempProducto.idProducto = 0;
            $scope.tempProducto.descripcion = '';
            $scope.tempProducto.cantidad = 0;
            $scope.tempProducto.precio = 0;
            //Establezco el id del proveedor
            $scope.tempOrdenCompra.idProveedor = pro.idProveedor;
            $scope.nombreProveedor = pro.razonSocial;
            //Establezco el empleado
            $scope.tempOrdenCompra.idEmpleado = $scope.empleado.idEmpleado;
            //Genero la nueva Orden de compra
            ordenCompraRepository.add($scope.tempOrdenCompra)
                .success(addOrdenCompraSuccess)
                .error(errorCallBack);
        }
    }

    var getDetalleSuccess = function (data, status, headers, config) {
        $scope.listaOrdenCompra = data;
    }

    var addOrdenCompraDetalleSuccess = function (data, status, headers, config) {
        $('#btnAgregaProducto').button('reset');
        ordenCompraRepository.getDetalle($scope.idOrdenCompra)
            .success(getDetalleSuccess)
            .error(errorCallBack);
    }

    $scope.AgregaProducto = function() {
        $('#btnAgregaProducto').button('loading');
        $scope.tempOrdenCompraDetalle.idOrdenCompra = $scope.idOrdenCompra;
        $scope.tempOrdenCompraDetalle.idProducto = $scope.tempProducto.idProducto;
        $scope.tempOrdenCompraDetalle.cantidad = $scope.tempProducto.cantidad;
        $scope.tempOrdenCompraDetalle.precioUnitario = $scope.tempProducto.precio;
        //Agrega un detalle
        ordenCompraRepository.put($scope.tempOrdenCompraDetalle)
            .success(addOrdenCompraDetalleSuccess)
            .error(errorCallBack);          
    }   

    var eliminaOrdenSuccess = function (data, status, headers, config) {
        notificationFactory.success('Producto eliminado correctamente.');
        ordenCompraRepository.getDetalle($scope.idOrdenCompra)
            .success(getDetalleSuccess)
            .error(errorCallBack);
    }

    $scope.EliminaProducto= function(ord) {
        if(confirm('¿Desea eliminar este producto de la orden?')){
            //Agrega un detalle
            ordenCompraRepository.elimina(ord.idOrdenCompraDetalle)
                .success(eliminaOrdenSuccess)
                .error(errorCallBack);
        }
    }   

    var confirmaOrdenSuccess = function (data, status, headers, config) {
        notificationFactory.success('Orden confirmada.');
        $('#btnGuardaOrden').button('reset');
        $('#newOrdenCompra').modal('hide');
    }

    $scope.GuardaOrdenCompra = function() {
        $('#btnGuardaOrden').button('loading');
        ordenCompraRepository.confirma($scope.idOrdenCompra)
                .success(confirmaOrdenSuccess)
                .error(errorCallBack);
    }

    var getDetalleRecibirSuccess = function (data, status, headers, config) {
        $scope.listaOrdenCompra = data;
        $('#confirmOrdenCompra').modal('show');
    }

    $scope.RecibirOrden = function(ord) {
        $scope.idOrdenCompra = ord.idOrdenCompra;
        ordenCompraRepository.getDetalle(ord.idOrdenCompra)
            .success(getDetalleRecibirSuccess)
            .error(errorCallBack);
    }

    $scope.EditarProducto = function(ord) {
        $scope.ordenCompraDetalleTemp = ord;
    }

    var actualizarOrdenCompraSuccess = function (data, status, headers, config) {
        notificationFactory.success('Orden actualizada.');
        ordenCompraRepository.getDetalle($scope.idOrdenCompra)
            .success(getDetalleRecibirSuccess)
            .error(errorCallBack);
        $scope.ordenCompraDetalleTemp = null;
    }

    $scope.ActualizarProducto = function() {
        if($scope.ordenCompraDetalleTemp != null){
            ordenCompraRepository.actualizar($scope.ordenCompraDetalleTemp.idOrdenCompraDetalle, $scope.ordenCompraDetalleTemp.cantidad, $scope.ordenCompraDetalleTemp.precioUnitario, 1)
                .success(actualizarOrdenCompraSuccess)
                .error(errorCallBack);
        }else{
            notificationFactory.error('Debe seleccionar un producto.');
        }

    }

    $scope.ActualizaEliminaProducto= function(ord) {
        if(confirm('¿Desea quitar este producto de la orden final?')){
            //Agrega un detalle
            ordenCompraRepository.actualizar(ord.idOrdenCompraDetalle, ord.cantidad, ord.precioUnitario, 0)
                .success(actualizarOrdenCompraSuccess)
                .error(errorCallBack);
        }
    }   

    var finalizaOrdenCompraSuccess = function (data, status, headers, config) {
        notificationFactory.success('Orden confirmada.');
        $('#btnConfirmaOrden').button('reset');
        $scope.Reload();
        $('#confirmOrdenCompra').modal('hide');
    }

    $scope.ConfirmarOrdenCompra = function() {
        if(confirm('¿Desea confirmar la orden y agendar a cuentas por pagar?')){
            //Obtiene el subtotal
            var subTotalFinal = 0;
            
            angular.forEach($scope.listaOrdenCompra, function (value, key) {
                subTotalFinal+= value.subTotal;
            });
            $('#btnConfirmaOrden').button('loading');
            ordenCompraRepository.finaliza($scope.idOrdenCompra,subTotalFinal,$scope.dt.format('yyyymmdd'),$scope.empleado.idEmpleado)
                .success(finalizaOrdenCompraSuccess)
                .error(errorCallBack);
        }
    }

    //DatePicker
    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1 || date.getDay() === 7));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date().addYears(-1);
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


    ///////////////////////////////////////////////
    //Cuentas por pagar
    //////////////////////////////////////////////
    var putCuentaPorPagarSuccess = function (data, status, headers, config) {
        $scope.Reload();
        notificationFactory.success('Transaccion realizada correctamente.');
    }

    $scope.PagarCuenta = function(est,cue) {
        if(est == 1){
            if(confirm('¿Desea procesar el pago?')){
                cue.estatus = est;
                cuentaPorPagarRepository.put(cue)
                    .success(putCuentaPorPagarSuccess)
                    .error(errorCallBack);
            }
        }
        else{
            if(confirm('¿Desea cancelar el pago?')){
                cue.estatus = est;
                cuentaPorPagarRepository.put(cue)
                    .success(putCuentaPorPagarSuccess)
                    .error(errorCallBack);
            }
        }
        
    }
});