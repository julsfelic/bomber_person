class Controller {
  constructor(id, commands, gameEngine) {
    this.id = id;
    this.keyStrokes = commands;
    this.keyLog = {};
    let keys = Object.keys(this.keyStrokes);
    for (let i = 0; i < keys.length; i++) {
      this.keyLog[keys[i]] = false;
    }
    this.gameEngine = gameEngine;
  }

  start() {
    let canvas = document.getElementById('game');

    canvas.addEventListener('keydown', function(e) {
      let keyCode = e.keyCode;

      this.keyLog[keyCode] = true;
      return this.keyLog;
    });

    canvas.addEventListener('keyup', function(e) {
      let keyCode = e.keyCode;

      this.keyLog[keyCode] = true;
      return this.keyLog;
    });
  }
}

module.exports = Controller;
