mainApp.controller('mapCtrl', function($scope, $location, NgMap) {
    $scope.fbhref=$location.absUrl();
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter().toString());
    });
});

mainApp.controller('loginCtrl', ['$scope', '$location', 'Flash', 'AuthService', function($scope, $location, Flash, AuthService) {
    $scope.credentials = {
        email: "",
        password: ""
    };
    $scope.onSubmit = function (credentials) {
        AuthService
            .login(credentials)
            .then(function () {
                $location.path('/map');
            })
            .catch(function (err) {
                Flash.create('danger', err.data.message, 10000);
            });
    };
}]);

mainApp.controller('registerCtrl', ['$scope', '$location', 'Flash', 'AuthService', function($scope, $location, Flash, AuthService) {
    $scope.credentials = {
        name: "",
        email: "",
        password: ""
    };
    $scope.onSubmit = function (credentials) {
        AuthService
            .register(credentials)
            .then(function () {
                $location.path('/map');
            })
            .catch(function (err) {
                Flash.create('danger', err.data.message, 10000);
            });
    };
}]);

mainApp.controller('navCtrl', ['$rootScope', '$scope', '$location', 'AuthService', function($rootScope, $scope, $location, AuthService) {
    $rootScope.currentUser = AuthService.currentUser();

    $scope.onLogout = function() {
        AuthService.logout();
        $location.path('/');
    };
}]);