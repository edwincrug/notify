registrationModule.controller("agendaController",function(e,a,n,t,o){var d=function(e,a,n,t){o.error("Ocurrio un problema "+e.message)};e.MostrarCalendario=function(){$("#viewAgenda").modal("show")};var r=function(e,n,t,d){o.success("Evento guardado correctamente."),$("#btnNewAgenda").button("reset"),$("#viewAgenda").modal("hide"),a.RootReload()};e.NewAgenda=function(){a.empleado=t.get("employeeLogged"),e.empleado=a.empleado;var o=new Date(e.fechaAgenda.getFullYear(),e.fechaAgenda.getMonth(),e.fechaAgenda.getDate(),e.desdeAgenda.getHours(),e.desdeAgenda.getMinutes(),0,0),g=new Date(e.fechaAgenda.getFullYear(),e.fechaAgenda.getMonth(),e.fechaAgenda.getDate(),e.hastaAgenda.getHours(),e.hastaAgenda.getMinutes(),0,0);$("#btnNewAgenda").button("loading"),n.add(e.empleado.idEmpleado,o.format("yyyymmddHHMM"),g.format("yyyymmddHHMM"),e.notaAgenda).success(r).error(d)};var g=function(e,n,t,d){o.success("Evento eliminado correctamente."),a.RootReload()};e.EliminarAgenda=function(e){confirm("¿Desea eliminar este evento de la agenda?")&&n.eliminar(e.idAgenda).success(g).error(d)},e.hstep=1,e.mstep=1,e.desdeAgenda=new Date,e.hastaAgenda=new Date,e.ismeridian=!1,e.today=function(){e.fechaAgenda=new Date},e.today(),e.clear=function(){e.fechaAgenda=null},e.disabled=function(e,a){return"day"===a&&(-1===e.getDay()||7===e.getDay())},e.toggleMin=function(){e.minDate=e.minDate?null:(new Date).addYears(-1)},e.toggleMin(),e.open=function(a){a.preventDefault(),a.stopPropagation(),e.opened=!0},e.dateOptions={formatYear:"yy",startingDay:1},e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],e.format=e.formats[0]});