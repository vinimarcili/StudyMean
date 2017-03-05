(function(){
    var navigation = function(){
        return {
            restrict: 'EA',
            templateUrl: '/common/directive/navigation/navigation.template.html',
            controller: 'navigationCtrl as navvm'
        };
    };

    angular
        .module('loc8rApp')
        .directive('navigation', navigation);
})();