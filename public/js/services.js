mainApp.service('AuthService', ['$http', '$window', function($http, $window) {

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
        console.log("Haciendo saveToken");
        $window.localStorage['mean-token'] = token;
    };

    function getToken() {
        console.log("Haciendo getToken");
        return $window.localStorage['mean-token'];
    };

    function isLoggedIn() {
        console.log("Chequeando isLoggedIn");
        let token = getToken();
        let payload;

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
            let token = getToken();
            let payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email : payload.email,
                name : payload.name,
                admin: payload.admin
            };
        }
    };

    function register(user) {
        return $http.post('/auth/register', user).then(function(data){
            saveToken(data.token);
        });
    };

    function login(user) {
        return $http.post('/auth/login', user).then(function(data) {
            saveToken(data.token);
        });
    };

    function logout() {
        $window.localStorage.removeItem('mean-token');
    };
}]);