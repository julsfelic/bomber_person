/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	function Block(x, y, width, height, context) {
	  this.x = x;
	  this.y = y;
	  this.width = width || 10;
	  this.height = height || 10;
	  this.context = context;
	}

	Block.prototype.draw = function () {
	  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
	  context.fillRect(this.x, this.y, this.width, this.height);
	  return this;
	};

	Block.prototype.move = function (x, y) {
	  this.x = this.x + x;
	  this.y = this.y + y;
	  return this;
	};

	var b = new Block(50, 50, 10, 10, context);

	function gemeleep() {
	  b.move(0, -1).draw();
	  if (b.y <= 10) {
	    requestAnimationFrame(gameLoop);
	    return;
	  }
	  requestAnimationFrame(gemeleep);
	}

	function gameLoop() {
	  b.move(0, 1).draw();
	  if (b.y >= 290) {
	    requestAnimationFrame(gemeleep);
	    return;
	  }
	  requestAnimationFrame(gameLoop);
	}

	requestAnimationFrame(gameLoop);

/***/ }
/******/ ]);