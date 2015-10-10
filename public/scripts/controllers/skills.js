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