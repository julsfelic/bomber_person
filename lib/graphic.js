class Graphic {
  constructor(drawables, context) {
    this.drawables = drawables;
    this.context = context;
    this.onload();
    this.requestId = undefined;
  }

  onload() {
    requestAnimationFrame(function gameLoop() {
      for (let i = 0; i < this.drawables.length; i++) {
        this.drawables[i].onload(this.context);
      }
    }.bind(this));
  }

  draw() {
    this.requestId = requestAnimationFrame(function gameLoop() {
      this.clear();
      for (let i = 0; i < this.drawables.length; i++) {
        this.drawables[i].draw(this.context);
      }
      requestAnimationFrame(gameLoop.bind(this));
    }.bind(this));
  }

  clear() {
    this.context.clearRect(0, 0, 1000, 1000);
  }

}

module.exports = Graphic;
