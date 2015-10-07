var envioUrl = global_settings.urlCORS + 'api/envioapi/';

registrationModule.factory('envioRepository', function ($http) {
    return {
        get: function (id) {
            return $http.get(envioUrl + id);
        },
        getRecibido: function (idContrato) {
            return $http.get(envioUrl + '2-' + idContrato);
        },
        getEntregado: function (idContrato, desde, hasta) {
            return $http.get(envioUrl + '3-' + idContrato + '-' + desde + '-' + hasta);
        },
        getMonitor: function () {
            return $http.get(envioUrl + '4-0');
        },
        cancelar: function (idEnvio,idEmpleado) {
            return $http.get(envioUrl + '5-' + idEnvio + '-' + idEmpleado);
        },
        getOverlap: function (desde,hasta) {
            return $http.get(envioUrl + '6-' + desde + '-' + hasta);
        },
        getEvents: function (fecha) {
            return $http.get(envioUrl + '7-' + fecha);
        },
        getList: function () {
            return $http.get(envioUrl + '8-0');
        },
        changeStage: function (idEnvio,stage) {
            return $http.get(envioUrl + '9-' + idEnvio + '-' + stage);
        },
        add: function (envio) {
            return $http.post(envioUrl, envio);
        },
        delete: function (envio) {
            return $http.delete(envioUrl + envio.idEnvio);
        },
        finalizaEnvio: function (envio) {
            return $http.put(envioUrl, envio);
        }
    };
});