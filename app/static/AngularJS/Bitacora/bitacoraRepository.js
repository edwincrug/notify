var bitacoraUrl = global_settings.urlCORS + 'api/bitacoraapi/';

registrationModule.factory('bitacoraRepository', function ($http) {
    return {
        get: function () {
            return $http.get(bitacoraUrl + '0-0');
        },
        getByEmpleado: function (empleado) {
            return $http.get(bitacoraUrl + '1-' + empleado);
        },
        add: function (empleado, nota) {
            return $http.post(bitacoraUrl + empleado + '-' + nota);
        },
        delete: function () {
            return $http.delete(bitacoraUrl);
        },
        put: function (bit) {
            return $http.put(bitacoraUrl, bit);
        }
    };
});