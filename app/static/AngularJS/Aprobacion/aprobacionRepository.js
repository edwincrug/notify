var aprobacionUrl = '/api/aprobacionapi/';

registrationModule.factory('aprobacionRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(aprobacionUrl + '1|' + id);
        },
        add: function (notificacion,empleado,observacion,aprobacion) {
            return $http.post(aprobacionUrl + '1|' + notificacion + '|' + empleado + '|' + aprobacion + '|' + observacion);
        },
        delete: function (obj) {
            return $http.delete(aprobacionUrl + obj.id);
        },
        update: function (id) {
            return $http.put(aprobacionUrl + '1|' + id);
        }
    };
});