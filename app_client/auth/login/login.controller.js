(function(){

    var loginCtrl = function($location, authentication){
        var vm = this;

        vm.pageHeader = {
            title: 'Login'
        };

        vm.credentials = {
            email   :   '',
            password:   ''
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function(){
            vm.formError = '';

            if(!vm.credentials.email || !vm.credentials.password){
                vm.formError = "Todos os campos são obrigatórios";
                return false;
            } else {
                vm.doLogin();
            }
        };

        vm.doLogin = function(){
            vm.formError = "";

            authentication
                .login(vm.credentials)
                .then(function(response) {
                    if(response.status == 200){
                        $location.search('page', null);
                        $location.path(vm.returnPage);
                    } else {
                        vm.formError = response.statusText;
                    }
                }).catch(function(error) {
                    vm.formError = error.statusText;
                });
        };
    };

    loginCtrl.$inject = ['$location', 'authentication'];

    angular
        .module('loc8rApp')
        .controller('loginCtrl', loginCtrl);

})();