(function(){

    var authentication = function($http, $window){
        var saveToken = function(token){
            $window.localStorage['loc8r-token'] = token;
        };

        var getToken = function(){
            return $window.localStorage['loc8r-token'];
        };

        var register = function(user){
            return $http.post('/api/register', user).then(

                function successCallback(data) {
                    saveToken(data.token);
                },
                function errorCallback(e) {
                    console.log(e);
                }
            );
        };

        var login = function(user){
            return $http.post('/api/login', user).then(

                function successCallback(data) {
                    saveToken(data.token);
                },
                function errorCallback(e) {
                    console.log(e);
                }
            );
        };

        var logout = function(){
            $window.localStorage.removeItem('loc8r-token');
        };

        return {
            saveToken : saveToken,
            getToken  : getToken,
            register  : register,
            login     : login,
            logout    : logout
        };
    };

    authentication.$inject = ['$http', '$window'];

    angular
        .module('loc8rApp')
        .service('authentication', authentication);
})();