registrationModule.controller("correoController",function(e,t,a,n){e.fechadesdeBuzon=new Date,e.fechahastaBuzon=new Date;var o=function(e,a){n.success("Datos buzon cargados"),t.listaBuzon=e,$("#btnBuscarBuzon").button("reset")},s=function(e,t,a,o){n.error("Ocurrio un problema")},u=function(){var t=e.fechadesdeBuzon.format("yyyymmdd"),n=e.fechahastaBuzon.format("yyyymmdd");$("#btnBuscarBuzon").button("loading"),a.getAll(e.cliente.idContrato,t,n).success(o).error(s)};e.today=function(){e.dt1=new Date,e.dt2=new Date},e.today(),e.clear=function(){e.dt1=null,e.dt2=null},e.disabled=function(e,t){return"day"===t&&(-1===e.getDay()||7===e.getDay())},e.toggleMin=function(){e.minDate=e.minDate?null:(new Date).addYears(-1)},e.toggleMin(),e.open1=function(t){t.preventDefault(),t.stopPropagation(),e.opened1=!0},e.open2=function(t){t.preventDefault(),t.stopPropagation(),e.opened2=!0},e.dateOptions={formatYear:"yy",startingDay:1},e.initDate=new Date("2016-15-20"),e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"],e.format=e.formats[0],e.toggleSemana=function(t){t.preventDefault(),t.stopPropagation(),e.status.isopen=!e.status.isopen,e.labelDrop="Esta semana",e.fechadesdeBuzon=(new Date).addDays(-7),e.fechahastaBuzon=new Date,u()},e.toggleMes=function(t){t.preventDefault(),t.stopPropagation(),e.status.isopen=!e.status.isopen,e.labelDrop="Último mes",e.fechadesdeBuzon=(new Date).addMonths(-1),e.fechahastaBuzon=new Date,u()},e.toggleHoy=function(t){t.preventDefault(),t.stopPropagation(),e.status.isopen=!e.status.isopen,e.fechadesdeBuzon=new Date,e.fechahastaBuzon=new Date,e.labelDrop="El día de hoy",u()},e.labelDrop="Esta semana",e.Buscar=function(){e.fechadesdeBuzon=e.dt2,e.fechahastaBuzon=e.dt1,u()}});