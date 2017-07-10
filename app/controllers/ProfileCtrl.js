"use strict";

angular.module('MyGrades').controller('ProfileCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'AuthFactory',
    'CourseFactory',
    '$route',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, AuthFactory, CourseFactory, $route) {

        /***************************************************/
        /*  Initialize Materialize components with jQuery  */
        /***************************************************/
        $scope.course = {};
        $scope.user_token = $routeParams.token;

        // Initializes collapsible course list
        $( document ).ready( function(){
            $('.collapsible').collapsible({
                accordion: true
            });
            // Initializes semester dropdown to filter courses
            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });

        });

        $scope.is_loading = true;
        $scope.no_courses = false;
        $scope.semesters = ["Fall 2017", "Spring 2017"];
        $scope.semester_filter = {};


        AuthFactory.getUserByToken()
        .then (function(res) {
            $scope.student = res.data;
            CourseFactory.getCourses($scope.student.username)
            .then( function(courses_response) {
                if(courses_response.length){
                    console.log("Courses: ", courses_response);
                    $scope.courses = courses_response;
                }else{
                    $scope.no_courses = true;
                }
                $scope.is_loading = false;
                CourseFactory.getSemesters()
                .then( function(res) {
                    console.log("Semesters: ", res);
                    $scope.semesters = res.data.results;
                });
            });

        });

        $scope.openCreateCourseModal = function(){
            var modal = document.getElementById('modal1');
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

        $scope.createCourse = function(){
            CourseFactory.createCourse($scope.course)
            .then( function() {
                $route.reload();
            });

        };


        $scope.setSemesterFilter = function(selected_semester){
            $scope.semester_filter.url = selected_semester.url;
            $scope.semester_filter.season = selected_semester.season;
            $scope.semester_filter.year = selected_semester.year;

            console.log("$scope.semester: ", $scope.semester_filter);

        };

        // $scope.semester_filter = function(semester_url){
        //     if(semester_url === $scope.selected_semester_filter){
        //         return true
        //     }

        //     return false;

        // }




}]);


