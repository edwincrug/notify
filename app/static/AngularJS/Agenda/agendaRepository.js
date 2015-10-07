var agendaUrl = global_settings.urlCORS + 'api/agendaapi/';

registrationModule.factory('agendaRepository', function ($http) {
    return {
        get: function () {
            return $http.get(agendaUrl + '0-0');
        },
        getByEmpleado: function (empleado, fecha) {
            return $http.get(agendaUrl + '1-' + empleado + '-' + fecha);
        },
        eliminar: function (id) {
            return $http.get(agendaUrl + '2-' + id);
        },
        add: function (empleado,desde,hasta,nota) {
            return $http.post(agendaUrl + empleado + '-' + 'idContrato' + '-' + desde + '-' + hasta + '-' + nota);
        },
        delete: function () {
            return $http.delete(agendaUrl);
        },
        put: function (age) {
            return $http.put(agendaUrl, age);
        }
    };
});