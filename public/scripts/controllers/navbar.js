'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('NavbarCtrl', function ($anchorScroll, $location, $scope) {
    //=== Scrollspy navigation fix for angular ===//
    $scope.gotoAnchor = function(event, x){
        event.preventDefault();
        var newHash = x;

        angular.element('html, body').animate({
            scrollTop: angular.element(x).offset().top
        }, 1000);
    };
    //=== Navbar cleanup ===//
    $scope.navItems = [
        {anchor: "#anchor-about", name: "About"},
        {anchor: "#anchor-projects", name: "Projects"},
        {anchor: "#anchor-skills", name: "Skills"},
        {anchor: "#anchor-contact", name: "Contact"}
    ];
    //=== Variables ===//
    $scope.navfn = function(action){
        switch(action){
            case 'home':
                $scope.item = 'Item one selected.';
                break;
            case 'home':
                $scope.item = 'Item two selected.';
                break;
            case 'home':
                $scope.item = 'Item three selected.';
                break;
            case 'singular':
                $scope.item = 'Singular link item selected.';
                break;
            default:
                $scope.item = 'Default selection.';
                break;
        } // end switch
    }; // end navfn

    $scope.toggleStyling = function(){
        $scope.inverse = !$scope.inverse;
        if(angular.equals($scope.inverse,true)){
            $scope.styling = 'Inverse';
        }
        else{
            $scope.styling = 'Default';
        }
    }; // end toggleStyling

    $scope.toggleSearchForm = function(){
        $scope.search.show = !$scope.search.show;
        if(angular.equals($scope.search.show,true)){
            $scope.searchDisplay = 'Visible';
        }
        else{
            $scope.searchDisplay = 'Hidden';
        }
    }; // end toggleSearchForm

    $scope.addMenu = function(){
        $scope.menus.push({
            title : "Added On The Fly!",
            action : "default"
        });
    }; // end test

    $scope.toggleAffixed = function(){
        switch($scope.affixed){
          case 'top':
              $scope.affixed = 'bottom';
              break;
          case 'bottom':
              $scope.affixed = 'none';
              break;
          case 'none':
              $scope.affixed = 'top';
              break;
        }
    }; // end toggleAffixed
}); // end navbarCtrl
