registrationModule.controller("empleadoController",function(e,a,o,t,p){var l=function(e,a,o,t){$("#btnGuardarEmpleado").button("reset"),p.error("Ocurrio un problema "+e.message)},r=function(a,o,t,l){e.listaEmpleados=a,p.success("Lista de empleados cargada")},m=function(a,o,t,p){e.empleadoTemp=a,e.empleadoTemp.idArea=1,e.empleadoTemp.idDepartamento=1,e.empleadoTemp.nombre="",e.empleadoTemp.apellidoPaterno="",e.empleadoTemp.apellidoMaterno="",e.empleadoTemp.email="",e.empleadoTemp.usuario="",e.empleadoTemp.contrasena="",e.empleadoTemp.estatus=1,e.empleadoTemp.sexo=1,$("#viewEmpleado").modal("show")};e.init=function(){e.Reload(),$('[data-toggle="tooltip"]').tooltip()},e.Reload=function(){o.getEmpleado().success(r).error(l)},e.EditarEmpleado=function(a){e.empleadoTemp=a,$("#viewEmpleado").modal("show")},e.NuevoEmpleado=function(){o.getEmpty().success(m).error(l)};var d=function(a,o,t,l){p.success("Empleado agregado correctamente"),$("#btnGuardarEmpleado").button("reset"),$("#viewEmpleado").modal("hide"),e.Reload()},n=function(a,o,t,l){p.success("Empleado actualizado correctamente"),$("#btnGuardarEmpleado").button("reset"),$("#viewEmpleado").modal("hide"),e.Reload()};e.GuardarEmpleado=function(){$("#btnGuardarEmpleado").button("loading"),e.empleadoTemp.idEmpleado>0?o.put(e.empleadoTemp).success(n).error(l):o.add(e.empleadoTemp).success(d).error(l)},e.toggleArea=function(a,o){a.preventDefault(),a.stopPropagation(),e.status.isopen1=!e.status.isopen1,e.empleadoTemp.idArea=o,e.labelArea=a.target.innerText},e.labelArea="Gerencia",e.toggleDepartamento=function(a,o){a.preventDefault(),a.stopPropagation(),e.status.isopen2=!e.status.isopen2,e.empleadoTemp.idDepartamento=o,e.labelDepartamento=a.target.innerText},e.labelDepartamento="Gerencia Operativa"});