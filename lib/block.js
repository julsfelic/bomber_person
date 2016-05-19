const Tile = require('./tile');


class Block {
  constructor(tile, context) {
    this.x = tile.x;
    this.y = tile.y;
    this.height = tile.height;
    this.width = tile.width;
    this.xCoor = tile.x * this.width + this.width / 2;
    this.yCoor = tile.y * this.height + this.height / 2;
    this.context = context;
    this.image = createImage();
  }

  draw() {
    this.context.drawImage(this.image, (this.x * this.height + 4), (this.y * this.width - 1));
  }
}

function createImage() {
  let image = new Image();
  image.src = `../assets/block.png`;
  return image;
}

module.exports = Block;
