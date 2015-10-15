'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('ProjectsCtrl', function ($scope, $http, moment) {
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
    //=== Scrollspy navigation fix for angular ===//
    $scope.gotoAnchor = function(event, x){
        event.preventDefault();
        var newHash = x;

        angular.element('html, body').animate({
            scrollTop: angular.element(x).offset().top
        }, 1000);
    };
    $scope.format = function (dateString) {
        var date = new moment(dateString);
        return date.format("L") + " (" + date.fromNow() + ")";
    };
  });
