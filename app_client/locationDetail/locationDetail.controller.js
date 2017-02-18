(function(){
    var locationDetailCtrl = function($routeParams, loc8rData){
        var vm = this;

        vm.locationid = $routeParams.locationid;

        loc8rData.locationById(vm.locationid)
            .then(
                function successCallback(data) {
                    vm.data = {
                        location: data.data
                    };

                    vm.pageHeader = {
                        title: vm.data.location.name
                    };
                },
                function errorCallback(e) {
                    console.log(e);
                }
            );
    };

    locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];

    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);
})();