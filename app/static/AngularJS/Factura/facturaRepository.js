var facturaUrl = global_settings.urlCORS + 'api/facturaapi/';

registrationModule.factory('facturaRepository', function ($http) {
    return {
        getEmpty: function () {
            return $http.get(facturaUrl + '0');
        },
        getServicioEmpty: function () {
            return $http.get(facturaUrl + '1');
        },
        eventual: function (factura) {
            return $http.post(facturaUrl, factura);
        },
        delete: function (id, empleado, motivo) {
            return $http.delete(facturaUrl + id + '-' + empleado + '-' + motivo);
        },
        promocion: function (contrato, promocion, desde, hasta, pago,cuenta) {
            return $http.put(facturaUrl + contrato + '-' + promocion + '-' + desde + '-' +  hasta + '-' +  pago + '-' + cuenta);
        }
    };
});