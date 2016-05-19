class Tile {
  constructor(x, y, pillar = false) {
    this.x = x;
    this.y = y;
    this.height = 34;
    this.width = 34;
    this.xCoor = x * this.width + this.width / 2;
    this.yCoor = y * this.height + this.height / 2;
    this.contains = {
      pillar: pillar,
      block: false,
      person: false,
      bomb: false,
      explosion: false
    };
    this.occupant = {
      block: null,
      person: null,
      bomb: null,
      explosion: null
    };
  }

  occupied() {
    return this.contains['pillar'] || this.contains['block'] || this.contains['bomb'];
  }

  occupyWith(key, value) {
    this.occupant[key] = value;
    this.contains[key] = true;
  }

  unoccupy(key) {
    this.occupant[key] = null;
    this.contains[key] = false;
  }

}

module.exports = Tile;
