var maps = angular.module('maps', ['ngRoute', 'ngMap']);

maps.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

maps.controller('mapController', function($scope, $location, NgMap) {
    $scope.fbhref=$location.absUrl();
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter().toString());
    });
});