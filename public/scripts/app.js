'use strict';

/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */
angular
  .module('portfolioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-facebook-api',
    'ui.bootstrap',
    'angularMoment'
  ])
  .config(function ($routeProvider, facebookProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
       /* Here the list of params used to configure the provider
        * @param appId
        * @param status
        * @param xfbml
        * @param cookie
        * @param api-version
        */
     facebookProvider.setInitParams('406449829550213',true,true,true,'v2.4');
     //if your app use extra permissions set it
     facebookProvider.setPermissions(['email']);
  })
  .run(['$anchorScroll', function ($anchorScroll) {
      $anchorScroll.yOffset = 50;
  }]);