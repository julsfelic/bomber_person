const GameEngine = require('./game_engine');
const Map = require('./map');
const Person = require('./person');
const Controller = require('./controller');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const map = new Map(300, 500);
const playerOne = new Person(1, 0, 0);
const playerTwo = new Person(2, 12, 10);
const people = {1: playerOne, 2: playerTwo};
const gameEngine = new GameEngine(people, map, context);
const controller = new Controller(1, {
  '38': 'up',
  '39': 'right',
  '40': 'down',
  '37': 'left',
  '77': 'bomb'
}, gameEngine);

gameEngine.start();
controller.bindEvents();














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
