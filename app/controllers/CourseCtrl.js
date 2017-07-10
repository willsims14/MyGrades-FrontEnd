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
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});

            $('select').material_select();


        });


        var course_id = $routeParams.course_id;

        $scope.is_loading = false;

        CourseFactory.getCourseDetails(course_id)
        .then( function(response) {
            $scope.course = response;
        });


        $scope.deleteCourse = function(course_id){
            var user_token = RootFactory.getToken();
            CourseFactory.deleteCourse(course_id)
            .then( function(res) {
                $location.path(`/profile/${user_token}`);
            });

        };






}]);
