mainApp.controller('MyCtrl', ['$scope', function($scope) {

    $scope.selectedOngs = [];
    $scope.ongs = [
        {id: 1, name: 'ONG 1', cat: 'Animales', pos: [-38.7018411, -62.2724209]},
        {id: 2, name: 'ONG 2', cat: 'Educación', pos: [-38.71, -62.2724209]},
        {id: 3, name: 'ONG 3', cat: 'Animales', pos: [-38.72, -62.2724209]},
        {id: 4, name: 'ONG 4', cat: 'Discapacidad', pos: [-38.73, -62.2724209]},
        {id: 5, name: 'ONG 5', cat: 'Social', pos: [-38.74, -62.2724209]}
    ];

    $scope.cat = [
        "Animales",
        "Arte y Cultura",
        "Desarrollo comunitario y económico",
        "Discapacidad",
        "Educación",
        "Emergencia y Catástrofe",
        "Medio Ambiente",
        "Políticas Públicas y Derechos Humanos",
        "Salud y Bienestar",
        "Social"
    ];

    //añadimos ongs por defecto
    $scope.ongs2 = [
        {
            name: 'ONG N 1',
            cat: 'Animales',
            lat: 43.7000,
            long: -79.4000
        },
        {
            name: 'ONG N 2',
            cat: 'Animales',
            lat: 40.6700,
            long: -73.9400
        },
        {
            name: 'ONG N 3',
            cat: 'Arte y Cultura',
            lat: 41.8819,
            long: -87.6278
        },
        {
            name: 'ONG N 4',
            cat: 'Social',
            lat: 34.0500,
            long: -118.2500
        },
        {
            name: 'ONG N 5',
            cat: 'Medio Ambiente',
            lat: 36.0800,
            long: -115.1522
        }
    ];

    $scope.selectionsChanged = function () {
        $scope.selectedOngs = [];
        $scope.selectedValues.forEach(function (cid) {
            var ong = $scope.ongs.filter(function (c) {
                if (c.id == parseInt(cid))
                    return c;
            })[0];
            $scope.selectedOngs.push(ong);
        });

        $scope.zoomToIncludeMarkers();
    };

    $scope.zoomToIncludeMarkers = function () {
        var bounds = new google.maps.LatLngBounds();
        $scope.selectedOngs.forEach(function (c) {
            var latLng = new google.maps.LatLng(c.pos[0], c.pos[1]);
            bounds.extend(latLng);
        });
        $scope.map.fitBounds(bounds);
        if ($scope.selectedOngs.length == 1) {
            $scope.map.setZoom(12);
        }
    };
}]);

mainApp.controller('MapController', function($scope, $location, NgMap) {
    $scope.fbhref=$location.absUrl();
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter().toString());
    });
});

mainApp.controller('LoginController', ['$scope', '$location', 'Flash', 'AuthService', function($scope, $location, Flash, AuthService) {
    $scope.credentials = {
        email: "",
        password: ""
    };
    $scope.onSubmit = function (credentials) {
        Flash.clear();
        AuthService
            .login(credentials)
            .then(function () {
                $location.path('/map');
            })
            .catch(function (err) {
                Flash.create('danger', err.data.message, 10000, { id: 'login-alert'}, true);
            });
    };
}]);

mainApp.controller('RegisterController', ['$scope', '$location', 'Flash', 'AuthService', function($scope, $location, Flash, AuthService) {
    $scope.credentials = {
        name: "",
        email: "",
        password: ""
    };
    $scope.onSubmit = function (credentials) {
        Flash.clear();
        AuthService
            .register(credentials)
            .then(function () {
                $location.path('/map');
            })
            .catch(function (err) {
                Flash.create('danger', err.data.message, 10000, { id: 'register-alert'}, true);
            });
    };
}]);

mainApp.controller('NavigationController', ['$rootScope', '$scope', '$location', 'AuthService', function($rootScope, $scope, $location, AuthService) {
    $rootScope.currentUser = AuthService.currentUser();

    $scope.onLogout = function() {
        AuthService.logout();
        $location.path('/');
    };
}]);

mainApp.controller("ListOngController", ['$scope', '$location', 'OngService', 'ongs', function($scope, $location,OngService, ongs) {
    $scope.ongs = ongs.data;

    $scope.showOng = function(ongId) {
        var ongUrl = "/ong/" + ongId;
        $location.path(ongUrl);
    };

    $scope.deleteOng = function(ongId) {
        OngService.deleteOng(ongId);
        OngService.getOngs().then(function (data) {
            $scope.ongs = data.data;
        });
    };
}]);

mainApp.controller("NewOngController", ['$scope', '$location', 'OngService', function($scope, $location, OngService) {
    $scope.back = function() {
        $location.path("/");
    };

    $scope.saveContact = function(ong) {
        OngService.createOng(ong).then(function(doc) {
            var ongUrl = "/ong/" + doc.data._id;
            $location.path(ongUrl);
        }, function(response) {
            alert(response);
        });
    }
}]);

mainApp.controller("EditOngController", ['$scope', '$routeParams', 'OngService', function($scope, $routeParams, OngService) {
    OngService.getOneOng($routeParams.ongId).then(function(doc) {
        $scope.ong = doc.data;
    }, function(response) {
        alert(response);
    });

    $scope.toggleEdit = function() {
        $scope.editMode = true;
        $scope.contactFormUrl = "ong-form.html";
    };

    $scope.back = function() {
        $scope.editMode = false;
        $scope.contactFormUrl = "";
    };

    $scope.saveOng = function(ong) {
        OngService.editOng(ong);
        $scope.editMode = false;
        $scope.contactFormUrl = "";
    };

    $scope.deleteOng = function(ongId) {
        OngService.deleteOng(ongId);
    }
}]);