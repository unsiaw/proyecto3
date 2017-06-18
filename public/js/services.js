mainApp.service('AuthService', ['$http', '$window', 'jwtHelper', 'authManager', function($http, $window, jwtHelper, authManager) {

    return {
        currentUser : currentUser,
        saveToken : saveToken,
        getToken : getToken,
        register : register,
        login : login,
        logout : logout
    };

    function saveToken(token) {
        $window.localStorage['mean-token'] = token;
    }

    function getToken() {
        return $window.localStorage['mean-token'];
    }

    function currentUser() {
        if(authManager.isAuthenticated()){
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email: payload.email,
                name: payload.name,
                admin: payload.admin
            };
        } else return null;
    }

    function register(user) {
        return $http.post('/auth/register', user).then(function(data){
            saveToken(data.data.token);
            authManager.authenticate();
        });
    }

    function login(user) {
        return $http.post('/auth/login', user).then(function(data) {
            saveToken(data.data.token);
            authManager.authenticate();
        });
    }

    function logout() {
        authManager.unauthenticate();
        // Revisar tema de porqué no se está borrando del item del localStorage
        localStorage.removeItem('mean-token');
        $window.localStorage.removeItem('mean-token');
    }
}]);