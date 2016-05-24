const Tile = require('./tile');

class Map {
  constructor(height, width) {
    this.grid = this.createGrid();

    this.height = height;
    this.width = width;

    let tile = new Tile();

    this.boundaryHeightTop = tile.height;
    this.boundaryHeightBottom = height - tile.height;
    this.boundaryWidthLeft = tile.width;
    this.boundaryWidthRight = width - tile.width;
  }

  inbounds(x, y) {
    return x <= this.grid.length && y <= this.grid[0].length && x > 0 && y > 0;
  }

  tile(x, y) {
    if (!this.inbounds(x, y)) {
      return new Tile(-1, -1, true);
    }
    return this.grid[x][y];
  }

  draw(context) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        this.grid[i][j].draw(context);
      }
    }
  }

  onload(context) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        this.grid[i][j].onload(context);
      }
    }
  }

  occupied(x, y) {
    if (!this.inbounds(x, y)) {
      return true;
    }
    return this.grid[x][y].occupied();
  }

  createGrid() {
    let tileWidth = 15;
    let tileHeight = 13;
    var grid = [];
    for (let i = 0; i < tileWidth; i++) {
      grid[i] = [];
    }
    // False indicates there is no boundary
    // True indicates there is a boundary
    for (let i = 0; i < tileWidth; i++) {
      if (i === 0 || i === 14) {
        for (let j = 0; j < tileHeight; j++) {
          grid[i][j] = new Tile(i, j, true);
        }
      } else if (i % 2 !== 0 && i !== 0) {
          for (let j = 0; j < tileHeight; j++) {
            if (j === 0 || j === 12) {
              grid[i][j] = new Tile(i, j, true);
            } else {
              grid[i][j] = new Tile(i, j, false);
            }
          }
      } else {
        for (let j = 0; j < tileHeight; j++) {
          if (j % 2 !== 0 && j !== 0) {
            let tile = new Tile(i, j, false);
            grid[i][j] = tile.createBlock();
          } else {
            grid[i][j] = new Tile(i, j, true);
          }
        }
      }
    }
    return grid;
  }
}

module.exports = Map;
