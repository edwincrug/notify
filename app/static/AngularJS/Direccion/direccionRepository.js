var direccionUrl = global_settings.urlCORS + 'api/direccionapi/';

registrationModule.factory('direccionRepository', function ($http) {
    return {
        get: function () {
            return $http.get(direccionUrl + '0');
        },
        getEmpty: function () {
            return $http.get(direccionUrl + '1');
        },
        add: function (direccion) {
            return $http.post(direccionUrl, direccion);
        },
        delete: function (iddireccion) {
            return $http.get(direccionUrl + '2-' + iddireccion);
            //return $http.delete(direccionUrl + iddireccion);
        },
        update: function (direccion) {
            return $http.put(direccionUrl, direccion);
        }
    };
});