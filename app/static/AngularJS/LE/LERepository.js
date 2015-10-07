var LEUrl = global_settings.urlCORS + 'api/leapi/';

registrationModule.factory('LERepository', function ($http) {
    return {
        getEmpty: function () {
            return $http.get(LEUrl + '0-0');
        },
        getLEBySucursal: function (sucursal) {
            return $http.get(LEUrl + '1-' + sucursal);
        },
        getLE: function () {
            return $http.get(LEUrl + '2-0');
        },
        eliminar: function (id) {
            return $http.get(LEUrl + '3-' + id);
        },
        add: function (le) {
            return $http.post(LEUrl, le);
        },
        delete: function () {
            return $http.delete(LEUrl);
        },
        put: function (le) {
            return $http.put(LEUrl, le);
        }
    };
});