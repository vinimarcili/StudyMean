(function(){

    var registerCtrl = function($location, authentication){
        var vm = this;

        vm.pageHeader = {
            title: 'Criar nova conta'
        };

        vm.credentials = {
            name    :   '',
            email   :   '',
            password:   ''
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function(){
            vm.formError = '';

            if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password){
                vm.formError = "Todos os campos são obrigatórios";
                return false;
            } else {
                vm.doRegister();
            }
        };

        vm.doRegister = function(){
            vm.formError = "";

            authentication
                .register(vm.credentials)
                .then(
                    function successCallback() {
                        $location.search('page', null);
                        $location.path(vm.returnPage);
                    },
                    function errorCallback(e) {
                        vm.formError = e;
                    }
                );
        };
    };

    registerCtrl.$inject = ['$location', 'authentication'];

    angular
        .module('loc8rApp')
        .controller('registerCtrl', registerCtrl);

})();