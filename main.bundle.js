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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var GameEngine = __webpack_require__(1);
	var Map = __webpack_require__(2);
	var Person = __webpack_require__(4);
	var Controller = __webpack_require__(5);

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var map = new Map(435, 512);
	var playerOne = new Person(1, 1, 1, context);
	var playerTwo = new Person(2, 13, 11, context);
	var people = { 1: playerOne, 2: playerTwo };
	var gameEngine = new GameEngine(people, map);
	var controllerOne = new Controller(1, {
	  '38': 'up',
	  '39': 'right',
	  '40': 'down',
	  '37': 'left',
	  '77': 'bomb'
	}, gameEngine);
	var controllerTwo = new Controller(2, {
	  '87': 'up',
	  '68': 'right',
	  '83': 'down',
	  '65': 'left',
	  '67': 'bomb'
	}, gameEngine);

	gameEngine.start();
	controllerOne.bindEvents();
	controllerTwo.bindEvents();

	// function Block(x, y, width, height, context) {
	//   this.x = x;
	//   this.y = y;
	//   this.width = width || 10;
	//   this.height = height || 10;
	//   this.context = context;
	// }
	//
	// Block.prototype.draw = function () {
	//   context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas.
	//   context.fillRect(this.x, this.y, this.width, this.height);
	//   return this;
	// };
	//
	// Block.prototype.move  = function (x, y) {
	//   this.x = this.x + x;
	//   this.y = this.y + y;
	//   return this;
	// };
	//
	// var b = new Block(50, 50, 10, 10, context);
	//
	// function gemeleep() {
	//   b.move(0, -1).draw();
	//   // console.log("y:" + b.y);
	//   // console.log("x:" + b.x);
	//   if (b.y <= 10) {
	//     requestAnimationFrame(gameLoop);
	//     return;
	//   }
	//   requestAnimationFrame(gemeleep);
	// }
	//
	// function gameLoop() {
	//   b.move(0, 1).draw();
	//   // console.log("y:" + b.y);
	//   // console.log("x:" + b.x);
	//   if (b.y >= 290) {
	//     requestAnimationFrame(gemeleep);
	//     return;
	//   }
	//   requestAnimationFrame(gameLoop);
	// }
	//
	// requestAnimationFrame(gameLoop);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameEngine = (function () {
	  function GameEngine(people, map) {
	    _classCallCheck(this, GameEngine);

	    this.people = people;
	    this.map = map;
	  }

	  _createClass(GameEngine, [{
	    key: "move",
	    value: function move(id, x, y) {
	      var person = this.people[id];
	      var xCoor = x + person.x;
	      var yCoor = y + person.y;
	      if (this.map.occupied(xCoor, yCoor)) {
	        return;
	      } else {
	        person.move(x, y);
	      }
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      requestAnimationFrame((function gameLoop() {
	        // that.context.fillRect(40, 40, 100, 100)
	        for (var person in this.people) {
	          this.people[person].draw();
	        }

	        requestAnimationFrame(gameLoop.bind(this));
	      }).bind(this));
	    }
	  }]);

	  return GameEngine;
	})();

	module.exports = GameEngine;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Tile = __webpack_require__(3);

	var Map = (function () {
	  function Map(height, width) {
	    _classCallCheck(this, Map);

	    this.grid = this.createGrid();
	    this.height = height;
	    this.width = width;

	    var tile = new Tile();

	    this.boundaryHeightTop = tile.height;
	    this.boundaryHeightBottom = height - tile.height;
	    this.boundaryWidthLeft = tile.width;
	    this.boundaryWidthRight = width - tile.width;
	  }

	  _createClass(Map, [{
	    key: 'inbounds',
	    value: function inbounds(x, y) {
	      return x > this.boundaryWidthLeft && x < this.boundaryWidthRight && y > this.boundaryHeightTop && y < this.boundaryHeightBottom;
	    }
	  }, {
	    key: 'occupied',
	    value: function occupied(x, y) {
	      if (x >= this.grid.length || y >= this.grid[0].length || x < 0 || y < 0) {
	        return true;
	      }
	      return this.grid[x][y].occupied;
	    }
	  }, {
	    key: 'createGrid',
	    value: function createGrid() {
	      // let tileWidth = 15 - 2;
	      // let tileHeight = 13 - 2;
	      var tileWidth = 15;
	      var tileHeight = 13;
	      var grid = [];
	      for (var i = 0; i < tileWidth; i++) {
	        grid[i] = [];
	      }
	      // False indicates there is no boundary
	      // True indicates there is a boundary
	      for (var i = 0; i < tileWidth; i++) {
	        if (i === 0 || i === 14) {
	          for (var j = 0; j < tileHeight; j++) {
	            grid[i][j] = new Tile(i, j, true);
	          }
	        } else if (i % 2 !== 0 && i !== 0) {
	          for (var j = 0; j < tileHeight; j++) {
	            if (j === 0 || j === 12) {
	              grid[i][j] = new Tile(i, j, true);
	            } else {
	              grid[i][j] = new Tile(i, j, false);
	            }
	          }
	        } else {
	          for (var j = 0; j < tileHeight; j++) {
	            if (j % 2 !== 0 && j !== 0) {
	              grid[i][j] = new Tile(i, j, false);
	            } else {
	              grid[i][j] = new Tile(i, j, true);
	            }
	          }
	        }
	      }
	      return grid;
	    }
	  }]);

	  return Map;
	})();

	module.exports = Map;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tile = (function () {
	  function Tile(x, y) {
	    var occupied = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    _classCallCheck(this, Tile);

	    this.x = x;
	    this.y = y;
	    this.height = 34;
	    this.width = 34;
	    this.xCoor = x * this.width + this.width / 2;
	    this.yCoor = y * this.height + this.height / 2;
	    this.occupied = occupied;
	  }

	  _createClass(Tile, [{
	    key: "occupy",
	    value: function occupy() {
	      this.status = true;
	    }
	  }]);

	  return Tile;
	})();

	module.exports = Tile;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Person = (function () {
	  function Person(id, x, y, context) {
	    _classCallCheck(this, Person);

	    this.id = id;
	    this.x = x;
	    this.y = y;
	    this.width = 34;
	    this.height = 34;
	    this.context = context;

	    var image = new Image();
	    image.src = "../assets/player" + this.id + ".png";

	    this.image = image;
	  }

	  _createClass(Person, [{
	    key: "move",
	    value: function move(rightLeft, northSouth) {
	      this.clear();
	      this.x = this.x + rightLeft;
	      this.y = this.y + northSouth;
	      this.draw();
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.context.clearRect(this.x * this.height, this.y * this.width - 14, this.width, this.height);
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      // this.context.fillRect((this.x * this.height), (this.y * this.width - 4), this.width, this.height);
	      this.context.drawImage(this.image, this.x * this.height + 6, this.y * this.width - 14);
	    }
	  }]);

	  return Person;
	})();

	module.exports = Person;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Controller = (function () {
	  function Controller(id, commands, gameEngine) {
	    _classCallCheck(this, Controller);

	    this.id = id;
	    this.keyStrokes = commands;
	    this.directions = {};
	    var keys = Object.keys(this.keyStrokes);
	    for (var i = 0; i < keys.length; i++) {
	      var value = this.keyStrokes[keys[i]];
	      this.directions[value] = keys[i];
	    }
	    this.gameEngine = gameEngine;
	  }

	  _createClass(Controller, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var canvas = document.getElementById('game');
	      var map = {};
	      document.addEventListener('keydown', (function (e) {
	        e.preventDefault();
	        map[e.keyCode] = true;
	      }).bind(this));

	      document.addEventListener('keyup', function (e) {
	        map[e.keyCode] = false;
	      });

	      while (true) {
	        if (map[this.directions["up"]] === true) {
	          this.gameEngine.move(this.id, 0, -1);
	        }
	        if (map[this.directions["down"]] === true) {
	          this.gameEngine.move(this.id, 0, 1);
	        }
	        if (map[this.directions["right"]] === true) {
	          this.gameEngine.move(this.id, 1, 0);
	        }
	        if (map[this.directions["left"]] === true) {
	          this.gameEngine.move(this.id, -1, 0);
	        }
	        // if (this.keyStrokes[keyCode] === "down") {
	        //   e.preventDefault();
	        //   this.gameEngine.move(this.id, 0, 1);
	        // }
	        // if (this.keyStrokes[keyCode] === "right") {
	        //   e.preventDefault();
	        //   this.gameEngine.move(this.id, 1, 0);
	        // }
	        // if (this.keyStrokes[keyCode] === "left") {
	        //   e.preventDefault();
	        //   this.gameEngine.move(this.id, -1, 0);
	        // }
	      }
	    }
	  }]);

	  return Controller;
	})();

	module.exports = Controller;

/***/ }
/******/ ]);