'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
	.controller('CarouselCtrl', function ($scope) {
	  	$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
	});
