var maps = angular.module('maps', ['ngRoute', 'ngMap', 'navbar']);

maps.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            })
            .when('/map', {
                templateUrl: 'views/map.html',
                controller: 'mapController'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }]);

maps.controller('mapController', function($scope, $location, NgMap) {
    $scope.fbhref=$location.absUrl();
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter().toString());
    });
});