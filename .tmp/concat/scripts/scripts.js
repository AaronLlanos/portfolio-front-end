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
  .config(["$routeProvider", "facebookProvider", function ($routeProvider, facebookProvider) {
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
  }])
  .run(['$anchorScroll', function ($anchorScroll) {
      $anchorScroll.yOffset = 50;
  }]);
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('NavbarCtrl', ["$anchorScroll", "$location", "$scope", "$rootScope", "$timeout", function ($anchorScroll, $location, $scope, $rootScope, $timeout) {
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
}]); // end navbarCtrl

'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('MainCtrl', ["$rootScope", "$scope", "$http", "facebook", "$window", "$interval", "moment", function ($rootScope, $scope, $http, facebook, $window, $interval, moment) {
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
    }]);

'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('ContactCtrl', ["$scope", "$http", function ($scope, $http) {
    	//Setup mailgunAPI
    	$scope.sendMail = function () {
    		var baseURL = 'https://api.mailgun.net/v3/sandboxbe307156895b4117923702d95ffc891d.mailgun.org';
    		$http.get(baseURL)
    			.then();
    	};
      $scope.rate = 7;
      $scope.max = 10;
      $scope.isReadonly = false;

      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      };

      $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
      ];
    }]);

'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
	.controller('CarouselCtrl', ["$scope", function ($scope) {
	  	$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
	}]);

"use strict";

angular.module("portfolioApp")
	.controller("SkillsCtrl", ["$scope", function ($scope) {
		$scope.mySkills = [
			{
				"name": "Javascript",
				"penjoyment": 8,
				"exp": 3,
				"desc": "Working with functional programming is great for whipping up quick projects without wasting time on setting up an environment. It is the language that I have worked with most for web development purposes."
			},
			{
 				"name": "Terminal",
				"penjoyment": 8,
				"exp": 4,
				"desc": "What kind of computer scientist would I be if I didnt know my way around a shell. I prefer bash or zsh"
			},

			{
				"name": "Angular.js",
				"penjoyment": 8,
				"exp": 1,
				"desc": "The greatest MVC frontend framework I have been exposed to. Its implementation of directives and controllers is brilliantly smooth and concise. Paired with npm and bower components, building web apps with Angular is a breeze!"
			},
			{
				"name": "Node.js",
				"penjoyment": 8,
				"exp": 1,
				"desc": "Carrying Javascript all the way to the backend feels clear, concise, and concrete from front to back."
			},
			{
				"name": "HTML5/CSS3",
				"penjoyment": 7,
				"exp": 3,
				"desc": "CSS3 animations are awesome! With an extremely easy and intuitive approach to basic stylesheets, they pair greatly with the enhanced security and simplicity of HTML5."
			},
			{
				"name": "PHP",
				"penjoyment": 7,
				"exp": 2,
				"desc": "For a scripting language with poor documentation and backwards compatability, it is fun because of it's object orientation and modularization. With years of development, it holds several classes and functions which make development fun and easy."
			},
			{
				"name": "Backbone.js",
				"penjoyment": 8,
				"exp": 1,
				"desc": "Backbone.js is a blazing fast MV frontend framework for developing webapps. It's largest con is for me is a redundancy with several render() calls for *Views."
			},
			{
				"name": "Java",
				"penjoyment": 9,
				"exp": 3,
				"desc": "With humble roots of the first language I learned, Java had taught me several things about programming conventions. Interfaces implementing polymorphism and classes extending inheritance, Java is a powerful tool with strict type declarations that are extensive."
			},
			{
				"name": "MySQL",
				"penjoyment": 5,
				"exp": 1,
				"desc": "The most important part about SQL DBs are proper schemas which reduce join calls and eliminate redundant queries. "
			},
			{
				"name": "Amazon AWS",
				"penjoyment": 8,
				"exp": 1,
				"desc": "Using Hadoop's Map Reduce on AWS was a fun project which I would parse user data from log files. Working with EC2 web services was enjoyable because it taught me the basis of cloud computing."
			},
			{
				"name": "After Effects",
				"penjoyment": 8,
				"exp": 1,
				"desc": "Prebundled with C4DLite? Wam bam thank you mam, this tool rocks!"
			},
			{
				"name": "Photoshop",
				"penjoyment": 8,
				"exp": 3,
				"desc": "My Photoshop experience started modding Halo 2 where I would alter the bitmaps used for the skins. It carried over into rotscoping, video tracing, and more."
			}
		];
		$scope.predicate = "-exp";
		$scope.order = function(predicate) {
			$scope.predicate = "-"+predicate;
		};
	}]);
