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
	var People = __webpack_require__(2);
	var Controller = __webpack_require__(5);
	var Graphic = __webpack_require__(6);
	var Map = __webpack_require__(7);

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var map = new Map(435, 512);
	var graphic = new Graphic([], context);
	var people = new People([{ id: 1,
	  x: 1,
	  y: 1,
	  path: "/player-down-",
	  context: context
	}, { id: 2,
	  x: 13,
	  y: 11,
	  path: "/player-up-",
	  context: context
	}]);
	var gameEngine = new GameEngine(people, map, graphic);
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
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var GameEngine = (function () {
	  function GameEngine(people, map, graphic) {
	    _classCallCheck(this, GameEngine);

	    this.people = people;
	    this.map = map;
	    this.graphic = graphic;
	    this.graphic.drawables = [this.map, this.people];
	  }

	  _createClass(GameEngine, [{
	    key: 'move',
	    value: function move(id, x, y, direction) {
	      if (this.zeroHealth(id)) {
	        return;
	      }
	      var person = this.people.get(id);
	      person.path = '/player-' + direction + '-';
	      var xCoor = x + person.x;
	      var yCoor = y + person.y;
	      if (this.map.occupied(xCoor, yCoor)) {
	        return;
	      } else {
	        person.move(x, y);
	      }
	    }
	  }, {
	    key: 'dropBomb',
	    value: function dropBomb(id) {
	      if (this.zeroHealth(id)) {
	        return;
	      }
	      var person = this.people.get(id);
	      var x = person.x;
	      var y = person.y;
	      if (this.map.occupied(x, y)) {
	        return;
	      } else {
	        this.map.tile(x, y).createBomb();
	      }
	      setTimeout((function () {
	        this.map.tile(x, y).destroyBomb();
	        this.explosion(person.id, x, y);
	      }).bind(this), 2000);
	    }
	  }, {
	    key: 'explosion',
	    value: function explosion(id, x, y) {
	      var person = this.people.get(id);
	      this.map.tile(x, y).createExplosion();
	      for (var i = 0; i < person.bombSize; i++) {
	        this.map.tile(x + i, y).createExplosion();
	        this.map.tile(x - i, y).createExplosion();
	        this.map.tile(x - i, y).createExplosion();
	        this.map.tile(x, y + i).createExplosion();
	        this.map.tile(x, y - i).createExplosion();
	      }
	      setTimeout((function () {
	        this.map.tile(x, y).destroyExplosion();
	        for (var i = 0; i < person.bombSize; i++) {
	          this.map.tile(x + i, y).destroyExplosion();
	          this.map.tile(x - i, y).destroyExplosion();
	          this.map.tile(x - i, y).destroyExplosion();
	          this.map.tile(x, y + i).destroyExplosion();
	          this.map.tile(x, y - i).destroyExplosion();
	        }
	      }).bind(this), 1000);
	    }
	  }, {
	    key: 'peopleStatus',
	    value: function peopleStatus() {
	      var people = this.people.all();
	      for (var i = 0; i < people.length; i++) {
	        var person = people[i];
	        var tile = this.map.tile(person.x, person.y);
	        if (tile.contains['explosion']) {
	          person.health = person.health - 1;
	        }
	      }
	      setTimeout(this.peopleStatus.bind(this), 1000 / 12);
	    }
	  }, {
	    key: 'zeroHealth',
	    value: function zeroHealth(id) {
	      var person = this.people.get(id);
	      return person.health < 1;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.peopleStatus();
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

	var Person = __webpack_require__(3);

	var People = (function () {
	  function People(optionsArray) {
	    _classCallCheck(this, People);

	    this.players = {};
	    if (Array.isArray(optionsArray)) {
	      for (var i = 0; i < optionsArray.length; i++) {
	        this.set(optionsArray[i]);
	      }
	    } else {
	      this.set(optionsArray);
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
	  }, {
	    key: 'destroy',
	    value: function destroy(id) {
	      delete this.players[id];
	    }
	  }]);

	  return People;
	})();

	module.exports = People;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var generateGif = __webpack_require__(4);

	var Person = (function () {
	  function Person(options) {
	    _classCallCheck(this, Person);

	    this.id = options.id;
	    this.x = options.x;
	    this.y = options.y;
	    this.width = 34;
	    this.height = 34;
	    this.bombSize = 2;
	    this.health = 1;
	    this.path = options.path;
	    generateGif.call(this, { frames: 3, refresh: 200 });
	  }

	  _createClass(Person, [{
	    key: 'move',
	    value: function move(rightLeft, northSouth) {
	      this.x = this.x + rightLeft;
	      this.y = this.y + northSouth;
	    }
	  }, {
	    key: 'onload',
	    value: function onload(context) {
	      this.gif.onload = (function () {
	        this.draw(context);
	      }).bind(this);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      if (this.health >= 1) {
	        context.drawImage(this.gif, this.x * this.height + 6, this.y * this.width - 14);
	      } else {}
	    }
	  }]);

	  return Person;
	})();

	module.exports = Person;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	function generateGif(options) {
	  var _this = this;

	  var currentFrame = 1;
	  this.gif = new Image();

	  setInterval(function () {
	    if (currentFrame > options.frames) {
	      currentFrame = 1;
	    }
	    _this.gif.src = "../assets" + _this.path + currentFrame + ".png";
	    currentFrame++;
	  }, options.refresh);
	}

	module.exports = generateGif;

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
	        this.gameEngine.move(this.id, 0, -1, 'up');
	      }
	      if (this.map[this.directions["down"]] === true) {
	        this.gameEngine.move(this.id, 0, 1, 'down');
	      }
	      if (this.map[this.directions["right"]] === true) {
	        this.gameEngine.move(this.id, 1, 0, 'right');
	      }
	      if (this.map[this.directions["left"]] === true) {
	        this.gameEngine.move(this.id, -1, 0, 'left');
	      }
	      if (this.map[this.directions["bomb"]] === true) {
	        this.gameEngine.dropBomb(this.id);
	      }
	      setTimeout(this.loop.bind(this), 1000 / 12);
	    }
	  }]);

	  return Controller;
	})();

	module.exports = Controller;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Graphic = (function () {
	  function Graphic(drawables, context) {
	    _classCallCheck(this, Graphic);

	    this.drawables = drawables;
	    this.context = context;
	    this.onload();
	  }

	  _createClass(Graphic, [{
	    key: "onload",
	    value: function onload() {
	      requestAnimationFrame((function gameLoop() {
	        for (var i = 0; i < this.drawables.length; i++) {
	          this.drawables[i].onload(this.context);
	        }
	      }).bind(this));
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      requestAnimationFrame((function gameLoop() {
	        this.clear();
	        for (var i = 0; i < this.drawables.length; i++) {
	          this.drawables[i].draw(this.context);
	        }
	        requestAnimationFrame(gameLoop.bind(this));
	      }).bind(this));
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.context.clearRect(0, 0, 1000, 1000);
	    }
	  }]);

	  return Graphic;
	})();

	module.exports = Graphic;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Tile = __webpack_require__(8);

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
	      return x <= this.grid.length || y <= this.grid[0].length || x > 0 || y > 0;
	    }
	  }, {
	    key: 'tile',
	    value: function tile(x, y) {
	      if (!this.inbounds(x, y)) {
	        return new Tile(-1, -1, true);
	      }
	      return this.grid[x][y];
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      for (var i = 0; i < this.grid.length; i++) {
	        for (var j = 0; j < this.grid[0].length; j++) {
	          this.grid[i][j].draw(context);
	        }
	      }
	    }
	  }, {
	    key: 'onload',
	    value: function onload(context) {
	      for (var i = 0; i < this.grid.length; i++) {
	        for (var j = 0; j < this.grid[0].length; j++) {
	          this.grid[i][j].onload(context);
	        }
	      }
	    }
	  }, {
	    key: 'occupied',
	    value: function occupied(x, y) {
	      if (!this.inbounds(x, y)) {
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
	              var tile = new Tile(i, j, false);
	              grid[i][j] = tile.createBlock();
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Block = __webpack_require__(9);
	var Bomb = __webpack_require__(10);
	var Explosion = __webpack_require__(11);
	var People = __webpack_require__(2);

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
	      people: false,
	      bomb: false,
	      explosion: false
	    };
	    this.occupant = {
	      block: null,
	      people: null,
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
	    key: 'createBlock',
	    value: function createBlock() {
	      var block = new Block(this);
	      this.occupyWith('block', block);
	      return this;
	    }
	  }, {
	    key: 'createBomb',
	    value: function createBomb() {
	      var bomb = new Bomb(this);
	      this.occupyWith('bomb', bomb);
	      return this;
	    }
	  }, {
	    key: 'destroyBomb',
	    value: function destroyBomb() {
	      this.unoccupy('bomb');
	      return this;
	    }
	  }, {
	    key: 'createExplosion',
	    value: function createExplosion() {
	      var explosion = new Explosion(this);
	      this.occupyWith('explosion', explosion);
	      return this;
	    }
	  }, {
	    key: 'destroyExplosion',
	    value: function destroyExplosion() {
	      this.unoccupy('explosion');
	      this.unoccupy('block');
	      // this.destroyPeople();
	      return this;
	    }

	    // createPerson(person) {
	    //   if (this.contains['people']) {
	    //     this.occupant['people'].set(person);
	    //   } else {
	    //     this.contains['people'] = true;
	    //     this.occupant['people'] = new People(person);
	    //   }
	    //   return this;
	    // }
	    //
	    // destroyPerson(person) {
	    //   if (this.contains['people']) {
	    //     this.contains['people'] = false;
	    //     this.occupant['people'].destroy(person.id);
	    //   }
	    // }
	    //
	    // destroyPeople() {
	    //   if (this.contains['people']) {
	    //     let people = this.occupant['people'].all();
	    //     for (let i = 0; i < people.length; i++) {
	    //       this.destroyPerson(people[i]);
	    //       people[i].health = people[i].health - 1;
	    //     }
	    //   }
	    // }

	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      var keys = Object.keys(this.occupant);
	      for (var i = 0; i < keys.length; i++) {
	        var value = this.occupant[keys[i]];
	        if (value !== null) {
	          value.draw(context);
	        }
	      }
	    }
	  }, {
	    key: 'onload',
	    value: function onload(context) {
	      var keys = Object.keys(this.occupant);
	      for (var i = 0; i < keys.length; i++) {
	        var value = this.occupant[keys[i]];
	        if (value !== null) {
	          value.onload(context);
	        }
	      }
	    }
	  }]);

	  return Tile;
	})();

	module.exports = Tile;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Block = (function () {
	  function Block(tile) {
	    _classCallCheck(this, Block);

	    this.x = tile.x;
	    this.y = tile.y;
	    this.height = tile.height;
	    this.width = tile.width;
	    this.xCoor = tile.x * this.width + this.width / 2;
	    this.yCoor = tile.y * this.height + this.height / 2;
	    this.image = this.createImage();
	  }

	  //
	  // function createImage() {
	  //   let image = new Image();
	  //   image.src = `../assets/block.png`;
	  //   return image;
	  // }

	  _createClass(Block, [{
	    key: "draw",
	    value: function draw(context) {
	      context.drawImage(this.image, this.x * this.width + 3, this.y * this.height - 2);
	    }
	  }, {
	    key: "onload",
	    value: function onload(context) {
	      this.image.onload = (function () {
	        this.draw(context);
	      }).bind(this);
	    }
	  }, {
	    key: "createImage",
	    value: function createImage() {
	      var image = new Image();
	      image.src = "../assets/block.png";
	      return image;
	    }
	  }]);

	  return Block;
	})();

	module.exports = Block;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bomb = (function () {
	  function Bomb(tile) {
	    _classCallCheck(this, Bomb);

	    this.x = tile.x;
	    this.y = tile.y;
	    this.height = tile.height;
	    this.width = tile.width;
	    this.xCoor = tile.x * this.width + this.width / 2;
	    this.yCoor = tile.y * this.height + this.height / 2;
	    this.image = createImage();
	  }

	  _createClass(Bomb, [{
	    key: "draw",
	    value: function draw(context) {
	      context.drawImage(this.image, this.x * this.width + 5, this.y * this.height - 2);
	    }
	  }, {
	    key: "onload",
	    value: function onload(context) {
	      this.image.onload = (function () {
	        this.draw(context);
	      }).bind(this);
	    }
	  }]);

	  return Bomb;
	})();

	function createImage() {
	  var image = new Image();
	  image.src = "../assets/bomb.gif";
	  return image;
	}

	module.exports = Bomb;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Explosion = (function () {
	  function Explosion(tile) {
	    _classCallCheck(this, Explosion);

	    this.x = tile.x;
	    this.y = tile.y;
	    this.height = tile.height;
	    this.width = tile.width;
	    this.xCoor = tile.x * this.width + this.width / 2;
	    this.yCoor = tile.y * this.height + this.height / 2;
	    this.image = createImage();
	  }

	  _createClass(Explosion, [{
	    key: "draw",
	    value: function draw(context) {
	      context.drawImage(this.image, this.x * this.width + 5, this.y * this.height - 2);
	    }
	  }, {
	    key: "onload",
	    value: function onload(context) {
	      this.image.onload = (function () {
	        this.draw(context);
	      }).bind(this);
	    }
	  }]);

	  return Explosion;
	})();

	function createImage() {
	  var image = new Image();
	  image.src = "../assets/fire.png";
	  return image;
	}

	module.exports = Explosion;

/***/ }
/******/ ]);