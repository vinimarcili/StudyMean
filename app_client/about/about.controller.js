(function(){

    var aboutCtrl = function(){
        var vm = this;

        vm.pageHeader = {
            title: 'Sobre'
        };

        vm.main = {
            content: 'Descubra'
        };
    };

    angular
        .module('loc8rApp')
        .controller('aboutCtrl', aboutCtrl);
})();