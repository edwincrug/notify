registrationModule.controller("solosController", function ($scope, $rootScope, salaRepository, notificationFactory) {

    $scope.Procesar = function () {
        if(confirm('¿Desea procesar el pago para esta reservación?'))
        {

        }
    };

    $scope.Eliminar = function () {
        if (confirm('¿Desea cancelar esta reservación?')) {

        }
    };

});