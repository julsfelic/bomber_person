const Block = require('./block');

class GameEngine {
  constructor(people, map, context, graphic) {
    this.people = people;
    this.map = map;
    this.context = context;
    this.graphic = graphic;
    this.drawables = [this.map, this.people];
  }

  move(id, x, y) {
    let person = this.people.get(id);
    let xCoor = x + person.x;
    let yCoor = y + person.y;
    if (this.map.occupied(xCoor, yCoor)) {
      return;
    } else {
      person.move(x, y);
    }
  }

  placeBlocks() {
    let tile = this.map.grid[1][6];
    let block = new Block(tile, this.context);
    tile.occupyWith('block', block);

    requestAnimationFrame(function makeblocks() {
      block.draw();
    }.bind(this));
  }

  start() {
    // this.placeBlocks();
    this.graphic.draw();
  }
}

module.exports = GameEngine;
