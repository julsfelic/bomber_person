class GameEngine {
  constructor(person, map) {
    this.person = person;
    this.map = map;
  }

  move(x, y) {
    if (this.map.occupied(x, y)) {
      return;
    } else {
      this.person.move(x, y);
    }
  }
}

module.exports = GameEngine;
