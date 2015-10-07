var sesionUrl = global_settings.urlCORS + 'api/sesionapi/';

registrationModule.factory('sesionRepository', function ($http) {
    return {
        get: function () {
            return $http.get(sesionUrl + '0-0');
        },
        getSesion: function (empleado) {
            return $http.get(sesionUrl + '3-' + empleado);
        },
        add: function (sesion) {
            return $http.post(sesionUrl, sesion);
        },
        delete: function () {
            return $http.delete(sesionUrl);
        },
        put: function (sesion) {
            return $http.put(sesionUrl, sesion);
        }
    };
});