"use strict";

angular.module('MyGrades').controller('CourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'CourseFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory) {

        $scope.is_loading = true;

        // jQuery for Materialize components
        $('.change-grade-inputs').hide();

        $(document).ready(function(){
            $('.modal').modal();
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});

        });
        var course_id = $routeParams.course_id;

        $scope.is_loading = false;

        console.log("RouteParams: ", $routeParams);

        console.log("Course: ", $scope.course);

        CourseFactory.getCourseDetails(course_id)
        .then( function(response) {
            $scope.course = response;
        });




}]);
