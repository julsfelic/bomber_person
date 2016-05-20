const Person = require('./person');

class People {
  constructor(optionsArray) {
    this.players = {};
    for (let i = 0; i < optionsArray.length; i++) {
      this.set(optionsArray[i]);
    }
  }

  all() {
    let keys = Object.keys(this.players);
    let values = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      values.push(this.players[key]);
    }
    return values;
  }

  draw(context) {
    let values = this.all();
    for (let i = 0; i < values.length; i++) {
      values[i].draw(context);
    }
  }

  onload(context) {
    let values = this.all();
    for (let i = 0; i < values.length; i++) {
      values[i].onload(context);
    }
  }

  get(id) {
    return this.players[id];
  }

  set(options) {
    this.players[options.id] = new Person(options);
  }
}

module.exports = People;
