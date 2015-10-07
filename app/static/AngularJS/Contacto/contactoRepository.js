var contactoUrl = global_settings.urlCORS + 'api/contactoapi/';

registrationModule.factory('contactoRepository', function ($http) {
    return {
        getAll: function () {
            return $http.get(contactoUrl + '0');
        },
        getAuto: function () {
            return $http.get(contactoUrl + '1');
        },
        getEmpty: function () {
            return $http.get(contactoUrl + '2');
        },
        add: function (contacto) {
            return $http.post(contactoUrl, contacto);
        },
        delete: function (idcontacto) {
            return $http.get(contactoUrl + '3-' + idcontacto);
            //return $http.delete(contactoUrl + contacto.idContacto);
        },
        update: function (contacto) {
            return $http.put(contactoUrl, contacto);
        }
    };
});