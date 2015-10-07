var administracionUrl = global_settings.urlCORS + 'api/administracionapi/';

registrationModule.factory('administracionRepository', function ($http) {
    return {
        get: function () {
            return $http.get(administracionUrl + '0-0');
        },
        add: function () {
            return $http.post(administracionUrl);
        },
        delete: function () {
            return $http.delete(administracionUrl);
        },
        put: function () {
            return $http.put(administracionUrl);
        }
    };

    
});