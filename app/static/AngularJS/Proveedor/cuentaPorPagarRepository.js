var cuentaporpagarUrl = global_settings.urlCORS + 'api/cuentaporpagarapi/';

registrationModule.factory('cuentaPorPagarRepository', function ($http) {
    return {
        getEmpty: function () {
            return $http.get(cuentaporpagarUrl + '0-0');
        },
        getAll: function () {
            return $http.get(cuentaporpagarUrl + '1-0');
        },
        add: function (ccp) {
            return $http.post(cuentaporpagarUrl, ccp);
        },
        delete: function () {
            return $http.delete(cuentaporpagarUrl);
        },
        put: function (ccp) {
            return $http.put(cuentaporpagarUrl, ccp);
        }
    };
});