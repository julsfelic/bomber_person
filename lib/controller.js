class Controller {
  constructor(id, commands, gameEngine) {
    this.id = id;
    this.keyStrokes = commands;
    this.directions = {};
    this.map = {};
    let keys = Object.keys(this.keyStrokes);
    for (let i = 0; i < keys.length; i++) {
      let value = this.keyStrokes[keys[i]];
      this.directions[value] = keys[i];
      this.map[keys[i]] = false;
    }
    this.gameEngine = gameEngine;
  }

  bindEvents() {
    document.addEventListener('keydown', function(e) {
      this.map[e.keyCode] = true;
      e.preventDefault();
    }.bind(this));

    document.addEventListener('keyup', function(e) {
      this.map[e.keyCode] = false;
    }.bind(this));
    this.loop();
  }

  loop () {
    if (this.map[this.directions["up"]] === true) {
      this.gameEngine.move(this.id, 0, -1);
    }
    if (this.map[this.directions["down"]] === true) {
      this.gameEngine.move(this.id, 0, 1);
    }
    if (this.map[this.directions["right"]] === true) {
      this.gameEngine.move(this.id, 1, 0);
    }
    if (this.map[this.directions["left"]] === true) {
      this.gameEngine.move(this.id, -1, 0);
    }
    if (this.map[this.directions["bomb"]] === true) {
      console.log("Boom!");
    }
    setTimeout(this.loop.bind(this), 1000/12);
  }
}

module.exports = Controller;
