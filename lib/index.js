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

Block.prototype.move  = function (x, y) {
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
