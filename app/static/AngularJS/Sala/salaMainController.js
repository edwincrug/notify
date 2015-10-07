registrationModule.controller("salaMainController", function ($scope, $rootScope, localStorageService, salaRepository, notificationFactory) {

	//Propiedades
    $scope.color = '#3a75c4';

    //Deshabilitar HotDesking
    $scope.hasHotDesk = false;

    //Propiedades de reservación
    $scope.usingCalendar = false;
    $scope.horas = 0;
    $scope.desde = '';
    $scope.hasta = '';

    //Control de sucursal y tipo
    $scope.sucursal = 1;
    $scope.tipo = 1;

    var calendar = null;
    var settings = null;

    //OBjeto de contacto para los destinatarios de mail
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

    //Callback error
    var errorCallBack = function (data, status, headers, config) {
    	$('#btnReservar').button('reset');
        notificationFactory.error('Ocurrio un problema: ' + data.Message);
    }

    //Funciones
    //Callback
    var getSaldoSuccess = function (data, status, headers, config) {
     if (data != null) {
        notificationFactory.success('Saldo cargado');
        $scope.saldo = data;
    }
    else
        notificationFactory.error('Error al descargar el saldo.');
};

   //Ejecuta un paquete de funciones de inicio
   $scope.init = function () {
   		//Obtengo al clioente actual
   		$rootScope.cliente = localStorageService.get('clienteActual');
   		$scope.cliente = $rootScope.cliente

    	//Inicializo fullcalendar
    	settings = {
    		header: {
    			left: 'prev,next today',
    			center: 'title',
    			right: 'agendaDay'
    		},
    		editable: true,
    		defaultView: 'agendaDay',
    		isRTL: false,
    		height: 550,
    		allDaySlot: false,
    		selectable: true,
    		selectHelper: true,
    		select: function(start, end) {
    			if ($scope.usingCalendar){
    				alert('Debe limpiar la selección actual.');
    				calendar.fullCalendar('unselect');
    				return;
    			}
    			var title = 'Nuevo evento';
    			var eventData = {
    				title: title,
    				start: start,
    				end: end,
    				id: 1
    			};
                $scope.currentEvent = eventData;
                $scope.MakeEvent();
            },
            eventColor: $scope.color,
            eventOverlap: false,
            eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) {
                calendar.fullCalendar('removeEvents',1); 
                $scope.currentEvent.start = event.start;
                $scope.currentEvent.end = event.end;
                //Limpio calendario
                $scope.MakeEvent();
            },
            eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) { 
                calendar.fullCalendar('removeEvents',1);
                $scope.currentEvent.start = event.start;
                $scope.currentEvent.end = event.end;
                //Limpio calendario
                $scope.MakeEvent();
            },
            timezone: 'UTC'
        };

		//Cargamos el calendario
		//Objeto de control de envío
		$scope.objetoSala = _Sala;

		//Declaración de destinatarios para mail de confirmación
		//NG GRID

		//Obtenermos la lista de contacto
		$scope.listaContacto = localStorageService.get('listaContacto');

	    //Agrego los contactos del cliente seleccionado al grid
	    angular.forEach($scope.listaContacto, function (value, key) {
          var cont = new Contacto();
          cont.name = value.nombre;
          cont.mail = value.mail;
          if (cont.mail != '')
           this.push(cont);
   }, $scope.myData);

        //Limpiamos los campos que se van a mostrar en pantalla

        //Obtengo el saldo en salas
        $scope.myPromise = salaRepository.getSaldo($scope.cliente.idContrato)
        .success(getSaldoSuccess)
        .error(errorCallBack);
    };		

    $scope.tabs = _Salas.delValle1.sala;

    // $scope.active = function() {
    //     	return $scope.panes.filter(function(pane){
    //     		return pane.active;
    //     	})[0];

    // };

    //Establece una fecha en el calendario
    $scope.SetDate = function () {
     calendar = $('#room1').fullCalendar(settings);
     calendar.fullCalendar('gotoDate',$scope.dt);
     $scope.Refresh();
 };

    //Muestra la sala activa
    $scope.active = function() {
      return $scope.tabs.filter(function(tab){
          return tab.active;
      })[0];
  };

  $scope.CambiaTab = function() {
    RecargaCalendario();
}

