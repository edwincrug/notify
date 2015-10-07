registrationModule.controller("proveedorController",function(e,o,r,a,t,n,d,c){var i=function(e,o,r,a){c.error("Ocurrio un problema "+e.message),$("#btnGuardarProveedor").button("reset")},s=function(o,r){e.tempProducto=o},u=function(o,r){c.info("Lista de productos cargada"),e.productosCompra=o},p=function(o,r){c.info("Productos cargados"),e.listaProductos=o};e.init=function(){e.Reload(),$('[data-toggle="tooltip"]').tooltip(),a.getAutocomplete().success(u).error(i),a.getServicioEmpty().success(s).error(i),a.getProductos().success(p).error(i),$("#tServicio").on("autocompleteselect",function(e,o){D(o.item.value)}).change(),e.empleado=d.get("employeeLogged")};var l=function(o,r,a,t){e.tempOrdenCompra=o},m=function(o,r,a,t){e.tempOrdenCompraDetalle=o},f=function(o,r,a,t){c.success("Lista de ordenes de compra cargada"),e.listaOrdenesCompra=o},v=function(o,r,a,t){c.success("Lista de cuentas por pagar cargada"),e.listaCuentaPorPagar=o};e.Reload=function(){r.getAll().success(g).error(i),t.getAll().success(f).error(i),t.getEmptyMaestro(e.tempProducto).success(l).error(i),t.getEmptyDetalle(e.tempProducto).success(m).error(i),n.getAll().success(v).error(i)};var g=function(o,r,a,t){e.listaProveedores=o,c.success("Lista de proveedores cargada")},P=function(o,r,a,t){e.proveedorTemp=o,e.proveedorTemp.razonSocial="",e.proveedorTemp.contacto="",e.proveedorTemp.email="",e.proveedorTemp.paginaWeb="",e.proveedorTemp.telefono="",e.proveedorTemp.rfc="",e.proveedorTemp.estatus=1,e.proveedorTemp.calle="",e.proveedorTemp.numeroExterior="",e.proveedorTemp.colonia="",e.proveedorTemp.codigoPostal="",e.proveedorTemp.ciudad="",e.proveedorTemp.idEstado=9,e.proveedorTemp.idClasificacion=1,$("#viewProveedor").modal("show")};e.EditarProveedor=function(o){e.proveedorTemp=o,$("#viewProveedor").modal("show")},e.NuevoProveedor=function(){r.getEmpty().success(P).error(i)};var C=function(o,r,a,t){c.success("Proveedor agregado correctamente"),$("#btnGuardarProveedor").button("reset"),$("#viewProveedor").modal("hide"),e.Reload()},O=function(o,r,a,t){c.success("Proveedor actualizado correctamente"),$("#btnGuardarProveedor").button("reset"),$("#viewProveedor").modal("hide"),e.Reload()};e.GuardarProveedor=function(){$("#btnGuardarProveedor").button("loading"),e.proveedorTemp.idProveedor>0?r.put(e.proveedorTemp).success(O).error(i):r.add(e.proveedorTemp).success(C).error(i)},e.SetClasificacion=function(o,r){r.preventDefault(),r.stopPropagation(),e.status.isopenclasificacion=!e.status.isopenclasificacion,e.proveedorTemp.idClasificacion=o,e.labelClasificacion=r.target.innerText},e.labelClasificacion="Consumibles",e.SetEstado=function(o,r){r.preventDefault(),r.stopPropagation(),e.status.isopenestado=!e.status.isopenestado,e.proveedorTemp.idEstado=o,e.labelEstado=r.target.innerText},e.labelEstado="Distrito Federal",e.ClearServicio=function(){e.semillaServicio="",e.tempProducto.cantidad="",e.tempProducto.precio=""};var D=function(o){var r=mySplit(o,0,"|");e.producto=Enumerable.From(e.listaProductos).Where(function(e){return e.idProducto==r}).OrderBy(function(e){return e.idProducto}).Select(function(e){return e}).FirstOrDefault(),e.tempProducto.precio=e.producto.pesos,e.tempProducto.idProducto=e.producto.idProducto,e.tempProducto.descripcion=e.producto.descripcion,e.tempProducto.cantidad=1,e.$apply(),$(".currencii").formatCurrency()},b=function(o,r,a,t){e.idOrdenCompra=o,$("#tServicio").autocomplete({source:e.productosCompra}),$("#newOrdenCompra").modal("show"),$("#tServicio").autocomplete("option","appendTo",".eventInsForm")};e.NuevaOrden=function(o){confirm("¿Desea generar una nueva orden de compra para "+o.razonSocial+"?")&&(e.semillaServicio="",e.tempProducto.idProducto=0,e.tempProducto.descripcion="",e.tempProducto.cantidad=0,e.tempProducto.precio=0,e.tempOrdenCompra.idProveedor=o.idProveedor,e.nombreProveedor=o.razonSocial,e.tempOrdenCompra.idEmpleado=e.empleado.idEmpleado,t.add(e.tempOrdenCompra).success(b).error(i))};var y=function(o,r,a,t){e.listaOrdenCompra=o},T=function(o,r,a,n){$("#btnAgregaProducto").button("reset"),t.getDetalle(e.idOrdenCompra).success(y).error(i)};e.AgregaProducto=function(){$("#btnAgregaProducto").button("loading"),e.tempOrdenCompraDetalle.idOrdenCompra=e.idOrdenCompra,e.tempOrdenCompraDetalle.idProducto=e.tempProducto.idProducto,e.tempOrdenCompraDetalle.cantidad=e.tempProducto.cantidad,e.tempOrdenCompraDetalle.precioUnitario=e.tempProducto.precio,t.put(e.tempOrdenCompraDetalle).success(T).error(i)};var E=function(o,r,a,n){c.success("Producto eliminado correctamente."),t.getDetalle(e.idOrdenCompra).success(y).error(i)};e.EliminaProducto=function(e){confirm("¿Desea eliminar este producto de la orden?")&&t.elimina(e.idOrdenCompraDetalle).success(E).error(i)};var S=function(e,o,r,a){c.success("Orden confirmada."),$("#btnGuardaOrden").button("reset"),$("#newOrdenCompra").modal("hide")};e.GuardaOrdenCompra=function(){$("#btnGuardaOrden").button("loading"),t.confirma(e.idOrdenCompra).success(S).error(i)};var h=function(o,r,a,t){e.listaOrdenCompra=o,$("#confirmOrdenCompra").modal("show")};e.RecibirOrden=function(o){e.idOrdenCompra=o.idOrdenCompra,t.getDetalle(o.idOrdenCompra).success(h).error(i)},e.EditarProducto=function(o){e.ordenCompraDetalleTemp=o};var w=function(o,r,a,n){c.success("Orden actualizada."),t.getDetalle(e.idOrdenCompra).success(h).error(i),e.ordenCompraDetalleTemp=null};e.ActualizarProducto=function(){null!=e.ordenCompraDetalleTemp?t.actualizar(e.ordenCompraDetalleTemp.idOrdenCompraDetalle,e.ordenCompraDetalleTemp.cantidad,e.ordenCompraDetalleTemp.precioUnitario,1).success(w).error(i):c.error("Debe seleccionar un producto.")},e.ActualizaEliminaProducto=function(e){confirm("¿Desea quitar este producto de la orden final?")&&t.actualizar(e.idOrdenCompraDetalle,e.cantidad,e.precioUnitario,0).success(w).error(i)};var M=function(o,r,a,t){c.success("Orden confirmada."),$("#btnConfirmaOrden").button("reset"),e.Reload(),$("#confirmOrdenCompra").modal("hide")};e.ConfirmarOrdenCompra=function(){if(confirm("¿Desea confirmar la orden y agendar a cuentas por pagar?")){var o=0;angular.forEach(e.listaOrdenCompra,function(e,r){o+=e.subTotal}),$("#btnConfirmaOrden").button("loading"),t.finaliza(e.idOrdenCompra,o,e.dt.format("yyyymmdd"),e.empleado.idEmpleado).success(M).error(i)}},e.today=function(){e.dt=new Date},e.clear=function(){e.dt=null},e.disabled=function(e,o){return"day"===o&&(-1===e.getDay()||7===e.getDay())},e.toggleMin=function(){e.minDate=e.minDate?null:(new Date).addYears(-1)},e.toggleMin(),e.open=function(o){o.preventDefault(),o.stopPropagation(),e.opened=!0},e.dateOptions={formatYear:"yy",startingDay:1},e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],e.format=e.formats[0];var z=function(o,r,a,t){e.Reload(),c.success("Transaccion realizada correctamente.")};e.PagarCuenta=function(e,o){1==e?confirm("¿Desea procesar el pago?")&&(o.estatus=e,n.put(o).success(z).error(i)):confirm("¿Desea cancelar el pago?")&&(o.estatus=e,n.put(o).success(z).error(i))}});