class Controller {
  constructor(id, commands, gameEngine) {
    this.id = id;
    this.keyStrokes = commands;
    this.keyLog = {};
    let keys = Object.keys(this.keyStrokes);
    for (let i = 0; i < keys.length; i++) {
      let value = this.keyStrokes[keys[i]];
      this.keyLog[value] = false;
    }

    this.gameEngine = gameEngine;

  }

  bindEvents() {
    let canvas = document.getElementById('game');
    document.addEventListener('keydown', function(e) {
      let keyCode = e.keyCode;
      if (this.keyStrokes[keyCode] === "up") {
        e.preventDefault();
        this.gameEngine.move(this.id, 0, -1);
        console.log(this.gameEngine.people[1].x)
        console.log(this.gameEngine.people[1].y)
      } else if (this.keyStrokes[keyCode] === "down") {
        e.preventDefault();
        this.gameEngine.move(this.id, 0, 1);
        console.log(this.gameEngine.people[1].x)
        console.log(this.gameEngine.people[1].y)
      } else if (this.keyStrokes[keyCode] === "right") {
        e.preventDefault();
        this.gameEngine.move(this.id, 1, 0);
        console.log(this.gameEngine.people[1].x)
        console.log(this.gameEngine.people[1].y)
      } else if (this.keyStrokes[keyCode] === "left") {
        e.preventDefault();
        this.gameEngine.move(this.id, -1, 0);
        console.log(this.gameEngine.people[1].x)
        console.log(this.gameEngine.people[1].y)
      }
    }.bind(this));

    // else if (this.keyStrokes[keyCode] === "bomb") {
    //
    // }

    canvas.addEventListener('keyup', function(e) {
      let keyCode = e.keyCode;

      this.keyLog[keyCode] = true;
      return this.keyLog;
    });
  }
}

module.exports = Controller;
