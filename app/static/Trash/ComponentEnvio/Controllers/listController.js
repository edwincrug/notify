envioModule.controller("mainController", function ($scope, $rootScope, localStorageService, notificationFactory, envioRepository) {

    //Propiedades
    //Lista de propiedades de clase
    $scope.semilla = "";
    $scope.semillaServicio = "";
    // $scope.clientes = dataRepository.objetos;
    $scope.base = true;
    //$scope.empleado = dataRepository.empleado;
    $scope.info = "Me lleva la riata";
    //Selector de tipo para Correspondencia
    $scope.radioCorrespondenciaModel = null;


    
    
    $scope.Colgar = function () {
        $scope.inCall = false;
    };


});



