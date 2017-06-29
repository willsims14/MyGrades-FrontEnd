"use strict";

/*******************************************************************/
/***********************    Root Factory     ***********************/
/***   Creates, sets, and gets Tokens for user authentication    ***/
/*******************************************************************/

angular.module('MyGrades').factory('RootFactory', [
    "$http",
    "apiUrl",
    ($http, apiUrl) => {
        let secure_token = null;
        return {
            getApiRoot () {
                return $http({
                    url: apiUrl,
                    headers: {
                        'Authorization': "Token " + secure_token
                    }
                    }).then(res => res.data);
            },
            setToken (token) {
                secure_token = token;
            },
            getToken () {
                return secure_token;
            }
        };
    }
]);