'use strict';

angular.module('portfolioApp')
  .directive('angledNavbar',function(){
    return {
      restrict : 'AE',
      scope : {
        brand : '=',
        menus : '=',
        affixed : '=',
        search : '=',
        searchfn : '&',
        navfn : '&',
        inverse : '='
      },
      templateUrl : 'views/navbar.html',
      controller : ["$scope", "$element", "$attrs", function($scope, $element, $attrs){
      //=== Scope/Attributes Defaults ===//
      
      $scope.defaults = {
        brand : '<span class="glyphicon glyphicon-certificate"></span>',
        menus : [],
        search : {
          show : false
        }
      }; // end defaults
      
      // if no parent function was passed to directive for navfn, then create one to emit an event
      if(angular.isUndefined($attrs.navfn)){
        $scope.navfn = function(action){
          if(angular.isObject(action)){
            $scope.$emit('nav.menu',action);  
          }
          else{
            $scope.$emit('nav.menu',{'action' : action});
          }
        }; // end navfn
      }
      
      // if no parent function was passed to directive for searchfn, then create one to emit a search event
      if(angular.isUndefined($attrs.searchfn)){
        $scope.searchfn = function(){
          $scope.$emit('nav.search.execute');
        }; // end searchfn
      }
      
      //=== Observers & Listeners ===//
      
      $scope.$watch('affixed',function(val){
        var b = angular.element(document).find('body');
        // affixed top
        if(angular.equals(val,'top') && !b.hasClass('navbar-affixed-top')){
          if(b.hasClass('navbar-affixed-bottom')){
            b.removeClass('navbar-affixed-bottom');
          }
          b.addClass('navbar-affixed-top');
        //affixed bottom
        }else if(angular.equals(val,'bottom') && !b.hasClass('navbar-affixed-bottom')){
          if(b.hasClass('navbar-affixed-top')){
            b.removeClass('navbar-affixed-top');
          }
          b.addClass('navbar-affixed-bottom');
        // not affixed
        }else{
          if(b.hasClass('navbar-affixed-top')){
            b.removeClass('navbar-affixed-top');
          }
          if(b.hasClass('navbar-affixed-bottom')){
            b.removeClass('navbar-affixed-bottom');
          }
        }
      }); // end watch(affixed)
      
      //=== Methods ===//
      
      $scope.noop = function(){
        angular.noop();
      }; // end noop
      
      $scope.navAction = function(action){
        $scope.navfn({'action' : action});
      }; // end navAction
      
      /**
       * Have Branding
       * Checks to see if the "brand" attribute was passed, if not use the default
       * @result  string
       */
      $scope.haveBranding = function(){
        return (angular.isDefined($attrs.brand)) ? $scope.brand : $scope.defaults.brand;
      }; 
      
      /**
       * Has Menus
       * Checks to see if there were menus passed in for the navbar.
       * @result  boolean
       */
      $scope.hasMenus = function(){
        return (angular.isDefined($attrs.menus));
      };
      
      /**
       * Has Dropdown Menu
       * Check to see if navbar item should have a dropdown menu
       * @param  object  menu
       * @result  boolean
       */
      $scope.hasDropdownMenu = function(menu){
        return (angular.isDefined(menu.menu) && angular.isArray(menu.menu));
      }; // end hasDropdownMenu
      
      /**
       * Is Divider
       * Check to see if dropdown menu item is to be a menu divider.
       * @param  object  item
       * @result  boolean
       */
      $scope.isDivider = function(item){
        return (angular.isDefined(item.divider) && angular.equals(item.divider,true));
      }; // end isDivider
    }]
  };
});
'use strict';

angular.module('portfolioApp').
	directive('angledFooter', [function () {
		return {
			restrict: 'AE',
			templateUrl: 'views/footer.html',
			controller : ["$scope", function($scope){
				$scope.var = [];
			}]
		};
	}]);
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:FeedbackCtrl
 * @description
 * # FeedbackCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('FeedbackCtrl', ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {

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

  }]);

'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('ProjectsCtrl', ["$scope", "$http", function ($scope, $http) {
  	$scope.githubProjects = [];
  	$scope.predicate = "-updated_at";
    var request = $http.get('https://api.github.com/users/AaronLlanos/repos');

    request.success(function (data) {
    	console.log(data);
    	$scope.githubProjects = data;
    });
    request.error(function (data) {
    	console.log(data);
    });
  }]);

