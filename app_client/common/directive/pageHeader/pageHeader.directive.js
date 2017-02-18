(function(){
    var pageHeader = function(){
        return{
            restrict: 'EA',
            scope: {
                content: '=content'
            },
            templateUrl: '/common/directive/pageHeader/PageHeader.template.html'
        };
    };

    angular
        .module('loc8rApp')
        .directive('pageHeader', pageHeader);
})();