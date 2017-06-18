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
        let token = getToken();
        if(token){
            return jwtHelper.isTokenExpired(token);
        } else {
            return false;
        }
    };

    function currentUser() {
        if(isLoggedIn()){
            let token = getToken();
            return jwtHelper.decodeToken(token);
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
        localStorage.removeItem('mean-token');
        $window.localStorage.removeItem('mean-token');
    };
}]);