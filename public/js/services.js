mainApp.service('AuthService', ['$http', '$window', 'jwtHelper', function($http, $window, jwtHelper) {

    return {
        currentUser : currentUser,
        saveToken : saveToken,
        getToken : getToken,
        isLoggedIn : isLoggedIn,
        register : register,
        login : login,
        logout : logout
    };

    function saveToken(token) {
        $window.localStorage['mean-token'] = token;
    };

    function getToken() {
        return $window.localStorage['mean-token'];
    };

    function isLoggedIn() {
        var token = getToken();
        var payload;

        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    function currentUser() {
        if(isLoggedIn()){
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
    };

    function register(user) {
        return $http.post('/auth/register', user).then(function(data){
            saveToken(data.data.token);
        });
    };

    function login(user) {
        return $http.post('/auth/login', user).then(function(data) {
            saveToken(data.data.token);
        });
    };

    function logout() {
        console.log("AuthService.logout");
        localStorage.removeItem('mean-token');
        $window.localStorage.removeItem('mean-token');
    };
}]);