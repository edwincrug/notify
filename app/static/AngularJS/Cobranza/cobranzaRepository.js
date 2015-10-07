var cobranzaUrl = global_settings.urlCORS + 'api/cobranzaapi/';

registrationModule.factory('cobranzaRepository', function ($http) {
    return {
        getDatos: function (id) {
            return $http.get(cobranzaUrl + '0-' + id);
        },
        getFacturas: function (id) {
            return $http.get(cobranzaUrl + '1-' + id);
        },
        getFacturasByCliente: function (id) {
            return $http.get(cobranzaUrl + '2-' + id);
        },
        getFacturasByFolio: function (id) {
            return $http.get(cobranzaUrl + '3-' + id);
        },
        getPromocion: function () {
            return $http.get(cobranzaUrl + '4-0');
        },
        Pagar: function (id, referencia, monto, fecha, recibo) {
            return $http.post(cobranzaUrl + '0-' + id + '-' + referencia + '-' + monto + '-' + fecha + '-' + (recibo ? 1 : 0) + '- ');
        },
        delete: function (id) {
            return $http.delete(cobranzaUrl + id);
        },
        update: function (cobranza) {
            return $http.put(cobranzaUrl, cobranza);
        }
    };
});