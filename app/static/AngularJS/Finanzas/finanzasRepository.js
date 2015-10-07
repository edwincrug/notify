var finanzasUrl = global_settings.urlCORS + 'api/finanzasapi/';

registrationModule.factory('finanzasRepository', function ($http) {
    return {
        get: function () {
            return $http.get(finanzasUrl + '0-0');
        },
        add: function () {
            return $http.post(finanzasUrl);
        },
        delete: function () {
            return $http.delete(finanzasUrl);
        },
        put: function () {
            return $http.put(finanzasUrl);
        }
    };
});