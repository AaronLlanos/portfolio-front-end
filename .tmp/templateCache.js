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