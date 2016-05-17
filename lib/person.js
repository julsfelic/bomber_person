class Person {
  constructor(location, map) {
    this.x = location[0];
    this.y = location[1];
    this.map = map;
  }

  move(rightLeft, northSouth) {
    this.x = this.x + rightLeft;
    this.y = this.y + northSouth;
  }
}

module.exports = Person;