angular.module('portfolioApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/contact.html',
    "<p>This is the contact view.</p> <ul ng-repeat=\"thing in contact.awesomeThings\"> <li>{{thing}}</li> </ul>"
  );


  $templateCache.put('views/footer.html',
    "<div class=\"footer bg-blue\"> <div class=\"container\"> <div class=\"col-xs-12 col-sm-6\"> <a href=\"https://www.facebook.com/aaron.llanos.7\" class=\"btn\"><i class=\"fa fa-facebook fa-2x\"></i></a> <a href=\"https://twitter.com/HookEM_A\" class=\"btn\"><i class=\"fa fa-twitter fa-2x\"></i></a> <a href=\"https://github.com/AaronLlanos\" class=\"btn\"><i class=\"fa fa-github fa-2x\"></i></a> <a href=\"https://instagram.com/aaronyolungz/\" class=\"btn\"><i class=\"fa fa-instagram fa-2x\"></i></a> <a href=\"https://www.linkedin.com/pub/aaron-llanos/85/960/253\" class=\"btn\"><i class=\"fa fa-linkedin fa-2x\"></i></a> </div> <div class=\"col-xs-6 col-sm-3\"> <p>Aaron Llanos</p> </div> <div class=\"col-xs-6 col-sm-3\"> <p class=\"text-right\"><span class=\"glyphicon glyphicon-heart\"> Yeomonn team</span></p> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"background-div\"> <img ng-repeat=\"instaPhoto in instaPhotosMe | orderBy:'rank'\" style=\"width: 20%; height: 20%\" class=\"img-responsive pull-left insta-photo\" ng-src=\"{{instaPhoto.image}}\"> </div> <div class=\"row clear-bg-div\"></div> <div class=\"row content-strip content-strip-top\"> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-4 col-xs-12 col-sm-4\"> <img class=\"img-circle img-responsive center-block\" ng-src=\"https://graph.facebook.com/1404466291/picture?type=large\"> <p class=\"text-center\" style=\"color: grey; font-size: 0.9em\">\"Being a front-end web developer without an online portfolio is like being Picasso with no canvas\"</p> </div> <div class=\"col-md-8 col-xs-12 col-sm-8\"> <h3 class=\"text-center\">Aaron Llanos<br><small>Web Development | User Interfacing</small></h3> <hr> <div class=\"col-xs-3 text-center\">{{age}}</div> <div class=\"col-xs-4 text-center\">Austin, TX</div> <div class=\"col-xs-5 text-center\">B.S.A Computer Science</div> </div> </div> </div> </div> <div id=\"anchor-about\" class=\"row content-strip bg-orange\"> <div class=\"col-xs-12\"> <h3 class=\"fancy-font text-center\">About Me</h3> <hr> <div class=\"col-xs-12 col-sm-4\"> <div class=\"col-xs-12\"> <div ng-controller=\"CarouselCtrl\"> <carousel interval=\"myInterval\" no-wrap=\"noWrapSlides\"> <slide ng-repeat=\"slide in instaPhotosSchool | limitTo:10\" active=\"slide.active\"> <img ng-src=\"{{slide.image}}\" style=\"margin:auto\"> </slide> </carousel> </div> </div> <h3 class=\"fancy-font text-center\">UT Austin-Hook 'Em</h3> <hr> <p> I am a proud graduate of The University of Texas at Austin. Four and a half years of Texas Football, three hundred gallons of ☕️, and friends for a lifetime. This experience truly could not have been better. I link to think that the only way it could have been better is if I had more time to spend on The 40 acres. </p> </div> <div class=\"col-xs-12 col-sm-4\"> <div class=\"col-xs-12\"> <div ng-controller=\"CarouselCtrl\"> <carousel interval=\"myInterval\" no-wrap=\"noWrapSlides\"> <slide ng-repeat=\"slide in instaPhotosMila | limitTo:10\" active=\"slide.active\"> <img ng-src=\"{{slide.image}}\" style=\"margin:auto\"> </slide> </carousel> </div> </div> <h3 class=\"fancy-font text-center\">Mila</h3> <hr> <p> My beutiful little girl, Mila. She was born on April 23rd, 2015. She goes everywhere with me and she is the sweetest Husky known to mankind. There's not a single mean bone in her body. </p> </div> <div class=\"col-xs-12 col-sm-4\"> <div class=\"col-xs-12\"> <div ng-controller=\"CarouselCtrl\"> <carousel interval=\"myInterval\" no-wrap=\"noWrapSlides\"> <slide ng-repeat=\"slide in instaPhotosMe | limitTo:10\" active=\"slide.active\"> <img ng-src=\"{{slide.image}}\" style=\"margin:auto\"> </slide> </carousel> </div> </div> <h3 class=\"fancy-font text-center\">Myself</h3> <hr> <p> Hello, I am Aaron Llanos. I love to code and I also enjoy helping others with anything that I can. I have a HUGE family which I love with all of my heart. I love to skateboard, freestyle rap, jam out (to Pearl Jam, Red Hot Chili Peppers, Foo Fighters...), drive fast cars, watch movies, and eat popcorn. If I had to choose a favorite author it would most defintely be Kurt Vonnegut. I love <a href=\"http://campkesem.org/\">Camp Kesem</a> and would do anything if it means helping out children from hardships. After all, they are the future of world and I must lead by example. If you would like to no more lets get in contact! </p> </div> </div> </div>  <div id=\"anchor-projects\" class=\"row content-strip bg-green\" ng-controller=\"ProjectsCtrl\" data-spy=\"scroll\" data-target=\"#scrollspy-projects\" style=\"position: relative !important\"> <div class=\"col-xs-12\"> <h3 class=\"fancy-font text-center\">Projects</h3> <hr> <div class=\"col-xs-12 col-sm-3\"> <ul id=\"scrollspy-projects\" class=\"nav nav-pills nav-stacked\" role=\"navigation\"> <li ng-repeat=\"project in githubProjects | orderBy:predicate\" role=\"presentation\"><a href=\"#{{project.id}}\">{{project.name}}</a></li> </ul> </div> <div class=\"col-xs-12 col-sm-9 table-scroll\" style=\"overflow-y: scroll; max-height: 460px\"> <div ng-repeat=\"project in githubProjects | orderBy:predicate\" id=\"{{project.id}}\" style=\"height: 460px\"> <h4>{{project.name}}</h4> <p> {{project.description}} <a class=\"btn btn-info\" href=\"{{project.html_url}}\">View Source</a></p> <hr> </div> </div> </div> </div> <div id=\"anchor-skills\" class=\"row content-strip bg-red\" ng-controller=\"SkillsCtrl\"> <div class=\"col-xs-12\"> <h3 class=\"fancy-font text-center\">Skills</h3> <hr> Sort by: &nbsp; <button class=\"btn btn-sm btn-info\" ng-click=\"order('exp')\">Experience</button> <button class=\"btn btn-sm btn-info\" ng-click=\"order('penjoyment')\">Personal Enjoyment</button> <br> <br> <div class=\"col-xs-6 col-sm-3\" ng-repeat=\"skill in mySkills | orderBy:predicate\"> <div class=\"card card-slide\" tooltip-placement=\"bottom\" tooltip=\"{{skill.desc}}\"> <h4 class=\"comic-font text-center\">{{skill.name}}</h4> </div> </div> </div> </div> <div id=\"anchor-contact\" class=\"row content-strip bg-purple\" ng-controller=\"FeedbackCtrl\"> <div class=\"container\"> <div class=\"row\"> <h3 class=\"fancy-font text-center\">Contact/Feedback</h3> <hr> <div class=\"col-md-12\"> <form class=\"form-horizontal\"> <!-- Text input--> <div class=\"form-group\"> <div class=\"col-xs-6\"> <input name=\"firstname\" ng-model=\"feedback.firstname\" type=\"text\" placeholder=\"First Name\" class=\"form-control input-md\"> </div> <div class=\"col-xs-6\"> <input name=\"lastname\" ng-model=\"feedback.lastname\" type=\"text\" placeholder=\"Last Name\" class=\"form-control input-md\"> </div> </div> <div class=\"form-group\"> <div class=\"col-xs-12\"> <input name=\"email\" ng-model=\"feedback.email\" type=\"email\" placeholder=\"Email\" class=\"form-control input-md\"> </div> </div> <h2> Rating: &nbsp; <rating ng-model=\"feedback.rating\" max=\"rating.max\" readonly on-hover=\"rating.hoveringOver(value)\" on-leave=\"rating.leavingRating()\"></rating> <span class=\"label\" ng-class=\"{'label-danger': rating.percent<30, 'label-warning': rating.percent>=30 && rating.percent<70, 'label-success': rating.percent>=70}\" ng-show=\"!rating.isReadonly\">{{rating.percent}}%</span> </h2> <div class=\"form-group\"> <div class=\"col-xs-12\"> <textarea name=\"comment\" ng-model=\"feedback.comment\" type=\"comment\" placeholder=\"Enter your comment or feedback or anything you want here!\" class=\"form-control input-md\" rows=\"12\"></textarea> </div> </div> <!-- Button --> <div class=\"form-group center-block\"> <div class=\"col-xs-6\"> <button name=\"submit\" ng-click=\"feedback.submit()\" class=\"btn btn-success btn-block\">Submit</button> </div> </div> </form> </div> <!-- <div class=\"col-xs-12 col-sm-2\"><h4>or</h4></div>\n" +
    "\t\t\t<div class=\"col-sm-5\">\n" +
    "\t\t\t\t<rating ng-model=\"rate\" max=\"max\" readonly=\"isReadonly\" on-hover=\"hoveringOver(value)\" on-leave=\"overStar = null\" titles=\"['one','two','three']\" ></rating>\n" +
    "\t\t\t\t<span class=\"label\" ng-class=\"{'label-warning': percent<30, 'label-info': percent>=30 && percent<70, 'label-success': percent>=70}\" ng-show=\"overStar && !isReadonly\">{{percent}}%</span>\n" +
    "\t\t\t</div> --> </div> </div> </div>"
  );


  $templateCache.put('views/navbar.html',
    "<nav id=\"scrollspy-nav\" class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\" ng-controller=\"NavbarCtrl\"> <div class=\"container\"> <div class=\"navbar-header\"> <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#js-navbar-collapse\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <a class=\"navbar-brand\" href=\"#about\"><span class=\"glyphicon glyphicon-th\"></span>&nbsp;Aaron</a> </div> <div class=\"collapse navbar-collapse\" id=\"js-navbar-collapse\"> <ul class=\"nav navbar-nav\"> <li class=\"underline-animate\" ng-repeat=\"item in navItems\"><a href=\"{{item.anchor}}\" ng-click=\"gotoAnchor($event, item.anchor)\">{{item.name}}</a></li> </ul> <ul class=\"nav navbar-nav navbar-right\"> <li><a popover-template=\"popover.signupTemplate\" popover-title=\"Signup\" popover-trigger=\"click\" popover-placement=\"bottom\">Signup</a></li> <li><a popover-template=\"popover.loginTemplate\" popover-title=\"Login\" popover-trigger=\"click\" popover-placement=\"bottom\">Login</a></li> <script type=\"text/ng-template\" id=\"loginTemplate.html\"><div class=\"alert hidden\">\n" +
    "                        <p id=\"alert-text\"><b id=\"alert-type\"></b><span id=\"alert-message\"></span></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"email\" placeholder=\"Email\" ng-model=\"login.email\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"password\" placeholder=\"Password\" ng-model=\"login.password\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <button class=\"btn btn-success\" ng-click=\"login.submit()\">Submit</button>\n" +
    "                    </div></script> <script type=\"text/ng-template\" id=\"signupTemplate.html\"><div class=\"alert hidden\">\n" +
    "                        <p id=\"alert-text\"><b id=\"alert-type\"></b><span id=\"alert-message\"></span></p>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"text\" placeholder=\"First Name\" ng-model=\"signup.firstname\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"text\" placeholder=\"Last Name\" ng-model=\"signup.lastname\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"email\" placeholder=\"Email\" ng-model=\"signup.email\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"password\" placeholder=\"Password\" ng-model=\"signup.password1\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <input type=\"password\" placeholder=\"Re-type Password\" ng-model=\"signup.password2\" class=\"form-control\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <button class=\"btn btn-success\" ng-click=\"signup.submit()\">Submit</button>\n" +
    "                    </div></script> </ul> </div> </div> <div id=\"nav-alert\" ng-show=\"notification.show\" class=\"row navalert-show\"> <div class=\"container\"> <p><b ng-bind=\"notification.type\"></b>&nbsp;<span ng-bind=\"notification.message\"></span></p> </div> </div> </nav>"
  );


  $templateCache.put('views/project.html',
    ""
  );

}]);
