const Tile = require('./tile');

class Map {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    let tile = new Tile();

    this.boundaryHeightTop = tile.height;
    this.boundaryHeightBottom = height - tile.height;
    this.boundaryWidthLeft = tile.width;
    this.boundaryWidthRight = width - tile.width;
  }

  inbounds(x, y) {
    return x < this.boundaryWidthLeft || x > this.boundaryWidthRight || y < this.boundaryHeightTop || y > this.boundaryHeightBottom;
  }
}

module.exports = Map;
