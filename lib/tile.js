const Block = require('./block');
const Bomb = require('./bomb');
const Explosion = require('./explosion');

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

  createBlock() {
    let block = new Block(this);
    this.occupyWith('block', block);
    return this;
  }

  createBomb() {
    let bomb = new Bomb(this);
    this.occupyWith('bomb', bomb);
    return this;
  }

  destroyBomb() {
    this.unoccupy('bomb');
    return this;
  }

  createExplosion() {
    let explosion = new Explosion(this);
    this.occupyWith('explosion', explosion);
    return this;
  }

  destroyExplosion() {
    this.unoccupy('explosion');
    return this;
  }

  draw(context) {
    let keys = Object.keys(this.occupant);
    for (let i = 0; i < keys.length; i++) {
      let value = this.occupant[keys[i]];
      if (value !== null) {
        value.draw(context);
      }
    }
  }

  onload(context) {
    let keys = Object.keys(this.occupant);
    for (let i = 0; i < keys.length; i++) {
      let value = this.occupant[keys[i]];
      if (value !== null) {
        value.onload(context);
      }
    }
  }


  // placeBlocks() {
  //   let tile = this.map.grid[1][6];
  //   let block = new Block(tile, this.context);
  //   tile.occupyWith('block', block);
  //
  //   requestAnimationFrame(function makeblocks() {
  //     block.draw();
  //   }.bind(this));
  // }

}
module.exports = Tile;
