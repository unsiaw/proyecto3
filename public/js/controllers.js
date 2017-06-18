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
        console.log("Submiteando");
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

mainApp.controller('navCtrl', ['$scope', '$http', '$rootScope', 'AuthService', function($scope, $http, $rootScope, AuthService) {
    $scope.isLoggedIn = function() {
        $http.get('/auth/mefromtoken')
            .success(function(data) {
                console.log(data);
                $rootScope.loggedIn = data;
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };
}]);