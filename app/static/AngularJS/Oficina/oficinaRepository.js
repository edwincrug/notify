var oficinaUrl = global_settings.urlCORS + 'api/oficinaapi/';

registrationModule.factory('oficinaRepository', function ($http) {
    return {
        getEmpty: function () {
            return $http.get(oficinaUrl + '0-0');
        },
        getOficina: function () {
            return $http.get(oficinaUrl + '2-0');
        },
        getOficinaBySucursal: function (sucursal) {
            return $http.get(oficinaUrl + '1-' + sucursal);
        },
        eliminar: function (id) {
            return $http.get(oficinaUrl + '3-' + id);
        },
        add: function (oficina) {
            return $http.post(oficinaUrl, oficina);
        },
        delete: function () {
            return $http.delete(oficinaUrl);
        },
        put: function (oficina) {
            return $http.put(oficinaUrl, oficina);
        }
    };
});