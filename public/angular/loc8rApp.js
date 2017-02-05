angular.module('loc8rApp', []);


/* Verify if is Number */
var _isNumeric = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

/* Format distance */
var formatDistance = function(){
    return function (distance) {
        var numDistance,
            unit;

        if (distance && _isNumeric(distance)) {
            if (distance > 1) {
                numDistance = parseFloat(distance).toFixed(1);
                unit = 'km';
            } else {
                numDistance = parseInt(distance * 1000, 10);
                unit = 'm';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    };
};

var ratingStars = function(){
    return {
        scope: {
          thisRating: '=rating'
        },
        templateUrl: "/angular/imports/rating-starts.html"
    };
};

var geoLocation = function(){
  var getPosition = function(cbSuccess, cbError, cbNoGeo){
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      } else {
          cbNoGeo();
      }
  };
  return {
      getPosition : getPosition
  };
};

var loc8rData = function($http){
    var locationByCoords = function(lat, lng){
        return $http.get('/api/locations?lng='+ lng +'&lat=' +lat+ '&maxDistance=10000');
    };

    return {
        locationByCoords : locationByCoords
    };
};

var locationListCtrl = function($scope, loc8rData, geoLocation){
    $scope.message = "Verificando sua localização.";

    $scope.getData = function(position){
        var lat = position.coords.latitude,
            lng = position.coords.longitude;

        $scope.message = "Procurando por locais próximos a você.";

        loc8rData
            .locationByCoords(lat, lng)
            .then(
                function successCallback(response) {
                    $scope.message = response.data.length > 0 ? "" : "Sem estabelecimentos próximos a você :(";
                    $scope.data = {
                        locations: response.data
                    };
                },
                function errorCallback(response) {
                    console.log(response);
                    $scope.message = "Tente novamente mais tarde :/";
                }
            );
    };

    $scope.showError = function(error){
        $scope.$apply(function(){
            $scope.message = error.message;
        });
    };

    $scope.noGeo = function(){
        $scope.$apply(function(){
            $scope.message = "Geolocalização não suportada pelo navegador!"
        });
    };

    geoLocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};

angular
    .module('loc8rApp')
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('loc8rData', loc8rData)
    .service('geoLocation', geoLocation);