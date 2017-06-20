mainApp.controller('MapController', ['$scope', 'ongs', function ($scope, ongs) {

    $scope.ongs = ongs.data;
    $scope.selectedOngs = [];
    $scope.selectedValues = [];

    $scope.cat = ['Niños y adolescentes', 'Ancianos', 'Familia', 'Comedores', 'Educación', 'Salud', 'Personas con discapacidad', 'Indigencia', 'Reinserción social', 'Medio ambiente', 'Animales', 'Otros'];

    $scope.selectionsChanged = function () {
        $scope.selectedOngs = [];
        $scope.selectedValues.forEach(function (cid) {
            var ongs = $scope.ongs.filter(function(ong) {
                return cid.text === ong.tipo;
            });
            $scope.selectedOngs = $scope.selectedOngs.concat(ongs);
        });
        // Repinto el mapa
        if ($scope.selectedOngs.length>0) {
            $scope.zoomToIncludeMarkers();
        }
    };

    $scope.zoomToIncludeMarkers = function () {
        var bounds = new google.maps.LatLngBounds();
        $scope.selectedOngs.forEach(function (ong) {
            var latLng = new google.maps.LatLng(ong.latitud, ong.longitud);
            bounds.extend(latLng);
        });
        $scope.map.fitBounds(bounds);
        if ($scope.selectedOngs.length == 1) {
            $scope.map.setZoom(12);
        }
    };
}]);

mainApp.controller('LoginController', ['$scope', '$location', 'Flash', 'AuthService', function ($scope, $location, Flash, AuthService) {
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
                Flash.create('danger', err.data.message, 10000, { container: 'login-alert' }, true);
            });
    };
}]);

mainApp.controller('RegisterController', ['$scope', '$location', 'Flash', 'AuthService', function ($scope, $location, Flash, AuthService) {
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
                Flash.create('danger', err.data.message, 10000, { container: 'register-alert' }, true);
            });
    };
}]);

mainApp.controller('NavigationController', ['$rootScope', '$scope', '$location', 'AuthService', function ($rootScope, $scope, $location, AuthService) {
    $rootScope.currentUser = AuthService.currentUser();

    $scope.onLogout = function () {
        AuthService.logout();
        $location.path('/');
    };
}]);

mainApp.controller("ListOngController", ['$scope', '$location', 'OngService', 'ongs', function ($scope, $location, OngService, ongs) {
    $scope.ongs = ongs.data;
    $scope.selected_ong = {};

    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order

    $scope.openModal = function (obj) {
        $scope.selected_ong = obj;
    };

    $scope.showOng = function (ongId) {
        var ongUrl = "/ong/" + ongId;
        $location.path(ongUrl);
    };

    $scope.deleteOng = function (ongId) {
        OngService.deleteOng(ongId).then(function (data) {
            OngService.getOngs().then(function (data) {
                $scope.ongs = data.data;
                $scope.selected_ong = {};
            })
        });
    };
}]);

mainApp.controller("NewOngController", ['$scope', '$http', '$locale', '$location', 'OngService', function ($scope, $http, $locale, $location, OngService) {
    $scope.cat = ['Niños y adolescentes', 'Ancianos', 'Familia', 'Comedores', 'Educación', 'Salud', 'Personas con discapacidad', 'Indigencia', 'Reinserción social', 'Medio ambiente', 'Animales', 'Otros'];

    $scope.back = function () {
        window.history.back();
    };

    $scope.saveOng = function (ong) {
        OngService.createOng(ong).then(function (doc) {
            $location.path('/ongs');
        }).catch(function (response) {
            alert(response);
        });
    };

    $scope.center = [-38.7018411, -62.2724209];
    $scope.latlng = [-38.7018411, -62.2724209];

    $scope.getpos = function (event) {
        $scope.lat = event.latLng.lat();
        $scope.lng = event.latLng.lng();
        $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
    };

    $scope.placeMarker = function () {
        var place = this.getPlace();
        var loc = place.geometry.location;
        $scope.ong.latitud = loc.lat();
        $scope.ong.longitud = loc.lng();
        $scope.latlng = [loc.lat(), loc.lng()];
        $scope.center = [loc.lat(), loc.lng()];
    };
}]);

mainApp.controller("EditOngController", ['$scope', '$location', '$routeParams', 'OngService', function ($scope, $location, $routeParams, OngService) {

    $scope.cat = ['Niños y adolescentes','Ancianos', 'Familia', 'Comedores', 'Educación', 'Salud', 'Personas con discapacidad', 'Indigencia', 'Reinserción social', 'Medio ambiente', 'Animales', 'Otros'];

    OngService.getOneOng($routeParams.ongId).then(function (doc) {
        $scope.ong = doc.data;
        $scope.center = [$scope.ong.latitud, $scope.ong.longitud];
        $scope.latlng = [$scope.ong.latitud, $scope.ong.longitud];
    }, function (response) {
        alert(response);
    });

    $scope.back = function () {
        window.history.back();
    };

    $scope.saveOng = function (ong) {
        OngService.editOng(ong).then(function (doc) {
            $location.path('/ongs');
        }).catch(function (response) {
            console.log(response);
            alert(response);
        });
    };

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