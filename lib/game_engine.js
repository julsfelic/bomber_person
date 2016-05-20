class GameEngine {
  constructor(people, map, graphic) {
    this.people = people;
    this.map = map;
    this.graphic = graphic;
    this.graphic.drawables = [this.map, this.people];
  }

  move(id, x, y, direction) {
    let person = this.people.get(id);
    person.path = `/player-${direction}-`;
    let xCoor = x + person.x;
    let yCoor = y + person.y;
    if (this.map.occupied(xCoor, yCoor)) {
      return;
    } else {
      person.move(x, y);
    }
  }

  dropBomb(id) {
    let person = this.people.get(id);
    let x = person.x;
    let y = person.y;
    if (this.map.occupied(x, y)) {
      return;
    } else {
      this.map.grid[x][y].createBomb();
    }
    setTimeout(function () {
      this.map.grid[x][y].destroyBomb();
      this.explosion(x, y);
    }.bind(this), 2000);
  }

  explosion(id, x, y) {
    let person = this.people.get(id);
    this.map.grid[x][y].createExplosion(x, y);
    for (let i = 0; i < person.bombSize; i++) {
      this.map.grid[x+i][y].createExplosion();
      this.map.grid[x-i][y].createExplosion();
      this.map.grid[x][y+i].createExplosion();
      this.map.grid[x][y-i].createExplosion();
    }
    setTimeout(function () {
      this.map.grid[x][y].destroyExplosion(x, y);
      for (let i = 0; i < person.bombSize; i++) {
        this.map.grid[x+i][y].destroyExplosion();
        this.map.grid[x-i][y].destroyExplosion();
        this.map.grid[x][y+i].destroyExplosion();
        this.map.grid[x][y-i].destroyExplosion();
      }
    }.bind(this), 1000);
  }

  start() {
    this.graphic.draw();
  }
}

module.exports = GameEngine;
