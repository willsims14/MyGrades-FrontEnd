"use strict";

/*****************************************************/
/***************    Course Factory     ***************/
/***   Handles database interactions for courses   ***/
/*****************************************************/


app.factory("CourseFactory", function(apiUrl, RootFactory, $q, $http){

    // Gets all StudentCourseAssignment instances for the authenticated student
    let getCourses = function(username){
        return $q((resolve, reject) => {
        RootFactory.getApiRoot()
        .then( (root) => {
                $http({
                    url: `http://localhost:8000/course/`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Token " + RootFactory.getToken()
                    },
                    params:{
                        'username': username
                    }
                })
                .then((res) => {
                    resolve(res.data.results)
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    };

    return { getCourses };

});