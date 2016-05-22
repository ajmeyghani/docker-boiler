(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["myapp"] = factory(require("angular"));
	else
		root["myapp"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var angular = __webpack_require__(/*! angular */ 1);
	var appModule = angular.module('app', []);
	
	__webpack_require__(/*! services */ 2)(appModule);
	__webpack_require__(/*! directives/page */ 3)(appModule);
	
	angular.element(document).ready(function () {
	  angular.bootstrap(document.getElementsByTagName('body')[0], ['app']);
	});
	
	exports.default = appModule;
	module.exports = exports['default'];

/***/ },
/* 1 */
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (ngModule) {
	  ngModule.factory('postService', function ($http) {
	    return {
	      getPosts: function getPosts() {
	        return $http.get('/api/posts');
	      }
	    };
	  });
	};
	
	module.exports = exports['default'];

/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./src/directives/page/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (pageModule) {
	
	  pageModule.run(function ($templateCache) {
	    $templateCache.put('page-tpl', __webpack_require__(/*! ./page-tpl.html */ 4));
	  });
	
	  pageModule.directive('page', function () {
	    return {
	      restrict: 'E',
	      controller: 'pageCtrl',
	      controllerAs: 'pageCtrl',
	      templateUrl: 'page-tpl'
	    };
	  });
	
	  pageModule.controller('pageCtrl', function ($scope, postService) {
	    var pageCtrl = this;
	    pageCtrl.hello = 'hello';
	
	    postService.getPosts().then(function ok(resp) {
	      pageCtrl.posts = resp.data;
	      $scope.$broadcast('posts:loaded', resp.data);
	    }, function err(errResp) {
	      console.log(errResp);
	    });
	
	    $scope.$watch('pageCtrl.posts', function (newVal, oldVal) {
	      if (newVal !== oldVal) {
	        console.log(newVal);
	      }
	    });
	
	    $scope.$on('posts:loaded', function (e, posts) {
	      // all the posts are loaded ...
	    });
	  });
	};
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/*!*******************************************!*\
  !*** ./src/directives/page/page-tpl.html ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = "<p>{{pageCtrl.hello}}</p>\n<ul>\n  <li ng-repeat=\"post in pageCtrl.posts\">\n    {{ post.title }}\n  </li>\n</ul>\n"

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map