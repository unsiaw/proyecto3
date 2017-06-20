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
                Flash.create('danger', err.data.message, 10000, { container: 'login-alert'}, true);
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
                Flash.create('danger', err.data.message, 10000, { container: 'register-alert'}, true);
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
    $scope.selected_ong = {};

    $scope.openModal = function (obj)  {
        $scope.selected_ong = obj;
    };

    $scope.showOng = function(ongId) {
        var ongUrl = "/ong/" + ongId;
        $location.path(ongUrl);
    };

    $scope.deleteOng = function(ongId) {
        OngService.deleteOng(ongId).then(function(data){
            OngService.getOngs().then(function (data) {
                $scope.ongs = data.data;
                $scope.selected_ong = {};
            })
        });
    };
}]);

mainApp.controller("NewOngController", ['$scope', '$http', '$locale', '$location', 'OngService', function($scope, $http, $locale, $location, OngService) {
    $scope.cat = ['Niños y adolescentes','Ancianos', 'Familia', 'Comedores', 'Educación', 'Salud', 'Personas con discapacidad', 'Indigencia', 'Reinserción social', 'Medio ambiente', 'Animales', 'Otros'];

    $scope.back = function() {
        //$location.path("/");
        window.history.back();
    };

    $scope.saveOng = function(ong) {
        OngService.createOng(ong).then(function(doc) {
            //var ongUrl = "/ong/" + doc.data._id;
            $location.path('/ongs');
        }).catch(function(response) {
            console.log(response);
            alert(response);
        });
    };

    $scope.center = [-38.7018411,-62.2724209];
    $scope.latlng = [-38.7018411,-62.2724209];

    $scope.getpos = function (event) {
        $scope.lat = event.latLng.lat();
        $scope.lng = event.latLng.lng();
        $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
    };

    $scope.placeMarker = function(){
        var place = this.getPlace();
        var loc = place.geometry.location;
        $scope.ong.latitud = loc.lat();
        $scope.ong.longitud = loc.lng();
        $scope.latlng = [loc.lat(), loc.lng()];
        $scope.center = [loc.lat(), loc.lng()];
    };
}]);

mainApp.controller("EditOngController", ['$scope', '$location', '$routeParams', 'OngService', function($scope,  $location, $routeParams, OngService) {
    OngService.getOneOng($routeParams.ongId).then(function(doc) {
        $scope.ong = doc.data;
        console.log(doc);
    }, function(response) {
        alert(response);
    });

    $scope.back = function() {
        //$location.path("/");
        window.history.back();
    };

    $scope.saveOng = function(ong) {
        OngService.editOng(ong).then(function(doc) {
            //var ongUrl = "/ong/" + doc.data._id;
            $location.path('/ongs');
        }).catch(function(response) {
            console.log(response);
            alert(response);
        });
    };
}]);