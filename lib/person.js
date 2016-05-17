class Person {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(rightLeft, northSouth) {
    this.x = this.x + rightLeft;
    this.y = this.y + northSouth;
  }
}

module.exports = Person;
