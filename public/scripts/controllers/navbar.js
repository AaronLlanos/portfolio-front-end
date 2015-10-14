'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('NavbarCtrl', function ($anchorScroll, $location, $scope, $rootScope, $timeout) {
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

    //=== Navbar Alerts and Notifications ===/
    var notification;
    $scope.notification = notification = {
        show: false,
        element: angular.element('#nav-alert'),
        type: '',
        message: ''
    };

    $scope.hideNavAlert = function (){
        // console.log('hiding navalert');
        notification.show = false;
        notification.element.removeClass('bg-success').removeClass('bg-danger');
    };

    $rootScope.$on('notification:navalert-hide', $scope.hideNavAlert);

    $rootScope.$on('notification:navalert-show', function (event, data) {
        notification.show = true;
        notification.message = data.message;
        if (data.success) {
            notification.type = "Success:";
            notification.element.addClass('bg-success');
        }else{
            notification.type = "Error:";
            notification.element.addClass('bg-danger');
        }
        $timeout($scope.hideNavAlert, 4000);
    });
    
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

    var popover, login, signup;

    $scope.popover = popover = {
        loginTemplate: 'loginTemplate.html',
        signupTemplate: 'signupTemplate.html'
    };
    popover.login = login = {};
    popover.signup = signup = {};

    // This is our method that will post to our server.
    signup.submit = function () {
        console.log("Im in this?");
        
        $scope.removeAlert();
        // make sure all fields are filled out...
        // aren't you glad you're not typing out
        // $scope.signup.user.firstname everytime now??
        if (
            !user.firstname ||
            !user.lastname ||
            !user.email ||
            !user.password1 ||
            !user.password2
        ) {
            $scope.submitAlert(false, 'Please enter in all of the fields.');
            return false;
        }

        // make sure the passwords match
        if (user.password1 !== user.password2) {
            $scope.submitAlert(false, 'Your passwords must match.');
            return false;
        }

        // Just so we can confirm that the bindings are working
        // console.log(user);

        // Make the request to the server
        var request = $http.post('/signup', user);

        // we'll come back to here and fill in more when ready
        request.success(function (data) {
            // to be filled in on success
            // console.log(data);
            $scope.submitAlert(data.success, data.message);
        });

        request.error(function (data) {
            // to be filled in on error
            // console.log(data);
            $scope.submitAlert(data.success, data.message);
        });

    };

    login.submit = function () {
        console.log("Im in this?");
        $scope.removeAlert();
        // Make sure we have username and password filled out
        if (!user.email || !user.password) {
            $scope.submitAlert(false, 'Please fill out all form fields.');
            return false;
        }
        var request = $http.post('/login', user);

        // we'll come back to here and fill in more when ready
        request.success(function (data) {
            // to be filled in on success
            // console.log(data);
            $scope.submitAlert(data.success, data.message);
        });

        request.error(function (data) {
            // to be filled in on error
            // console.log(data);
            $scope.submitAlert(data.success, data.message);
        });
    };

    // Flash an alert upon success or error.
    $scope.submitAlert = function (success, message) {
        if (success){
            angular.element('.alert').removeClass('hidden').addClass('alert-success');
            angular.element('#alert-type').html('Success: ');
            angular.element('#alert-message').html(message);
        }else{
            angular.element('.alert').removeClass('hidden').addClass('alert-danger');
            angular.element('#alert-type').html('Error: ');
            angular.element('#alert-message').html(message);
        }
    };

    $scope.removeAlert = function () {
        angular.element('.alert').removeClass('alert-danger alert-success').addClass('hidden');
        angular.element('#alert-type').html('');
        angular.element('#alert-message').html('');
    };

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
