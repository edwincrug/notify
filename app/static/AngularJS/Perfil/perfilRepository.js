var perfilUrl = global_settings.urlCORS + 'api/perfilapi/';

registrationModule.factory('perfilRepository', function ($http) {
    return {
        get: function () {
            return $http.get(perfilUrl + '0-0');
        },
        add: function () {
            return $http.post(perfilUrl);
        },
        delete: function () {
            return $http.delete(perfilUrl);
        },
        put: function () {
            return $http.put(perfilUrl);
        }
    };
});