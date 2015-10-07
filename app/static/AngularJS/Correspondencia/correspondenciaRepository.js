var correspondenciaUrl = global_settings.urlCORS + 'api/correspondenciaapi/';

registrationModule.factory('correspondenciaRepository', function ($http) {
    return {
        getR: function (id) {
            return $http.get(correspondenciaUrl + '0-' + id);
        },
        getE: function (id) {
            return $http.get(correspondenciaUrl + '1-' + id);
        },
        getRecibida: function (idContrato, desde, hasta) {
            return $http.get(correspondenciaUrl + '2-' + idContrato + '-' + desde + '-' + hasta);
        },
        getEntregada: function (idContrato, desde, hasta) {
            return $http.get(correspondenciaUrl + '3-' + idContrato + '-' + desde + '-' + hasta);
        },
        cancelar: function (idCorrespondencia,idEmpleado) {
            return $http.get(correspondenciaUrl + '4-' + idCorrespondencia + '-' + idEmpleado);
        },
        add: function (correspondencia) {
            return $http.post(correspondenciaUrl, correspondencia);
        },
        delete: function (correspondencia) {
            return $http.delete(correspondenciaUrl + correspondencia.idCorrespondencia);
        },
        put: function (correspondencia) {
            return $http.put(correspondenciaUrl, correspondencia);
        }
    };
});