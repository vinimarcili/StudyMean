(function(){
    var homeCtrl = function($scope, loc8rData, geolocation){
        var vm = this;

        vm.pageHeader = {
            title: 'Loc8r',
            strapline: 'Aqui é bodybuilder PORRA'
        };

        vm.sidebar = {
            content: "Aside"
        };

        vm.message = "Checando sua localização";

        vm.getData = function(position){
            var lat = position.coords.latitude,
                lng = position.coords.longitude;

            vm.message = "Procurando pelas proximidades";

            loc8rData.locationByCoords(lat, lng)
                .then(
                    function successCallback(response) {
                        vm.message = response.data.length > 0 ? "" : "Sem estabelecimentos próximos a você :(";
                        vm.data = {
                            locations: response.data
                        };
                    },
                    function errorCallback(response) {
                        console.log(response);
                        vm.message = "Tente novamente mais tarde :/";
                    }
                );
        };

        vm.showError = function(error){
            $scope.$apply(function(){
                vm.message = error.message;
            });
        };

        vm.neoGeo = function(){
            $scope.$apply(function(){
                vm.message = "Geolocalização não suportada pelo navegador";
            });
        };

        geolocation.getPosition(vm.getData, vm.showError, vm.neoGeo);
    };

    homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];

    angular
        .module('loc8rApp')
        .controller('homeCtrl', homeCtrl);
})();