var ordencompraUrl = global_settings.urlCORS + 'api/ordencompraapi/';

registrationModule.factory('ordenCompraRepository', function ($http) {
    return {
        getEmptyMaestro: function () {
            return $http.get(ordencompraUrl + '0-0');
        },
        getEmptyDetalle: function () {
            return $http.get(ordencompraUrl + '1-0');
        },
        getAll: function () {
            return $http.get(ordencompraUrl + '2-0');
        },
        getDetalle: function (id) {
            return $http.get(ordencompraUrl + '3-' + id);
        },
        actualizar: function (id,cantidad,precio,estatus) {
            return $http.get(ordencompraUrl + '4-' + id + '-' + cantidad + '-' + precio + '-' + estatus);
        },
        elimina: function (id) {
            return $http.post(ordencompraUrl + '5-' + id);
        },
        confirma: function (id) {
            return $http.get(ordencompraUrl + '6-' + id);
        },
        finaliza: function (id,subtotal,fecha,empleado) {
            return $http.get(ordencompraUrl + '7-' + id + '-' + subtotal + '-' + fecha + '-' + empleado);
        },
        add: function (occ) {
            return $http.post(ordencompraUrl, occ);
        },
        delete: function () {
            return $http.delete(ordencompraUrl);
        },
        put: function (occ) {
            return $http.put(ordencompraUrl, occ);
        }
    };
});