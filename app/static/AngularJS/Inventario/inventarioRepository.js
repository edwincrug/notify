var inventarioUrl = global_settings.urlCORS + 'api/inventarioapi/';

registrationModule.factory('inventarioRepository', function ($http) {
    return {
        get: function () {
            return $http.get(inventarioUrl + '0-0');
        },
        add: function () {
            return $http.post(inventarioUrl);
        },
        delete: function () {
            return $http.delete(inventarioUrl);
        },
        put: function () {
            return $http.put(inventarioUrl);
        }
    };
});