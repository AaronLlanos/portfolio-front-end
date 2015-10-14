'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:FeedbackCtrl
 * @description
 * # FeedbackCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('FeedbackCtrl', function ($scope, $http, $rootScope) {

    var feedback, rating;

  	// Localize the variable within the scope.
    // In our feedback.html, we'll be using the ng-model
    // attribute to populate this object. 
    $scope.feedback = feedback = {};
  	$scope.rating = rating = {};
    feedback.rating = rating.rate = 0;
    rating.max = 10;
    rating.isReadonly = false;

    rating.hoveringOver = function(value) {
      rating.overStar = value;
      rating.percent = 100 * (value / rating.max);
    };
    rating.leavingRating = function () {
      rating.percent = 100 * (feedback.rating / rating.max);
    };

    feedback.submit = function () {
        $rootScope.$emit('notification:navalert-hide');
    	if (
          !feedback.firstname ||
    		  !feedback.lastname ||
    		  !feedback.email ||
    		  !feedback.comment ||
          feedback.rating === 0
          ) {
        $rootScope.$emit('notification:navalert-show', {success: false, message: 'Please make sure to fill out all fields in feedback form.'});
        // console.log(feedback);
        // console.log("All fields must be filled out.");
    		return false;
    	}

    	var request = $http.post('/feedback', feedback);

    	request.success(function (data) {
        $rootScope.$emit('notification:navalert-show', data);
    		// console.log(data);
    	});
    	request.error(function (data) {
        $rootScope.$emit('notification:navalert-show', data);
			 // console.log(data);
    	});

    };

  });
