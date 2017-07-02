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
                    resolve(res.data.results);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    };



    let getCourseDetails = function(course_id){
        return $q((resolve, reject) => {
        RootFactory.getApiRoot()
        .then( (root) => {
                $http({
                    url: `http://localhost:8000/course/${course_id}/`,
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': "Token " + RootFactory.getToken()
                    }
                })
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    };

    let createCourse = function(course){
        return $q((resolve, reject) => {
            RootFactory.getApiRoot()
            .then( (root) => {
                console.log("Root: ", root);

                $http({
                    url: `${apiUrl}/course/`,
                    method: "POST",
                    data: { 
                        "title": course.title,
                        "course_number": course.number,
                        "professor": course.professor,
                        "semester": course.semester.id,
                        "description": course.description
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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

    return { getCourses, getCourseDetails, createCourse };
});