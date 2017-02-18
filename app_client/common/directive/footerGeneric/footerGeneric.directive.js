(function(){
    var footerGeneric = function(){
        return {
            restrict: 'EA',
            templateUrl: '/common/directive/footerGeneric/footerGeneric.template.html'
        };
    };

    angular
        .module('loc8rApp')
        .directive('footerGeneric', footerGeneric);
})();