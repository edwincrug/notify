var salaUrl = global_settings.urlCORS + 'api/reservacionapi/';

registrationModule.factory('salaRepository', function ($http) {
    return {
        getReservacion: function (idContrato) {
            return $http.get(salaUrl + '2-' + idContrato);
        },
        getReservacionHoy: function (sucursal, fecha) {
            return $http.get(salaUrl + '1-' + sucursal + '-' + fecha);
        },
        getReservacionMonitor: function (sucursal) {
            return $http.get(salaUrl + '6-' + sucursal);
        },
        getReservacionQuitar: function (id,empleado) {
            return $http.get(salaUrl + '5-' + id + '-' + empleado);
        },
        getEvento: function (idContrato, desde, hasta) {
            return $http.get(salaUrl + '3-' + idContrato + '-' + desde + '-' + hasta);
        },
        getSaldo: function (idContrato) {
            return $http.get(salaUrl + '4-' + idContrato);
        },
        changeStage: function (idReservacion,stage) {
            return $http.get(salaUrl + '7-' + idReservacion + '-' + stage);
        },
        getEvents: function (sala,sucursal,fecha) {
            return $http.get(salaUrl + '8-' + sala + '-' + sucursal + '-' + fecha);
        },
        getOverlap: function (sala,sucursal,desde,hasta) {
            return $http.get(salaUrl + '9-' + sala + '-' + sucursal + '-' + desde + '-' + hasta);
        },
        add: function (sala) {
            return $http.post(salaUrl, sala);
        },
        reservar: function (empleado,contrato,sala,sucursal,horas,total,desde,hasta,comentarios) {
            return $http.get(salaUrl + '10-'+ empleado + '-' + contrato+ '-xxx-' + sala + '-' + sucursal  + '-' + desde + '-' + hasta + '-' + horas + '-' + total+ '-' + comentarios);
        },
        delete: function (sala) {
            return $http.delete(salaUrl + sala.idSala);
        },
        cancelaReservacion: function (sala) {
            return $http.put(salaUrl, sala);
        },
        terminarCierre: function (sala) {
            return $http.put(salaUrl, sala);
        },
        extenderSala: function (id,sala,desde,hasta) {
            return $http.get(salaUrl + '11-' + id + '-' + sala + '-' + desde + '-' + hasta);
        }
    };
});