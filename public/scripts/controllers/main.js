'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('MainCtrl', function ($rootScope, $scope, $http, facebook, $window, $interval, moment) {
        $scope.scrollPos = 0;
        $scope.age = new moment("1993-01-26", "YYYYMMDD").fromNow(true);
        $scope.instaPhotosMe = [];
        $scope.instaPhotosMila = [];
        $scope.instaPhotosSchool = [];
        $scope.FBUser = '1404466291';
        $scope.facebookProfilePic = {};
        $scope.instaURLSchool = "https://api.instagram.com/v1/users/252730678/media/recent?client_id=a1a54f9d7f6e4726a5454c4c7fb118ac&callback=JSON_CALLBACK";
        $scope.instaURLMe = "https://api.instagram.com/v1/users/205469079/media/recent?client_id=a1a54f9d7f6e4726a5454c4c7fb118ac&callback=JSON_CALLBACK";
        $scope.instaURLMila = "https://api.instagram.com/v1/users/1946701563/media/recent?client_id=a1a54f9d7f6e4726a5454c4c7fb118ac&callback=JSON_CALLBACK";
        $scope.randomSort = function(){
            angular.forEach($scope.instaPhotosMe, function(photo){
                photo.rank = Math.random()*10;
            });
        };

        $rootScope.$on("fb.init",function(){
            // console.log("SDK Ready");
        });

        $interval($scope.randomSort, 4000);

        $scope.addFacebookFriend = function(){
            facebook.getUser().then(function(r){
                console.log(r);
            }, function(err){
                console.log(err);
            });
        };

        $http.jsonp($scope.instaURLMe).
            success(function(data){
                angular.forEach(data.data, function(instaPhoto){
                    if (instaPhoto.hasOwnProperty('images')){
                        $scope.instaPhotosMe.push({image: instaPhoto.images.standard_resolution.url, rank: 1});
                    }
                });
            }).
            error(function(data){
                console.log(data);
            });
        $http.jsonp($scope.instaURLMila).
            success(function(data){
                angular.forEach(data.data, function(instaPhoto){
                    if (instaPhoto.hasOwnProperty('images')){
                        $scope.instaPhotosMila.push({image: instaPhoto.images.standard_resolution.url, rank: 1});
                    }
                });
            }).
            error(function(data){
                console.log(data);
            });
        $http.jsonp($scope.instaURLSchool).
            success(function(data){
                angular.forEach(data.data, function(instaPhoto){
                    if (instaPhoto.hasOwnProperty('images')){
                        $scope.instaPhotosSchool.push({image: instaPhoto.images.standard_resolution.url, rank: 1});
                    }
                });
            }).
            error(function(data){
                console.log(data);
            });
    });
