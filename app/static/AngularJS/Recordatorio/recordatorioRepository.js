var recordatorioUrl = global_settings.urlCORS + 'api/recordatorioapi/';

registrationModule.factory('recordatorioRepository', function ($http) {
    return {
        get: function () {
            return $http.get(recordatorioUrl + '0-0');
        },
        getByEmpleado: function (empleado) {
            return $http.get(recordatorioUrl + '1-' + empleado);
        },
        actualizar: function (record, stage) {
            return $http.get(recordatorioUrl + '2-' + record + '-' + stage);
        },
        eliminar: function (record) {
            return $http.get(recordatorioUrl + '3-' + record);
        },
        add: function (empleado,nota) {
            return $http.post(recordatorioUrl + empleado + '-' + 'idContrato' + '-' + nota);
        },
        delete: function () {
            return $http.delete(recordatorioUrl);
        },
        put: function (rec) {
            return $http.put(recordatorioUrl, rec);
        }
    };
});