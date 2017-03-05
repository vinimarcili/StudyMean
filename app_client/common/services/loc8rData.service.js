(function(){
    var loc8rData = function($http, authentication){
        var locationByCoords = function(lat, lng){
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=10000')
        };

        var locationById = function(locationid){
            return $http.get('/api/locations/' + locationid);
        };

        var addReviewById = function(locationid, data){
            return $http.post('/api/locations/' + locationid + '/reviews', data, {
                headers:{
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        return {
            locationByCoords : locationByCoords,
            locationById : locationById,
            addReviewById : addReviewById
        };
    };

    loc8rData.$inject = ['$http', 'authentication'];

    angular
        .module('loc8rApp')
        .service('loc8rData', loc8rData);
})();