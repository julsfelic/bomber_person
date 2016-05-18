class Tile {
  constructor(x, y, occupied = false) {
    this.x = x;
    this.y = y;
    this.height = 34;
    this.width = 34;
    this.xCoor = x * this.width + this.width / 2;
    this.yCoor = y * this.height + this.height / 2;
    this.occupied = occupied;
  }

  occupy() {
    this.occupied = true;
  }
}

module.exports = Tile;
