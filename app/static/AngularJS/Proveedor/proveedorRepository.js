var proveedorUrl = global_settings.urlCORS + 'api/proveedorapi/';

registrationModule.factory('proveedorRepository', function ($http) {
    return {
        getEmpty: function () {
            return $http.get(proveedorUrl + '0-0');
        },
        getAll: function () {
            return $http.get(proveedorUrl + '1-0');
        },
        add: function (pro) {
            return $http.post(proveedorUrl, pro);
        },
        delete: function () {
            return $http.delete(proveedorUrl);
        },
        put: function (pro) {
            return $http.put(proveedorUrl, pro);
        }
    };
});