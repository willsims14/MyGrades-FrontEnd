"use strict";

/*****************************************************/
/***************    Course Factory     ***************/
/***   Handles database interactions for courses   ***/
/*****************************************************/


app.factory("AssignmentFactory", function(apiUrl, RootFactory, $q, $http){




    let createAssignment = function(assignment){
        console.log("Creating assignment: ", assignment);
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);
                $http({
                    url: `${apiUrl}/assignment/`,
                    method: "POST",
                    data: {
                        "title": assignment.title,
                        "description": assignment.description,
                        "points_received": assignment.points_received,
                        "points_possible": assignment.points_possible,
                        "course": assignment.course
                    },
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                }).then( function(res){
                    resolve(res);
                }).catch( function(error){
                    reject(error);
                });
            });
        });
    };

    let deleteAssignment = function(assignment_id){
        console.log("Factory, AssignmentID: ", assignment_id);
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/assignment/${parseInt(assignment_id)}/`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                }).then( function(res){
                    resolve(res);
                }).catch( function(error){
                    reject(error);
                });
            });
        });
    };


    return { createAssignment, deleteAssignment };
});