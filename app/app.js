"use strict";

var app = angular.module('MyGrades', ['ngRoute']).constant('apiUrl', "http://localhost:8000");

angular.module('MyGrades').config(
[
    '$interpolateProvider',
    '$routeProvider',
    function($interpolateProvider, $routeProvider) {

        $interpolateProvider.startSymbol('((');
        $interpolateProvider.endSymbol('))');

        $routeProvider
        .when('/', {
            controller: 'AuthCtrl',
            templateUrl: '/partials/login.html'
        })
        .when('/profile/:token', {
            controller: 'ProfileCtrl',
            templateUrl: '/partials/profile.html'
        })
        .when('/course/:course_id/', {
            controller: 'CourseCtrl',
            templateUrl: '/partials/course_detail.html'
        })
        // .otherwise("/");
    }
]);


