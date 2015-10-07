var errorUrl = '/api/errorapi/';

registrationModule.factory('errorRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(errorUrl + '1|' + id);
        },
        add: function (obj) {
            return $http.post(errorUrl, obj);
        },
        delete: function (obj) {
            return $http.delete(errorUrl + obj.id);
        },
        update: function (id) {
            return $http.put(errorUrl + '2|' + id);
        }
    };
});