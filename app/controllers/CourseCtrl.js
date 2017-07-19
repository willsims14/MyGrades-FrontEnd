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
        $scope.assignment = {};
        $scope.changingGrade = false;


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

            if($scope.assignment.points_received > $scope.assignment.points_possible){
                $scope.assignment.points_received = 0;
                $scope.error_text = "Cannot receive more points than possible.";
                // var modal = document.getElementById('modal2');
                // var jqueryModal = $(modal);
                // jqueryModal.closeModal();
                $scope.openErrorModal();

            }else{

                $scope.assignment.course = $scope.course.url;
                AssignmentFactory.createAssignment($scope.assignment)
                .then( function(res){
                    console.log("Assignment Response: ", res);
                    $route.reload();
                });
            }

        }

        $scope.deleteAssignment = function(assignment_id){
            console.log("AssignmentID: ", assignment_id);
            AssignmentFactory.deleteAssignment(assignment_id)
            .then( function(res){
                console.log("DeleteAssignmentResponse: ", res);
                $route.reload();
            });
        }

        $scope.editAssignmentGrade = function(assignment){

            assignment.points_received = "" + assignment.new_grade;

            AssignmentFactory.patchAssignment(assignment)
            .then (function(res) {
                console.log("Patch Respones: ", res);
                $route.reload();
            });

        }

        // If assignment already has a grade, disable the EDIT GRADE button
        $scope.ungradedAssignment = function(points){
            if(points > 0){
                return "disabled";
            }else{
                return "";
            }
        }

        $scope.openCreateAssignmentModal = function(){
            var modal = document.getElementById('modal2');
            var jqueryModal = $(modal);
            jqueryModal.openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: 0.5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                }
            );
            $('select').material_select();
        }

        $scope.openErrorModal = function(){
            var modal = document.getElementById('modal3');
            var jqueryModal = $(modal);
            jqueryModal.openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: 0.5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                }
            );
            $('select').material_select();
        }






}]);
