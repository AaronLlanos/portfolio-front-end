'use strict';

describe('Controller: FeedbackCtrl', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var FeedbackCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedbackCtrl = $controller('FeedbackCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FeedbackCtrl.awesomeThings.length).toBe(3);
  });
});
