var empleadoUrl = global_settings.urlCORS + 'api/empleadoapi/';

registrationModule.factory('empleadoRepository', function ($http) {
    return {
        getEmpleado: function () {
            return $http.get(empleadoUrl + '1-0');
        },
        getEmpty: function () {
            return $http.get(empleadoUrl + '0-0');
        },
        add: function (emp) {
            return $http.post(empleadoUrl, emp);
        },
        delete: function () {
            return $http.delete(empleadoUrl);
        },
        put: function (emp) {
            return $http.put(empleadoUrl, emp);
        }
    };
});