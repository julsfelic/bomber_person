const generateGif = require('./generate_gif');

class Person {
  constructor(options) {
    this.id = options.id;
    this.x = options.x;
    this.y = options.y;
    this.width = 34;
    this.height = 34;
    this.bombSize = 3;
    this.health = 1;
    this.path = options.path;
    generateGif.call(this, { frames: 3, refresh: 200 });
  }

  move(rightLeft, northSouth) {
    this.x = this.x + rightLeft;
    this.y = this.y + northSouth;
  }

  onload(context) {
    this.gif.onload = function () {
      this.draw(context);
    }.bind(this);
  }

  draw(context) {
    if (this.health >= 1) {
      context.drawImage(this.gif, (this.x * this.height + 6), (this.y * this.width - 14));
    } else {

    }
  }
}

module.exports = Person;
