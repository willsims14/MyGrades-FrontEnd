
"use strict";

angular.module('MyGrades').controller('CreateCourseCtrl', [
    '$scope',
    '$http',
    '$location',
    'RootFactory',
    'apiUrl',
    '$routeParams',
    'CourseFactory',
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, CourseFactory) {

        $scope.semesters_loaded = false;
        $scope.semesters = ["Fall 2017", "Spring 2017"];
        $scope.course = {};
        $scope.semester_selected = false;
        $scope.user_token = RootFactory.getToken();

        CourseFactory.getSemesters()
        .then( function(res) {
            console.log("Response: ", res);
            $scope.db_semesters = res.data.results;
        });


        $(document).ready(function(){
            $('select').material_select();
            var modal = document.getElementById('modal1');
            var jqueryModal = $(modal);
            // jqueryModal.openModal();
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});

            jqueryModal.openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: 0.5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                }
            );

        });


     


        $scope.createCourse = function(){

            $scope.is_loading = true;
            $scope.course.semester = "http://localhost:8000/semester/2/";


            CourseFactory.createCourse($scope.course)
            .then( function(res) {
                $scope.is_loading = false;
                $location.path(`/profile/${user_token}`);
            });

        };

      







}]);

