"use strict";

angular.module('MyGrades').controller('CourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    '$route',
    'CourseFactory',
    'AssignmentFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, $route, CourseFactory, AssignmentFactory) {

        $scope.is_loading = true;


        $(document).ready(function(){
            // jQuery for Materialize components
            $('.change-grade-inputs').hide();
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});
            $('select').material_select();
        });


        var course_id = $routeParams.course_id;
        console.log("CourseID: ", course_id);


        CourseFactory.getCourseDetails(course_id)
        .then( function(response) {
            console.log("CourseDetailResponse: ", response);
            $scope.is_loading = false;
            $scope.course = response;
            console.log("Course: ", $scope.course);
        });


        $scope.deleteCourse = function(course_id){
            var user_token = RootFactory.getToken();
            CourseFactory.deleteCourse(course_id)
            .then( function(res) {
                $location.path(`/profile/${user_token}`);
            });

        };

        $scope.createAssignment = function(){
            AssignmentFactory.createAssignment()
            .then( function(res){
                console.log("Assignment Response: ", res);
            });

        }

        $scope.deleteAssignment = function(assignment_id){
            console.log("AssignmentID: ", assignment_id);
            AssignmentFactory.deleteAssignment(assignment_id)
            .then( function(res){
                console.log("DeleteAssignmentResponse: ", res);
                $route.reload();
            });
        }

        $scope.showChangeAssignmentGradeInput = function(assignment_id){
            console.log("Assignment to Change: ", assignment_id);
        }






}]);
