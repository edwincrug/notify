var clienteUrl = global_settings.urlCORS + 'api/clienteapi/';

registrationModule.factory('clienteRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(clienteUrl + id);
        },
        getFull: function (id) {
            return $http.get(clienteUrl + '1');
        },
        getAutocomplete: function (id) {
            return $http.get(clienteUrl + '2');
        },
        getByID: function (id) {
            return $http.get(clienteUrl + '3-' + id);
        },
        add: function (cliente) {
            return $http.post(clienteUrl, cliente);
        },
        delete: function (cliente) {
            return $http.delete(clienteUrl + cliente.idCliente);
        },
        update: function (cliente) {
            return $http.put(clienteUrl, cliente);
        }
    };
});