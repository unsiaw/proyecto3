/*
    Service de Autenticación.
    Se encarga de lo relacionado a la conexión del usuario.
 */
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

/*
    Service de ONGs.
      Sirve para el manejo de las ONGs con la base de datos.
 */
mainApp.service("OngService", ['$http', function($http) {
    this.getOngs = function() {
        return $http.get("/api/ong/").
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error finding Ongs.");
        });
    };
    this.createOng = function(ong) {
        return $http.post("/api/ong", ong).
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error creating Ong.");
        });
    };
    this.getOneOng = function(ongId) {
        var url = "/api/ong/" + ongId;
        return $http.get(url).
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error finding this Ong.");
        });
    };
    this.editOng = function(ong) {
        var url = "/api/ong/" + ong._id;
        return $http.put(url, ong).
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error editing this Ong.");
        });
    };
    this.deleteOng = function(ongId) {
        var url = "/api/ong/" + ongId;
        return $http.delete(url).
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error deleting this Ong.");
        });
    };
    this.enviarComentario = function(ongId, comentario) {
        var url = "/api/comment/" + ongId;
        return $http.post(url, comentario).
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error sending Comment.");
        });
    };
}]);