$scope.Refresh = function () {
   switch ($scope.sucursal) {
    case 1:
    $scope.hasHotDesk = false;
    switch ($scope.tipo) {
     case 1:
     $scope.tabs = _Salas.delValle1.sala;
     break;
     case 2:
     $scope.tabs = _Salas.delValle1.oficina;
     break;
     case 3:
     $scope.tabs = _Salas.delValle1.hot;
     break;
 }
 break;
 case 2:
 $scope.hasHotDesk = true;
 switch ($scope.tipo) {
     case 1:
     $scope.tabs = _Salas.delValle2.sala;
     break;
     case 2:
     $scope.tabs = _Salas.delValle2.oficina;
     break;
     case 3:
     $scope.tabs = _Salas.delValle2.hot;
     break;
 }
 break;
}

RecargaCalendario();

};

var RecargaCalendario = function() {
        //Limpio calendario
        calendar.fullCalendar('removeEvents');

        //Cargamos los eventos del calendario
        setTimeout(function(){ 
            CargarCalendario($scope.active().id, $scope.sucursal, $scope.dt); 
            if($scope.currentEvent){
                $scope.MakeEvent();
            }
        }, 100);
    }

    //Fuincion success callback al obtener eventos
    var getEventsSuccess = function (data, status, headers, config) {
        if(data){
            angular.forEach(data, function(value, key) {
              calendar.fullCalendar('renderEvent',
              {
                title: value.titulo,
                    //start: new Date(resultado[item].anio1, resultado[item].mes1 - 1, resultado[item].dia1, resultado[item].hora1, resultado[item].minuto1, 0),
                    //end: new Date(resultado[item].anio2, resultado[item].mes2 - 1, resultado[item].dia2, resultado[item].hora2, resultado[item].minuto2, 0),
                    start: value.desde,
                    end: value.hasta,
                    allDay: false,
                    id: value.idReservacion
                },
                true
                );
          });
        }
        else
            notificationFactory.error('Error al obtener los eventos.');
    }

    //Carga los eventos del calendario de acuerdo a la selección
    var CargarCalendario = function (sala, sucursal, fecha) {
        //Tratamos la fecha
        var fechaString = fecha.format("yyyymmdd");
        //Obtengo la lista de reservaciones
        $scope.myPromise = salaRepository.getEvents(sala, sucursal, fechaString)
        .success(getEventsSuccess)
        .error(errorCallBack);
    }

    // Callback de check overlap
    var getOverlapSuccess = function (data, status, headers, config) {
        if(data == 0) {
                calendar.fullCalendar('renderEvent', $scope.currentEvent, true); // stick? = true
                $scope.usingCalendar = true;
                $scope.ShowDetail();
            }
            else {
                $scope.objetoSala = _Sala;
                $scope.usingCalendar = false;
                calendar.fullCalendar('removeEvents', '1');
                calendar.fullCalendar('unselect');
                notificationFactory.error('El horario elegido se traslapa con otro evento en esta sala, elija otra.');
            }
        };

    //Verifica el overlap y crea el evento
    $scope.MakeEvent = function (){
        //Actualizamos el evento actual
        //Obtenemos el detalle de fechas
        //Transformamos Moment.js to Date
        //$scope.objetoSala.desde = $scope.currentEvent.start.toDate();//new Date(start.year(), start.month(), start.date(), start.hour(), start.minutes());
        //$scope.objetoSala.hasta = $scope.currentEvent.end.toDate();//new Date(end.year(), end.month(), end.date(), end.hour(), end.minutes());;
        //Checo Overlap:
        $scope.myPromise = salaRepository.getOverlap($scope.active().id, $scope.sucursal, $scope.currentEvent.start.format("YYYYMMDDHHmm"), $scope.currentEvent.end.format("YYYYMMDDHHmm"))
        .success(getOverlapSuccess)
        .error(errorCallBack);
    };

    //construye el detalle del evento
    $scope.ShowDetail = function () {

        //Transformamos Moment.js to Date
        //$scope.objetoSala.desde = start.toDate();//new Date(start.year(), start.month(), start.date(), start.hour(), start.minutes());
        //$scope.objetoSala.hasta = end.toDate();//new Date(end.year(), end.month(), end.date(), end.hour(), end.minutes());;

        $scope.desde = $scope.currentEvent.start.format("HH:mm");
        $scope.hasta = $scope.currentEvent.end.format("HH:mm");
        $scope.fecha = $scope.currentEvent.start.format('DD/MM/YYYY');

        var t1 = $scope.currentEvent.start.toDate().getTime();
        var t2 = $scope.currentEvent.end.toDate().getTime();

        //Asigno las horas de reservación
        $scope.horas = ((t2-t1)/(3600*1000));

        //Calculo el detalle de la reservación
        $scope.costoPorHora = $scope.active().cost;
        $scope.subTotal = $scope.active().cost * $scope.horas;
        $scope.total  = ((($scope.subTotal - $scope.saldo) < 0) ? 0 : $scope.subTotal - $scope.saldo); 

        //Aplicamos el cambio si la funcion se invocó desde javascript
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }

    };
	//Cancela y vuelve a pantalla de clientes
	$scope.Cancelar = function () {
		location.href= '/';
	};

	//Fuinciones success callback
    var salaAddSuccess = function (data, status, headers, config) {
     if (data != null) {
        $('#btnReservar').button('reset');
        notificationFactory.success('Reservación procesada, folio: ' +  data);
        setTimeout(function(){ location.href = '/'; }, 1000);
    }
    else
        notificationFactory.error('Error al guardar la reservación.');
};

    //Validaciones antes del envío
    var ValidaReservacion = function (destinatarios) {
        //Variable de control
        var output = true;

        if(destinatarios < 1){
            notificationFactory.error('Debe seleccionar un contacto.');
            output = false; 
        }

        if(!$scope.usingCalendar){
            notificationFactory.error('Debe elegir el periodo de la reservacion.');
            output = false;
        }

        return output;
    }

    $scope.Reservar = function () {
		//Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (ValidaReservacion(destino.length)) {
            //Bloqueo el boton
            $('#btnReservar').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.objetoSala.contactos = Enumerable.From($scope.listaContacto)
            .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
            .OrderBy(function (x) { return x.idContacto })
            .Select(function (x) { return x })
            .ToArray();

            //Lleno variables adicionales
            $scope.empleado = localStorageService.get('employeeLogged');
            $scope.objetoSala.idEmpleado = $scope.empleado.idEmpleado;
            $scope.objetoSala.idContrato = $scope.cliente.idContrato;
            $scope.objetoSala.sala = $scope.active().id;
            $scope.objetoSala.sucursal = $scope.sucursal;
            $scope.objetoSala.horas = $scope.horas;
            $scope.objetoSala.total = $scope.total;
            $scope.objetoSala.desde = $scope.currentEvent.start.format("YYYYMMDDHHmm");
            $scope.objetoSala.hasta = $scope.currentEvent.end.format("YYYYMMDDHHmm");

            //Envio la información al server con la maravilla de WEB API
            //YYYY-MM-DDTHH:mm:ss
            //salaRepository.reservar($scope.objetoSala.idEmpleado,$scope.objetoSala.idContrato,$scope.objetoSala.sala,$scope.objetoSala.sucursal,$scope.objetoSala.horas,$scope.objetoSala.total,$scope.currentEvent.start.format("YYYYMMDDHHmm"),$scope.currentEvent.end.format("YYYYMMDDHHmm"),$scope.objetoSala.comentarios)
            salaRepository.add($scope.objetoSala)
            .success(salaAddSuccess)
            .error(errorCallBack);
        }
    };

	//Limpia la selección actual
	$scope.Limpiar = function () {
		//Objeto de control de envío
		$scope.objetoSala = _Sala;
		$scope.usingCalendar = false;
		calendar.fullCalendar('removeEvents', '1');
        calendar.fullCalendar('unselect');
	};

	//Funciones de calendario
	//-----------------------------------
	$scope.today = function() {
		$scope.dt = new Date();
	};
	//$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === -1 || date.getDay() === 7 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
		$scope.maxDate = $scope.maxDate ? null : new Date(new Date().getFullYear(),new Date().getMonth() + 3 ,1);
	};
	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};
	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];



});

