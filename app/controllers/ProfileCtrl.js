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
    function($scope, $http, $location, RootFactory, apiUrl, $routeParams, AuthFactory, CourseFactory) {

        /***************************************************/
        /*  Initialize Materialize components with jQuery  */
        /***************************************************/

        // Initializes collapsible course list
        $( document ).ready( function(){
            $('.collapsible').collapsible({
                accordion: true, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                onOpen: function(el) { 
                    console.log("OPENED");
                    alert('Open'); 
                },
                onClose: function(el) { 
                    console.log("CLOSED");
                    alert('Closed'); 
                } 
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
            // $('select').material_select();
        });

        $scope.is_loading = true;
        $scope.no_courses = false;


        AuthFactory.getUserByToken()
        .then (function(res) {
            $scope.student = res.data;
            $scope.is_loading = false;

            CourseFactory.getCourses($scope.student.username)
            .then( function(res) {
                console.log("Response: ", res);
            })

        });            





}]);


