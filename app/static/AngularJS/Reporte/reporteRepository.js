var reporteUrl = global_settings.urlCORS + 'api/reporteapi/';    

registrationModule.factory('reporteRepository', function ($http) {
    return {
        getClientes: function (sucursal, contrato, tipo) {
            return $http.get(reporteUrl + '1-' + sucursal + '-' + contrato + '-' + tipo);
        },
        getFacturas: function (sucursal, contrato, tipo) {
            return $http.get(reporteUrl + '2-' + sucursal + '-' + contrato + '-' + tipo);
        },
        add: function (reporte) {
            return $http.post(reporteUrl, reporte);
        },
        delete: function (id) {
            return $http.delete(reporteUrl + id);
        },
        update: function (reporte) {
            return $http.put(reporteUrl, reporte);
        }
    };
});