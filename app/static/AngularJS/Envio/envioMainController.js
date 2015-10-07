registrationModule.controller("envioMainController", function ($scope, $rootScope, localStorageService, envioRepository, notificationFactory) {

    //Propiedades
    $scope.color = '#3a75c4';

    //Propiedades de reservación
    $scope.usingCalendar = false;
    $scope.horas = 0;
    $scope.desde = '';
    $scope.hasta = '';

    var calendar = null;
    var settings = null;

    var eventData;

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
    	$('#btnEnviar').button('reset');
        notificationFactory.error('Ocurrio un problema: ' + data.Message);
    }

    //Funciones
    //Callback
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
    			var title = 'Nuevo envío';
    			if (title) {
    				eventData = {
    					title: title,
    					start: start,
    					end: end,
    					id: 1
    			};

                $scope.currentEvent = eventData;
                $scope.MakeEvent();
						// calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
						// $scope.usingCalendar = true;
						// $scope.ShowDetail(start,end);
				}
					//calendar.fullCalendar('unselect');
			},
			eventColor: $scope.color,
			eventOverlap: false,
            timezone: 'UTC'
		};

		//Cargamos el calendario
		//Objeto de control de envío
		$scope.objetoEnvio = _Envio;

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

    };

    var RecargaCalendario = function() {
        //Limpio calendario
        calendar.fullCalendar('removeEvents');
        //Cargamos los eventos del calendario
        CargarCalendario($scope.dt); 
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
                    id: value.idEnvio
                },
                true
                );
          });
        }
        else
            notificationFactory.error('Error al obtener los eventos.');
    }

    //Carga los eventos del calendario de acuerdo a la selección
    var CargarCalendario = function (fecha) {
        //Tratamos la fecha
        var fechaString = fecha.format("yyyymmdd");
        //Obtengo la lista de reservaciones
        $scope.myPromise = envioRepository.getEvents(fechaString)
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
            $scope.objetoEnvio = _Envio;
            $scope.usingCalendar = false;
            calendar.fullCalendar('removeEvents', '1');
            notificationFactory.error('El horario elegido se traslapa con otro envío, elija otro.');
        }
    };

    //Verifica el overlap y crea el evento
    $scope.MakeEvent = function (){
        //Actualizamos el evento actual
        //Checo Overlap:
        $scope.myPromise = envioRepository.getOverlap($scope.currentEvent.start.format("YYYYMMDDHHmm"), $scope.currentEvent.end.format("YYYYMMDDHHmm"))
        .success(getOverlapSuccess)
        .error(errorCallBack);
    };


    $scope.active = function() {
        	return $scope.panes.filter(function(pane){
        		return pane.active;
        	})[0];

    };

    $scope.SetDate = function () {
        calendar = $('#room1').fullCalendar(settings);
        calendar.fullCalendar('gotoDate',$scope.dt);
        //CARGAMOS LOS ENVIOS
        RecargaCalendario();
    };

    $scope.ShowDetail = function () {

        $scope.desde = $scope.currentEvent.start.format("HH:mm");
        $scope.hasta = $scope.currentEvent.end.format("HH:mm");
        $scope.fecha = $scope.currentEvent.start.format('DD/MM/YYYY');

        $scope.objetoEnvio.desde = $scope.currentEvent.start;
        $scope.objetoEnvio.hasta = $scope.currentEvent.end;

        var t1 = $scope.currentEvent.start.toDate().getTime();
        var t2 = $scope.currentEvent.end.toDate().getTime();

        //Asigno las horas de reservación
        $scope.horas = ((t2-t1)/(3600*1000));

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
    var envioAddSuccess = function (data, status, headers, config) {
         if (data != null) {
            $('#btnEnviar').button('reset');
            notificationFactory.success('Envio procesado, folio: ' +  data);
            setTimeout(function(){ location.href = '/'; }, 1000);
        }
        else
            notificationFactory.error('Error al guardar el consumo.');
    };

    //Validaciones antes del envío
    var ValidaEnvio = function (destinatarios) {
        //Variable de control
        var output = true;

        if(destinatarios < 1){
            notificationFactory.error('Debe seleccionar un contacto.');
            output = false; 
        }

        if(!$scope.objetoEnvio.desde){
            notificationFactory.error('Debe elegir el periodo en el que se procesará el envío.');
            output = false;
        }

        if(!$scope.objetoEnvio.remitente){
            notificationFactory.error('Debe capturar el remitente.');
            output = false;
        }

        if(!$scope.objetoEnvio.destinatario){
            notificationFactory.error('Debe capturar el destinatario.');
            output = false;
        }

		if(!$scope.objetoEnvio.material){
            notificationFactory.error('Debe capturar el material.');
            output = false;
        }

		// if(!$scope.objetoEnvio.condiciones){
  //           notificationFactory.error('Debe capturar el condiciones.');
  //           output = false;
  //       }

		if(!$scope.objetoEnvio.lugar){
            notificationFactory.error('Debe capturar el lugar.');
            output = false;
        }
		

        return output;
    }

	$scope.Enviar = function () {
		//Variable para el manejo de la selección
        var destino = [];
        //Agregamos los elementos seleccionados a una lista
        angular.forEach($scope.gridOptions.selectedItems, function (value, key) {
            destino.push(value.mail);
        });
        //Valido la selacción de contactos
        if (ValidaEnvio(destino.length)) {
            //Bloqueo el boton
            $('#btnEnviar').button('loading');

            //Filtro los objetos de tipo contacto selecciondos
            $scope.objetoEnvio.contactos = Enumerable.From($scope.listaContacto)
              .Where(function (x) { return $.inArray(x.mail, destino) > -1 })
              .OrderBy(function (x) { return x.idContacto })
              .Select(function (x) { return x })
              .ToArray();

            //Lleno variables adicionales
            $scope.empleado = localStorageService.get('employeeLogged');
            $scope.objetoEnvio.idEmpleado = $scope.empleado.idEmpleado;
            $scope.objetoEnvio.idActa = $scope.cliente.idActa;

            //Envio la información al server con la maravilla de WEB API
            envioRepository.add($scope.objetoEnvio)
              .success(envioAddSuccess)
              .error(errorCallBack);

        }

	};
	
	//Limpia la selección actual
	$scope.Limpiar = function () {
		//Objeto de control de envío
		$scope.objetoEnvio = _Envio;
		$scope.usingCalendar = false;
		calendar.fullCalendar('removeEvents', '1');

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

