var consumoUrl = global_settings.urlCORS + 'api/consumoapi/';
var reportURL = "https://edwinreports.jsreportonline.net/api/report";

registrationModule.factory('consumoRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(consumoUrl + id);
        },
        getConsumo: function (contrato,desde,hasta) {
            return $http.get(consumoUrl + '1-' + contrato + '-' + desde + '-' + hasta);
        },
        getReporte: function (contrato,desde,hasta,cliente) {
            return $http.get(consumoUrl + '3-'+ contrato + '-' + desde + '-' + hasta + '-' + cliente);
        },
        cancelar: function (id) {
            return $http.get(consumoUrl + '2-' + id);
        },
        add: function (consumo) {
            return $http.post(consumoUrl, consumo);
        },
        delete: function (consumo) {
            return $http.delete(consumoUrl + consumo.idConsumo);
        },
        update: function (consumo) {
            return $http.put(consumoUrl, consumo);
        }
    };
});