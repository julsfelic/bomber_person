const Tile = require('./tile');

class Map {
  constructor(height, width) {
    let tileWidth = 15 - 2;
    let tileHeight = 13 - 2;
    this.grid = this.createGrid(tileHeight, tileWidth);

    console.log(this.grid);


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

  occupied(x, y) {
    if ( x >= this.grid.length || y >= this.grid[0].length ) {
      return true;
    }
    return this.grid[x][y].occupied;
  }

  createGrid(tileHeight, tileWidth) {
    var grid = [];
    for (let i = 0; i < tileWidth; i++) {
      grid[i] = [];
    }
    // False indicates there is no boundary
    // True indicates there is a boundary
    for (let i = 0; i < tileWidth; i++) {
      if (i % 2 !== 0 && i !== 0) {
        for (let j = 0; j < tileHeight; j++) {
          if (j % 2 !== 0 && j !== 0) {
            grid[i][j] = new Tile(i, j, true);
          } else {
            grid[i][j] = new Tile(i, j, false);
          }
        }
      } else {
        for (let j = 0; j < tileHeight; j++) {
          grid[i][j] = new Tile(i, j, false);
        }
      }
    }
    return grid;
  }
}

module.exports = Map;
