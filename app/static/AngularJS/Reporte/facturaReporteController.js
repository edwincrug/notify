registrationModule.controller("facturaReporteController", function ($scope, $rootScope, localStorageService, reporteRepository, notificationFactory) {

    //Propiedades
    $scope.fechadesdeFactura = new Date();
    $scope.fechahastaFactura = new Date();

    //Constructor
    //Ejecuta un paquete de funciones de inicio
    $scope.init = function () {
        //Tipo de cliente
        $scope.clienteTipo = 0;
        $scope.labelClienteTipo = 'Vigentes';
    }


    //Métodos

    //Ver cliente
    $scope.VerCliente = function (indice) {

        $scope.gridOptions.selectRow(indice, true);
        $scope.clientever = $scope.gridOptions.$gridScope.selectedItems[0];

        $scope.listadeClientes = localStorageService.get('listadeClientes');
        $scope.cliente = Enumerable.From($scope.listadeClientes)
          .Where(function (x) { return x.idActa == $scope.clientever.cliente })
          .OrderBy(function (x) { return x.idActa })
          .Select(function (x) { return x })
          .FirstOrDefault();
        localStorageService.set('clienteActual', $scope.cliente);
        window.open("/cobranza", "MsgWindow", "width=1024, height=768");
        //location.href = '/cobranza';
    }

    //Callback
    //Obtiene la lista de Eventos

    var errorCallBack = function (data, status, headers, config) {
        notificationFactory.error('Ocurrio un problema');
    }
    //Procesa Reporte de clientes
    $scope.ProcesaReporte = function () {
        //$scope.myPromise = reporteRepository.getClientes($scope.clienteSucursal, $scope.clienteContrato, $scope.clienteTipo)
        //  .success(getClientesSuccess)
        //  .error(errorCallBack);
        $scope.obtieneDatos();
    }
    //Procesa Reporte de clientes
    $scope.ExportaReporte = function () {
        //$scope.myPromise = reporteRepository.getClientes($scope.clienteSucursal, $scope.clienteContrato, $scope.clienteTipo)
        //  .success(getClientesSuccess)
        //  .error(errorCallBack);
        alert('Habilite Módulo 00xx545');
    }

    $scope.ExportarReporte = function () {

        $("#table2excel").table2excel({
            // exclude CSS class
            exclude: ".noExl",
            name: "Reporte"
        });

    }

    $scope.Regresar = function () {
        location.href = '/cobranza';
    }

    //Drop Down de Estatus
    $scope.SetClienteTipo = function (valor, $event, name) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopenClienteTipo = !$scope.status.isopenClienteTipo;
        $scope.clienteTipo = valor;
        $scope.labelClienteTipo = name;
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

    //Detalle de la grilla

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: false
    };
    //Paginacion Definicion
    $scope.pagingOptions = {
        pageSizes: [10, 20, 30],
        pageSize: 1000,
        currentPage: 1
    };

    //Actualiza Paginacion
    $scope.setPagingData = function (page, pageSize) {
        if ($scope.listadeFuncionesAdicionales.length > 0) {
            var pagedData = $scope.listadeFuncionesAdicionales.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = $scope.listadeFuncionesAdicionales.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
        else {
            $scope.totalServerItems = 0;
            $scope.pagingOptions.currentPage = 1;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }
    };

    //Actualiza grid, si fromServer obtiene del servidor, si no solo filtra
    $scope.getPagedDataAsync = function (pageSize, page, searchText, fromServer) {
        setTimeout(function () {

            if (fromServer) {
                var desdeString = $scope.dt1.format("yyyymmdd");
                var hastaString = $scope.dt2.format("yyyymmdd");
                $scope.myPromise = reporteRepository.getFacturas(desdeString, hastaString, $scope.clienteTipo)
                     .success(
                     function (result) {
                         $scope.listadeFuncionesAdicionales = result;
                         $scope.listadeFuncionesAdicionalesFull = result;
                         $scope.gridOptions.$gridScope.filterText = '';
                         $scope.setPagingData(page, pageSize);

                         if ($scope.listadeFuncionesAdicionales.length == 0) {

                             notificationFactory.error("No se encontro ningun registro");

                         }
                     }
                     )
                     .error(errorCallBack);


            } else {
                if (searchText) {
                    $scope.filterText;
                    var ft = searchText.toLowerCase();
                    $scope.listadeFuncionesAdicionales = $scope.listadeFuncionesAdicionalesFull.filter(function (item) {

                        //   if (JSON.stringify(item.position).toString().toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.name).toString().toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.paternalSurname).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.netKey).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.idBoss).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.Boss).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.BossPaterno).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.BossnetKey).toLowerCase().indexOf(ft) != -1) {
                        return JSON.stringify(item).toString().toLowerCase().indexOf(ft);
                        //   }

                    });

                    $scope.sortData($scope.gridOptions.sortInfo.fields[0], $scope.gridOptions.sortInfo.directions[0], searchText);
                    $scope.setPagingData(page, pageSize);
                } else {
                    $scope.listadeFuncionesAdicionales = $scope.listadeFuncionesAdicionalesFull;
                    $scope.setPagingData(page, pageSize);
                }
            }

            $('[data-toggle="tooltip"]').tooltip();
        }, 100);
    };

    $scope.obtieneDatos = function () {
        $scope.pagingOptions.currentPage = 1;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, '', true);
    };



    //Listener Filtro
    $scope.$watch('gridOptions.$gridScope.filterText', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.pagingOptions.currentPage = 1;
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.gridOptions.$gridScope.filterText, false);
        }
    }, true);

    //Listener paginacion
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage || newVal.pageSize != oldVal.pageSize) {
            if ($scope.totalServerItems != 0) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.gridOptions.$gridScope.filterText, false);
            }
            else {
                newVal.currentPage = 1;
            }
        }
    }, true);


    $scope.$watch('gridOptions.ngGrid.config.sortInfo', function (newVal, oldVal) {
        if (newVal === oldVal) return;
        if (newVal.fields[0] !== oldVal.fields[0] || newVal.directions[0] !== oldVal.directions[0]) {
            $scope.sortData(newVal.fields[0], newVal.directions[0], $scope.gridOptions.$gridScope.filterText);

            $scope.setPagingData($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
        }
    }, true);

    $scope.sortData = function (field, direction, searchText) {
        if (!$scope.listadeFuncionesAdicionales) return;
        if (searchText) {
            $scope.filterText;
            var ft = searchText.toLowerCase();
            $scope.listadeFuncionesAdicionales = $scope.listadeFuncionesAdicionales.filter(function (item) {
                //if (JSON.stringify(item.position).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.name).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.paternalSurname).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.netKey).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.idBoss).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.Boss).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.BossPaterno).toLowerCase().indexOf(ft) != -1 || JSON.stringify(item.BossnetKey).toLowerCase().indexOf(ft) != -1) {
                return JSON.stringify(item).toLowerCase().indexOf(ft);
                //  }
            });
        };
        $scope.listadeFuncionesAdicionales.sort(function (a, b) {
            if (direction == "asc") {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] > b[field] ? -1 : 1;
            }
        });
    };



    //Definicion del Grid
    $scope.gridOptions = {
        data: 'myData',
        showGroupPanel: false,
        jqueryUIDraggable: true,
        showFilter: true,
        showColumnMenu: true,
        showFooter: true,
        enableCellSelection: false,
        enableRowSelection: true,
        enableColumnResize: true,
        enablePaging: false,
        multiSelect: false,
        selectedItems: [],
        totalServerItems: 'totalServerItems',
        filterOptions: $scope.filterOptions,
        sortInfo: { fields: ['folio'], directions: ['asc'] },
        columnDefs: [

                    { field: 'cliente', displayName: 'Cliente' },
                    { field: 'estatus', displayName: 'Estatus' },
                    { field: 'nombre', displayName: 'Nombre' },
                    { field: 'serie', displayName: 'Serie' },
                    { field: 'folio', displayName: 'Folio' },
                    { field: 'anterior', displayName: 'Anterior' },
                    { field: 'pagos', displayName: 'Pagos' },
                    { field: 'subtotal', displayName: 'Subtotal' },
                    { field: 'iva', displayName: 'IVA' },
                    { field: 'total', displayName: 'Total' },
                    { field: 'fecha', displayName: 'Fecha Factura' },
                    {
                        displayName: 'Ver', cellTemplate:
                        '<button type="button" class="btn btn-default glyphicon glyphicon-user" data-toggle="tooltip" data-placement="top" title="Ver cliente" ng-click="VerCliente(row.rowIndex);">' +
                        '</button>', width: 50
                    }

        ]

    };

    //$scope.exportarXLS = function () {
    //    var str = new Object();
    //    str.json = $scope.listadeFuncionesAdicionales;
    //    var strTitulo = new Object();
    //    strTitulo.json = [{ cliente: "Cliente", estatus: "Estatus", nombre: "Nombre", ejecutivo: "Ejecutivo", sucursal: "Sucursal", tipo: "Tipo", saldo: "Saldo", fechaInicio: "Fecha Inicio" }];
    //    var strOculto = new Object();
    //    strOculto.json = [{ positionType: "", status: "", idAditionalPosition: "" }];
    //    $.redirectPost('/eOrganigrama/Home/Download', { datos: JSON.stringify(str), titulos: JSON.stringify(strTitulo), ocultos: JSON.stringify(strOculto) });
    //};

});