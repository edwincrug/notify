var homeUrl = global_settings.urlCORS + 'api/homeapi/';

registrationModule.factory('homeRepository', function ($http) {
    return {
        get: function (usr,pwd) {
            return $http.get(homeUrl + usr + '/' + pwd + '/');
        },
        getPublicaciones: function (empleado) {
            return $http.get(homeUrl + '1-' + empleado);
        },
        addPublicacion: function (publicacion) {
            return $http.post(homeUrl, publicacion);
        },
        delete: function (login) {
            return $http.delete(homeUrl + login.idLogin);
        },
        update: function (login) {
            return $http.put(homeUrl, login);
        }
    };
});