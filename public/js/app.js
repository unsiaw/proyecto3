var mainApp = angular.module('maps', ['ngRoute', 'ngMap', 'ngFlash', 'angular-jwt', 'ngTagsInput']);

mainApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 'jwtOptionsProvider',
    function($routeProvider, $locationProvider, $httpProvider, jwtOptionsProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                as: 'lc'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController',
                as: 'rc'
            })
            .when('/map', {
                templateUrl: 'views/map.html',
                controller: 'MapController',
                resolve: {
                    ongs: function(OngService) {
                        return OngService.getOngs();
                    }
                }
            })
            .when('/about', {
                templateUrl: 'views/about.html'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html'
            })
            .when('/credits', {
                templateUrl: 'views/credits.html'
            })
            .when('/', {
                templateUrl: 'views/index.html'
            })
            .when("/ongs", {
                templateUrl: "views/list-ong.html",
                controller: "ListOngController",
                resolve: {
                    ongs: function(OngService) {
                        return OngService.getOngs();
                    }
                }
            })
            .when("/add/ong", {
                controller: "NewOngController",
                templateUrl: "views/ong-form.html",
                requiresLogin: true
            })
            .when("/edit/ong/:ongId", {
                controller: "EditOngController",
                templateUrl: "views/ong.html"
            })
            .when("/specs/ong/:ongId", {
                controller: "SpecsOngController",
                templateUrl: "views/specs-ong.html"
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');

        jwtOptionsProvider.config({
            tokenGetter: ['options', function(options) {
                return localStorage.getItem('mean-token');
            }],
            unauthenticatedRedirectPath: '/login',
            unauthenticatedRedirector: ['$location', function($location) {
                $location.path('/login')
            }]
        });
        $httpProvider.interceptors.push('jwtInterceptor');
    }]);

mainApp.run(['$rootScope', '$location', 'AuthService', 'authManager', function($rootScope, $location, AuthService, authManager) {
    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
    /*
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if ($location.path() === '/map' && !AuthService.isLoggedIn()) {
            $location.path('/');
        }
    });
    */
}]);
