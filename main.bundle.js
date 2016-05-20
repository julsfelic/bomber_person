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
	var People = __webpack_require__(4);
	var Controller = __webpack_require__(6);
	var Graphic = __webpack_require__(7);
	var Map = __webpack_require__(8);

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var map = new Map(435, 512);

	var graphic = new Graphic([], context);
	var people = new People([{ id: 1, x: 1, y: 1, context: context }, { id: 2, x: 13, y: 11, context: context }]);
	var gameEngine = new GameEngine(people, map, context, graphic);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Block = __webpack_require__(2);

	var GameEngine = (function () {
	  function GameEngine(people, map, context, graphic) {
	    _classCallCheck(this, GameEngine);

	    this.people = people;
	    this.map = map;
	    this.context = context;
	    this.graphic = graphic;
	    this.drawables = [this.map, this.people];
	  }

	  _createClass(GameEngine, [{
	    key: 'move',
	    value: function move(id, x, y) {
	      var person = this.people.get(id);
	      var xCoor = x + person.x;
	      var yCoor = y + person.y;
	      if (this.map.occupied(xCoor, yCoor)) {
	        return;
	      } else {
	        person.move(x, y);
	      }
	    }
	  }, {
	    key: 'placeBlocks',
	    value: function placeBlocks() {
	      var tile = this.map.grid[1][6];
	      var block = new Block(tile, this.context);
	      tile.occupyWith('block', block);

	      requestAnimationFrame((function makeblocks() {
	        block.draw();
	      }).bind(this));
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.graphic.onload();
	      this.graphic.draw();
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

	var Block = (function () {
	  function Block(tile, context) {
	    _classCallCheck(this, Block);

	    this.x = tile.x;
	    this.y = tile.y;
	    this.height = tile.height;
	    this.width = tile.width;
	    this.xCoor = tile.x * this.width + this.width / 2;
	    this.yCoor = tile.y * this.height + this.height / 2;
	    this.context = context;
	    this.image = createImage();
	  }

	  _createClass(Block, [{
	    key: 'draw',
	    value: function draw() {
	      this.context.drawImage(this.image, this.x * this.height + 4, this.y * this.width - 1);
	    }
	  }]);

	  return Block;
	})();

	function createImage() {
	  var image = new Image();
	  image.src = '../assets/block.png';
	  return image;
	}

	module.exports = Block;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Tile = (function () {
	  function Tile(x, y) {
	    var pillar = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    _classCallCheck(this, Tile);

	    this.x = x;
	    this.y = y;
	    this.height = 34;
	    this.width = 34;
	    this.xCoor = x * this.width + this.width / 2;
	    this.yCoor = y * this.height + this.height / 2;
	    this.contains = {
	      pillar: pillar,
	      block: false,
	      person: false,
	      bomb: false,
	      explosion: false
	    };
	    this.occupant = {
	      block: null,
	      person: null,
	      bomb: null,
	      explosion: null
	    };
	  }

	  _createClass(Tile, [{
	    key: 'occupied',
	    value: function occupied() {
	      return this.contains['pillar'] || this.contains['block'] || this.contains['bomb'];
	    }
	  }, {
	    key: 'occupyWith',
	    value: function occupyWith(key, value) {
	      this.occupant[key] = value;
	      this.contains[key] = true;
	    }
	  }, {
	    key: 'unoccupy',
	    value: function unoccupy(key) {
	      this.occupant[key] = null;
	      this.contains[key] = false;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {}
	  }]);

	  return Tile;
	})();

	module.exports = Tile;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Person = __webpack_require__(5);

	var People = (function () {
	  function People(optionsArray) {
	    _classCallCheck(this, People);

	    this.players = {};
	    for (var i = 0; i < optionsArray.length; i++) {
	      this.set(optionsArray[i]);
	    }
	  }

	  _createClass(People, [{
	    key: 'all',
	    value: function all() {
	      var keys = Object.keys(this.players);
	      var values = [];
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        values.push(this.players[key]);
	      }
	      return values;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      var values = this.all();
	      for (var i = 0; i < values.length; i++) {
	        values[i].draw(context);
	      }
	    }
	  }, {
	    key: 'onload',
	    value: function onload(context) {
	      var values = this.all();
	      for (var i = 0; i < values.length; i++) {
	        values[i].onload(context);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get(id) {
	      return this.players[id];
	    }
	  }, {
	    key: 'set',
	    value: function set(options) {
	      this.players[options.id] = new Person(options);
	    }
	  }]);

	  return People;
	})();

	module.exports = People;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Person = (function () {
	  function Person(options) {
	    _classCallCheck(this, Person);

	    this.id = options.id;
	    this.x = options.x;
	    this.y = options.y;
	    this.width = 34;
	    this.height = 34;
	    this.image = options.image || createImage(this.id);
	  }

	  _createClass(Person, [{
	    key: "move",
	    value: function move(rightLeft, northSouth) {
	      this.x = this.x + rightLeft;
	      this.y = this.y + northSouth;
	    }
	  }, {
	    key: "onload",
	    value: function onload(context) {
	      this.image.onload = (function () {
	        this.draw(context);
	      }).bind(this);
	    }
	  }, {
	    key: "clear",
	    value: function clear(context) {
	      context.clearRect(this.x * this.height, this.y * this.width - 14, this.width, this.height);
	    }
	  }, {
	    key: "draw",
	    value: function draw(context) {
	      this.clear(context);
	      context.drawImage(this.image, this.x * this.height + 6, this.y * this.width - 14);
	    }
	  }]);

	  return Person;
	})();

	function createImage(id) {
	  var image = new Image();
	  image.src = "../assets/player" + id + ".png";
	  return image;
	}

	module.exports = Person;

/***/ },
/* 6 */
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
	    this.map = {};
	    var keys = Object.keys(this.keyStrokes);
	    for (var i = 0; i < keys.length; i++) {
	      var value = this.keyStrokes[keys[i]];
	      this.directions[value] = keys[i];
	      this.map[keys[i]] = false;
	    }
	    this.gameEngine = gameEngine;
	  }

	  _createClass(Controller, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      document.addEventListener('keydown', (function (e) {
	        this.map[e.keyCode] = true;
	        e.preventDefault();
	      }).bind(this));

	      document.addEventListener('keyup', (function (e) {
	        this.map[e.keyCode] = false;
	      }).bind(this));
	      this.loop();
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      if (this.map[this.directions["up"]] === true) {
	        this.gameEngine.move(this.id, 0, -1);
	      }
	      if (this.map[this.directions["down"]] === true) {
	        this.gameEngine.move(this.id, 0, 1);
	      }
	      if (this.map[this.directions["right"]] === true) {
	        this.gameEngine.move(this.id, 1, 0);
	      }
	      if (this.map[this.directions["left"]] === true) {
	        this.gameEngine.move(this.id, -1, 0);
	      }
	      if (this.map[this.directions["bomb"]] === true) {
	        console.log("Boom!");
	      }
	      setTimeout(this.loop.bind(this), 1000 / 12);
	    }
	  }]);

	  return Controller;
	})();

	module.exports = Controller;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graphic = (function () {
	  function Graphic(drawables, context) {
	    _classCallCheck(this, Graphic);

	    this.drawables = drawables;
	    this.context = context;
	  }

	  _createClass(Graphic, [{
	    key: "onload",
	    value: function onload() {
	      requestAnimationFrame((function gameLoop() {
	        for (var i = 0; i < this.drawables.length; i++) {
	          this.drawables.onload(this.context);
	        }
	      }).bind(this));
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      requestAnimationFrame((function gameLoop() {
	        for (var i = 0; i < this.drawables.length; i++) {
	          this.drawables.draw(this.context);
	        }
	        requestAnimationFrame(gameLoop.bind(this));
	      }).bind(this));
	    }
	  }]);

	  return Graphic;
	})();

	module.exports = Graphic;

/***/ },
/* 8 */
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
	    key: 'draw',
	    value: function draw(context) {
	      return context;
	    }
	  }, {
	    key: 'onload',
	    value: function onload(context) {
	      return context;
	    }
	  }, {
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
	      return this.grid[x][y].occupied();
	    }
	  }, {
	    key: 'createGrid',
	    value: function createGrid() {
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

/***/ }
/******/ ]);