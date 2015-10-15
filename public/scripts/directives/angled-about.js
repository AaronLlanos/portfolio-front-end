'use strict';

/**
 * @ngdoc directive
 * @name portfolioApp.directive:angledAbout
 * @description
 * # angledAbout
 */
angular.module('portfolioApp')
  .directive('angledAbout', function () {
    return {
      template: '<div></div>',
      restrict: 'AE',
      templateUrl: 'views/about.html',
      link: function postLink(scope, element, attrs) {
        element.text('this is the angledAbout directive');
      },
      controller: function ($scope) {
      	$scope.var = [];
      }
    };
  });