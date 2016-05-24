class Explosion {
  constructor(tile) {
    this.x = tile.x;
    this.y = tile.y;
    this.height = tile.height;
    this.width = tile.width;
    this.xCoor = tile.x * this.width + this.width / 2;
    this.yCoor = tile.y * this.height + this.height / 2;
    this.image = this.createImage();
  }

  draw(context) {
    context.drawImage(this.image, (this.x * this.width + 5), (this.y * this.height - 2));
  }

  onload(context) {
    this.image.onload = function () {
      this.draw(context);
    }.bind(this);
  }

  createImage() {
    let image = new Image();
    image.src = `../assets/fire.png`;
    return image;
  }
}

module.exports = Explosion;
