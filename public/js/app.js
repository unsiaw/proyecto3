var mainApp = angular.module('maps', ['ngRoute', 'ngMap', 'ngFlash']);

mainApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl',
                as: 'lc'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerCtrl',
                as: 'rc'
            })
            .when('/map', {
                templateUrl: 'views/map.html',
                controller: 'mapCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }]);

mainApp.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if ($location.path() === '/map' && !AuthService.isLoggedIn()) {
            $location.path('/');
        }
    });
}]);