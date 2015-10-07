var correoUrl = global_settings.urlCORS + 'api/correoapi/';

registrationModule.factory('correoRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(correoUrl + '0-' + id);
        },
        getAll: function (idContrato, desde, hasta) {
            return $http.get(correoUrl + '1-' + idContrato + '-' + desde + '-' + hasta);
        },
        add: function (correo) {
            return $http.post(correoUrl, correo);
        },
        delete: function (correo) {
            return $http.delete(correoUrl + correo.idCorreo);
        },
        put: function (correo) {
            return $http.put(correoUrl, correo);
        }
    };
});