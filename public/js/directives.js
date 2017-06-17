angular.module('navbar',[]).directive('headerNavbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/navbar.html'
        };
    });