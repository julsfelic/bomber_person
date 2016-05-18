class Person {
  constructor(id, x, y, context) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 34;
    this.height = 34;
    this.context = context;

    let image = new Image();
    image.src = `../assets/player${this.id}.png`;

    this.image = image;
  }

  move(rightLeft, northSouth) {
    this.clear();
    this.x = this.x + rightLeft;
    this.y = this.y + northSouth;
    this.draw();
  }

  clear() {
    this.context.clearRect((this.x * this.height), (this.y * this.width - 14), this.width, this.height);
  }

  draw() {
    // this.context.fillRect((this.x * this.height), (this.y * this.width - 4), this.width, this.height);
    this.context.drawImage(this.image, (this.x * this.height + 6), (this.y * this.width - 14));
  }
}

module.exports = Person;
