class Person {
  constructor(location) {
    this.x = location[0];
    this.y = location[1];
  }

  move(rightLeft, northSouth) {
    this.x = this.x + rightLeft;
    this.y = this.y + northSouth;
  }
}

module.exports = Person;
