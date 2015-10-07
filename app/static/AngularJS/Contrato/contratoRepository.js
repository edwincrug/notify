var contratoUrl = global_settings.urlCORS + 'api/contratoapi/';

registrationModule.factory('contratoRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(contratoUrl + '0-' + id);
        },
        getRetencion: function () {
            return $http.get(contratoUrl + '2-0');
        },
        getPDF: function (empleado,contrato,representante,acta) {
            return $http.get(contratoUrl + '1-' + empleado + '-' + contrato + '-' + representante + '-' + acta);
        },
        add: function (contrato) {
            return $http.post(contratoUrl, contrato);
        },
        delete: function (contrato) {
            return $http.delete(contratoUrl + contrato.idContrato);
        },
        put: function (idcontrato, sucursal, empleado, tipo, estatus, motivo) {
            return $http.put(contratoUrl + idcontrato + '-' + sucursal + '-' + empleado + '-' + tipo + '-' + estatus + '-' + motivo);
        }
    };
});