class Graphic {
  constructor(drawables, context) {
    this.drawables = drawables;
    this.context = context;
  }

  draw() {
    requestAnimationFrame(function gameLoop() {
      for (let i = 0; i < this.drawables.length; i++) {
        this.drawables.draw();
      }
      requestAnimationFrame(gameLoop.bind(this));
    }.bind(this));
  }
}

module.exports = Graphic;
