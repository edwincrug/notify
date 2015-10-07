var autorizacionUrl = global_settings.urlCORS + 'api/autorizacionapi/';

registrationModule.factory('autorizacionRepository', function ($http) {
    return {
        getAll: function (empleado) {
            return $http.get(autorizacionUrl + '1-' + empleado);
        },
        aprobar: function (id,empleado,obs,approve) {
            return $http.get(autorizacionUrl + '2-' + id + '-' + empleado + '-' + obs + '-' + approve);
        },
        add: function (auth) {
            return $http.post(autorizacionUrl, auth);
        },
        delete: function () {
            return $http.delete(autorizacionUrl);
        },
        put: function (auth) {
            return $http.put(autorizacionUrl, auth);
        }
    };
});