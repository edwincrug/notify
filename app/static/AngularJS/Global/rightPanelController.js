registrationModule.controller("rightPanelController", function ($scope, $rootScope, localStorageService, notificationFactory) {

    //Propiedades


    //Funciones CallBack

    //Funciones
    $scope.Exit = function () {
		localStorageService.set('ultimaCarga', null);
    }


});