var servicioUrl = global_settings.urlCORS + 'api/servicioapi/';

registrationModule.factory('servicioRepository', function ($http) {
    return {
        getServicios: function () {
            return $http.get(servicioUrl + '0-0');
        },
        getProductos: function () {
            return $http.get(servicioUrl + '1-0');
        },
        getAutocomplete: function () {
            return $http.get(servicioUrl + '2-0');
        },
        getServicioEmpty: function () {
            return $http.get(servicioUrl + '3-0');
        },
        add: function (servicio) {
            return $http.post(servicioUrl, servicio);
        },
        delete: function (id) {
            return $http.delete(servicioUrl + id);
        },
        update: function (servicio) {
            return $http.put(servicioUrl, servicio);
        }
    };
});