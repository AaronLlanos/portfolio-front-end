'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('ProjectsCtrl', function ($scope, $http) {
  	$scope.githubProjects = [];
  	$scope.predicate = "-updated_at";
    var request = $http.get('https://api.github.com/users/AaronLlanos/repos');

    request.success(function (data) {
    	console.log(data);
    	$scope.githubProjects = data;
    });
    request.error(function (data) {
    	console.log(data);
    });
  });
