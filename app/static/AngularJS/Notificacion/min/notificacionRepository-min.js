﻿var notificacionUrl = global_settings.urlCORS + '/api/notificacionapi/';

registrationModule.factory('notificacionRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(notificacionUrl + '1|' + id);
        },
        // add: function (obj) {
        //     return $http.post(notificacionUrl, obj);
        // },
        // delete: function (obj) {
        //     return $http.delete(notificacionUrl + obj.id);
        // },
        update: function (id) {
            return $http.post(notificacionUrl + '2|' + id);
        }
    };
});

