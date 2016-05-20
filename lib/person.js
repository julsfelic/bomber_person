class Person {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = 34;
    this.height = 34;
    this.bombSize = 2;
    this.image = options.image || createImage(this.id);
  }

  move(rightLeft, northSouth) {
    this.x = this.x + rightLeft;
    this.y = this.y + northSouth;
  }

  onload(context) {
    this.image.onload = function () {
      this.draw(context);
    }.bind(this);
  }

  draw(context) {
    context.drawImage(this.image, (this.x * this.height + 6), (this.y * this.width - 14));
  }
}

function createImage(id) {
  let image = new Image();
  image.src = `../assets/player${id}.png`;
  return image;
}

module.exports = Person;
