var conversacionUrl = '/api/conversacionapi/';

registrationModule.factory('conversacionRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(conversacionUrl + '1|' + id);
        },
        add: function (notificacion,empleado,comentario) {
            return $http.post(conversacionUrl + '1|' + notificacion + '|' + empleado + '|' + comentario);
        },
        delete: function (obj) {
            return $http.delete(conversacionUrl + obj.id);
        },
        update: function (id) {
            return $http.put(conversacionUrl + '1|' + id);
        }
    };
});