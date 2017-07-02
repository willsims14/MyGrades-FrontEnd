
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

        $(document).ready(function(){
            var modal = document.getElementById('modal1');
            var jqueryModal = $(modal);
            // jqueryModal.openModal();
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').tooltip({position: 'top'});

            jqueryModal.openModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                }
            );

        });


     

        $scope.course = {};
        $scope.semester_selected = false;



        $scope.user_token = RootFactory.getToken();


        // CourseFactory.getSemesters()
        // .then( function(response) {
        //     $scope.semesters = response.data.results;
        //     console.log("Semesters: ", $scope.semesters);

        // });

        $scope.createCourse = function(){
            $scope.is_loading = true;
            $scope.course.semester = {};
            $scope.course.semester.id = 1;
            console.log("Creatign Course: ", $scope.course);

            CourseFactory.createCourse($scope.course)
            .then( function(res) {
                console.log("Response: ", res);
                $scope.is_loading = false;
            });

        }

      







}]);

