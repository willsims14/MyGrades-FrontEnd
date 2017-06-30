"use strict";

angular.module('MyGrades').controller('AuthCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    'AuthFactory',
    '$route',
    function($scope, $http, $location, RootFactory, apiUrl, AuthFactory, $route) {

        $scope.is_new_user = false;
        $scope.invalid_login = false;

        $scope.user = {};

        // Register new users
        // ( Creates User instance which signals creation of Student instance )
        $scope.register = function(){
            AuthFactory.registerUser($scope.new_user)
            .then( function(response) {
                if(response.data.token !== ""){
                    $location.path(`/profile/${response.data.token}`);
                }
            });
        };

        // Login user
        $scope.login = function(){
            if($scope.user.username && $scope.user.password){
                AuthFactory.loginUser($scope.user)
                .then( function(res) {
                    if(res.data.token !== ""){
                        $scope.invalid_login = false;
                        AuthFactory.setCurrentUser($scope.user);
                        $location.path(`/profile/${res.data.token}`);
                    }
                });
            }else{
                $scope.invalid_login = true;
            }
        };


        $scope.quickLogin = function(){
            $scope.user = {
                'username':'will',
                'password':'sims'
            }
            $scope.login()
        }

}]);


