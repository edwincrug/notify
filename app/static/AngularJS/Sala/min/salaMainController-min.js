registrationModule.controller("salaMainController",function(e,a,t,r,n){function o(){}e.color="#3a75c4",e.hasHotDesk=!1,e.usingCalendar=!1,e.horas=0,e.desde="",e.hasta="",e.sucursal=1,e.tipo=1;var l=null,s=null;o.prototype.name="",o.prototype.mail="",e.myData=[],e.gridOptions={data:"myData",columnDefs:[{field:"name",displayName:"Nombre"},{field:"mail",displayName:"Correo"}],selectedItems:[],keepLastSelected:!1};var i=function(e,a,t,r){$("#btnReservar").button("reset"),n.error("Ocurrio un problema: "+e.Message)},c=function(a,t,r,o){null!=a?(n.success("Saldo cargado"),e.saldo=a):n.error("Error al descargar el saldo.")};e.init=function(){a.cliente=t.get("clienteActual"),e.cliente=a.cliente,s={header:{left:"prev,next today",center:"title",right:"agendaDay"},editable:!0,defaultView:"agendaDay",isRTL:!1,height:550,allDaySlot:!1,selectable:!0,selectHelper:!0,select:function(a,t){if(e.usingCalendar)return alert("Debe limpiar la selección actual."),void l.fullCalendar("unselect");var r="Nuevo evento",n={title:r,start:a,end:t,id:1};e.currentEvent=n,e.MakeEvent()},eventColor:e.color,eventOverlap:!1,eventDrop:function(a,t,r,n,o,s){l.fullCalendar("removeEvents",1),e.currentEvent.start=a.start,e.currentEvent.end=a.end,e.MakeEvent()},eventResize:function(a,t,r,n,o,s){l.fullCalendar("removeEvents",1),e.currentEvent.start=a.start,e.currentEvent.end=a.end,e.MakeEvent()},timezone:"UTC"},e.objetoSala=_Sala,e.listaContacto=t.get("listaContacto"),angular.forEach(e.listaContacto,function(e,a){var t=new o;t.name=e.nombre,t.mail=e.mail,""!=t.mail&&this.push(t)},e.myData),e.myPromise=r.getSaldo(e.cliente.idContrato).success(c).error(i)},e.tabs=_Salas.delValle1.sala,e.SetDate=function(){l=$("#room1").fullCalendar(s),l.fullCalendar("gotoDate",e.dt),e.Refresh()},e.active=function(){return e.tabs.filter(function(e){return e.active})[0]},e.CambiaTab=function(){u()},e.Refresh=function(){switch(e.sucursal){case 1:switch(e.hasHotDesk=!1,e.tipo){case 1:e.tabs=_Salas.delValle1.sala;break;case 2:e.tabs=_Salas.delValle1.oficina;break;case 3:e.tabs=_Salas.delValle1.hot}break;case 2:switch(e.hasHotDesk=!0,e.tipo){case 1:e.tabs=_Salas.delValle2.sala;break;case 2:e.tabs=_Salas.delValle2.oficina;break;case 3:e.tabs=_Salas.delValle2.hot}}u()};var u=function(){l.fullCalendar("removeEvents"),setTimeout(function(){f(e.active().id,e.sucursal,e.dt),e.currentEvent&&e.MakeEvent()},100)},d=function(e,a,t,r){e?angular.forEach(e,function(e,a){l.fullCalendar("renderEvent",{title:e.titulo,start:e.desde,end:e.hasta,allDay:!1,id:e.idReservacion},!0)}):n.error("Error al obtener los eventos.")},f=function(a,t,n){var o=n.format("yyyymmdd");e.myPromise=r.getEvents(a,t,o).success(d).error(i)},m=function(a,t,r,o){0==a?(l.fullCalendar("renderEvent",e.currentEvent,!0),e.usingCalendar=!0,e.ShowDetail()):(e.objetoSala=_Sala,e.usingCalendar=!1,l.fullCalendar("removeEvents","1"),l.fullCalendar("unselect"),n.error("El horario elegido se traslapa con otro evento en esta sala, elija otra."))};e.MakeEvent=function(){e.myPromise=r.getOverlap(e.active().id,e.sucursal,e.currentEvent.start.format("YYYYMMDDHHmm"),e.currentEvent.end.format("YYYYMMDDHHmm")).success(m).error(i)},e.ShowDetail=function(){e.desde=e.currentEvent.start.format("HH:mm"),e.hasta=e.currentEvent.end.format("HH:mm"),e.fecha=e.currentEvent.start.format("DD/MM/YYYY");var a=e.currentEvent.start.toDate().getTime(),t=e.currentEvent.end.toDate().getTime();e.horas=(t-a)/36e5,e.costoPorHora=e.active().cost,e.subTotal=e.active().cost*e.horas,e.total=e.subTotal-e.saldo<0?0:e.subTotal-e.saldo,"$apply"!=e.$root.$$phase&&"$digest"!=e.$root.$$phase&&e.$apply()},e.Cancelar=function(){location.href="/"};var v=function(e,a,t,r){null!=e?($("#btnReservar").button("reset"),n.success("Reservación procesada, folio: "+e),setTimeout(function(){location.href="/"},1e3)):n.error("Error al guardar la reservación.")},b=function(a){var t=!0;return 1>a&&(n.error("Debe seleccionar un contacto."),t=!1),e.usingCalendar||(n.error("Debe elegir el periodo de la reservacion."),t=!1),t};e.Reservar=function(){var a=[];angular.forEach(e.gridOptions.selectedItems,function(e,t){a.push(e.mail)}),b(a.length)&&($("#btnReservar").button("loading"),e.objetoSala.contactos=Enumerable.From(e.listaContacto).Where(function(e){return $.inArray(e.mail,a)>-1}).OrderBy(function(e){return e.idContacto}).Select(function(e){return e}).ToArray(),e.empleado=t.get("employeeLogged"),e.objetoSala.idEmpleado=e.empleado.idEmpleado,e.objetoSala.idContrato=e.cliente.idContrato,e.objetoSala.sala=e.active().id,e.objetoSala.sucursal=e.sucursal,e.objetoSala.horas=e.horas,e.objetoSala.total=e.total,e.objetoSala.desde=e.currentEvent.start.format("YYYYMMDDHHmm"),e.objetoSala.hasta=e.currentEvent.end.format("YYYYMMDDHHmm"),r.add(e.objetoSala).success(v).error(i))},e.Limpiar=function(){e.objetoSala=_Sala,e.usingCalendar=!1,l.fullCalendar("removeEvents","1"),l.fullCalendar("unselect")},e.today=function(){e.dt=new Date},e.clear=function(){e.dt=null},e.disabled=function(e,a){return"day"===a&&(-1===e.getDay()||7===e.getDay())},e.toggleMin=function(){e.minDate=e.minDate?null:new Date,e.maxDate=e.maxDate?null:new Date((new Date).getFullYear(),(new Date).getMonth()+3,1)},e.toggleMin(),e.open=function(a){a.preventDefault(),a.stopPropagation(),e.opened=!0},e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],e.format=e.formats[0]});