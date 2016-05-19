class Person {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = 34;
    this.height = 34;
    this.context = options.context;
    this.image = options.image || createImage(this.id);
    this.image.onload = function () {
      this.draw();
    }.bind(this);
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
    this.context.drawImage(this.image, (this.x * this.height + 6), (this.y * this.width - 14));
  }
}

function createImage(id) {
  let image = new Image();
  image.src = `../assets/player${id}.png`;
  return image;
}

module.exports = Person;
