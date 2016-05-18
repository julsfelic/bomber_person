const GameEngine = require('./game_engine');
const Map = require('./map');
const Person = require('./person');
const Controller = require('./controller');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const map = new Map(435, 512);
const playerOne = new Person({id: 1, x: 1, y: 1, context: context});
const playerTwo = new Person({id: 2, x: 13, y: 11, context: context});
const people = {1: playerOne, 2: playerTwo};
const gameEngine = new GameEngine(people, map);
const controllerOne = new Controller(1, {
  '38': 'up',
  '39': 'right',
  '40': 'down',
  '37': 'left',
  '77': 'bomb'
}, gameEngine);
const controllerTwo = new Controller(2, {
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
