const Tile = require('./tile');

class Map {
  constructor(height, width) {
    let tileWidth = 15 - 2;
    let tileHeight = 13 - 2;
    let grid = [];
    for (let i = 0; i < tileHeight; i++) {
      grid[i] = [];
    }

    // False indicates there is no boundary
    // True indicates there is a boundary
    for (let i = 0; i < tileHeight; i++) {
      if (i % 2 !== 0 && i !== 0) {
        for (let j = 1; j < tileWidth; j++) {
          if (j % 2 === 0) {
            grid[i][j] = true;
          } else {
            grid[i][j] = false;
          }
        }
      } else {
        for (let j = 1; j < tileWidth; j++) {
          grid[i][j] = false;
        }
      }
    }

    console.log(grid);


    this.height = height;
    this.width = width;

    let tile = new Tile();

    this.boundaryHeightTop = tile.height;
    this.boundaryHeightBottom = height - tile.height;
    this.boundaryWidthLeft = tile.width;
    this.boundaryWidthRight = width - tile.width;
  }

  inbounds(x, y) {
    return x > this.boundaryWidthLeft && x < this.boundaryWidthRight && y > this.boundaryHeightTop && y < this.boundaryHeightBottom;
  }
}

module.exports = Map;
