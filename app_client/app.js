(function(){
    angular.module('loc8rApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

    var config = function($routeProvider, $locationProvider, $qProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/about', {
                templateUrl: '/common/views/genericText.view.html',
                controller: 'aboutCtrl',
                controllerAs: 'vm'
            })
            .when('/location/:locationid', {
                templateUrl: '/locationDetail/locationDetail.view.html',
                controller: 'locationDetailCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $qProvider.errorOnUnhandledRejections(false);
    };

    angular
        .module('loc8rApp')
        .config(['$routeProvider', '$locationProvider', '$qProvider', config]);
})();