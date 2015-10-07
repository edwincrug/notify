var loginUrl = global_settings.urlCORS + 'api/loginapi/';

registrationModule.factory('loginRepository', function ($http) {
    return {
        get: function (usr,pwd) {
            return $http.get(loginUrl + usr + '/' + pwd + '/');
        },
        add: function (login) {
            return $http.post(loginUrl, login);
        },
        delete: function (login) {
            return $http.delete(loginUrl + login.idLogin);
        },
        update: function (login) {
            return $http.put(loginUrl, login);
        }
    };
});