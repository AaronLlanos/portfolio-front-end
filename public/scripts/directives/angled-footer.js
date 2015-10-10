'use strict';

angular.module('portfolioApp').
	directive('angledFooter', [function () {
		return {
			restrict: 'AE',
			templateUrl: 'views/footer.html',
			controller : function($scope){
				$scope.var = [];
			}
		};
	}]);