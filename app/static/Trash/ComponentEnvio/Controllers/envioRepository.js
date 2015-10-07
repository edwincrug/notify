var envioUrl = global_settings.urlCORS + 'api/envioapi/';

envioModule.factory('envioRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(contratoUrl + '0-' + id);
        },
        add: function (contrato) {
            return $http.post(contratoUrl, contrato);
        },
        delete: function (contrato) {
            return $http.delete(contratoUrl + contrato.idContrato);
        },
        put: function (idcontrato, sucursal, tipo, estatus) {
            return $http.put(contratoUrl + idcontrato + '-' + sucursal + '-' + tipo + '-' + estatus);
        }
    };
});