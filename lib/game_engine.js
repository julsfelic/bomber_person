class GameEngine {
  constructor(people, map, graphic) {
    this.people = people;
    this.map = map;
    this.graphic = graphic;
    this.graphic.drawables = [this.map, this.people];
  }

  move(id, x, y, direction) {
    if (this.zeroHealth(id)) {
      return;
    }
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
    if (this.zeroHealth(id)) {
      return;
    }
    let person = this.people.get(id);
    let x = person.x;
    let y = person.y;
    if (this.map.occupied(x, y)) {
      return;
    } else {
      this.map.tile(x, y).createBomb();
    }
    setTimeout(function () {
      this.map.tile(x, y).destroyBomb();
      this.explosion(person.id, x, y);
    }.bind(this), 2000);
  }

  explosion(id, x, y) {
    let person = this.people.get(id);
    this.map.tile(x, y).createExplosion();
    for (let i = 0; i < person.bombSize; i++) {
      this.map.tile(x+i, y).createExplosion();
      this.map.tile(x-i, y).createExplosion();
      this.map.tile(x-i, y).createExplosion();
      this.map.tile(x, y+i).createExplosion();
      this.map.tile(x, y-i).createExplosion();
    }
    setTimeout(function () {
      this.map.tile(x, y).destroyExplosion();
      for (let i = 0; i < person.bombSize; i++) {
        this.map.tile(x+i, y).destroyExplosion();
        this.map.tile(x-i, y).destroyExplosion();
        this.map.tile(x-i, y).destroyExplosion();
        this.map.tile(x, y+i).destroyExplosion();
        this.map.tile(x, y-i).destroyExplosion();
      }
    }.bind(this), 1000);
  }

  peopleStatus() {
    let people = this.people.all();
    for (let i = 0; i < people.length; i++) {
      let person = people[i];
      let tile = this.map.tile(person.x, person.y);
      if (tile.contains['explosion']) {
        person.health = person.health - 1;
      }
    }
    setTimeout(this.peopleStatus.bind(this), 1000/12);
  }

  zeroHealth(id) {
    let person = this.people.get(id);
    return person.health < 1;
  }

  start() {
    this.peopleStatus();
    this.graphic.draw();
  }
}

module.exports = GameEngine;
