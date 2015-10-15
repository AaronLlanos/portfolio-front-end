'use strict';

/**
 * @ngdoc directive
 * @name portfolioApp.directive:angledProjects
 * @description
 * # angledProjects
 */
angular.module('portfolioApp')
  .directive('angledProjects', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the angledProjects directive');
      }
    };
  });
