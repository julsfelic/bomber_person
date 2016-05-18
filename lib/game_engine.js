class GameEngine {
  constructor(people, map) {
    this.people = people;
    this.map = map;
  }

  move(id, x, y) {
    let person = this.people[id];
    let xCoor = x + person.x;
    let yCoor = y + person.y;
    if (this.map.occupied(xCoor, yCoor)) {
      return;
    } else {
      person.move(x, y);
    }
  }

  start() {
    requestAnimationFrame(function gameLoop() {
      // that.context.fillRect(40, 40, 100, 100)
      for (var person in this.people) {
        this.people[person].draw();
      }

      requestAnimationFrame(gameLoop.bind(this));
    }.bind(this));
  }
}

module.exports = GameEngine;
