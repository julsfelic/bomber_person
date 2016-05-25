class Controller {
  constructor(id, commands, gameEngine, webSocket, webSwitch) {
    this.keyStrokes = commands;
    this.directions = {};
    this.map = {};
    this.webSocket = webSocket;
    this.webSwitch = webSwitch;
    let keys = Object.keys(this.keyStrokes);
    for (let i = 0; i < keys.length; i++) {
      let value = this.keyStrokes[keys[i]];
      this.directions[value] = keys[i];
      this.map[keys[i]] = false;
    }
    this.gameEngine = gameEngine;
  }

  bindEvents() {
    if (this.webSwitch === true) {
      this.webSocket.receiveCommands(function (e) {
        if (e.id !== this.webSocket.id) {
          if (e.type === "move") {
            this.gameEngine.move(e.id, e.x, e.y, e.direction);
          } else if (e.type === "bomb") {
            this.gameEngine.dropBomb(e.id);
          }
        }
      }.bind(this));
      return;
    }
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
      this.gameEngine.move(this.webSocket.id, 0, -1, 'up');
      this.webSocket.sendCommands({
        id: this.webSocket.id,
        x: 0,
        y: -1,
        direction: 'up',
        type: 'move'
      });
    }
    if (this.map[this.directions["down"]] === true) {
      this.gameEngine.move(this.webSocket.id, 0, 1, 'down');
      this.webSocket.sendCommands({
        id: this.webSocket.id,
        x: 0,
        y: 1,
        direction: 'down',
        type: 'move'
      });
    }
    if (this.map[this.directions["right"]] === true) {
      this.gameEngine.move(this.webSocket.id, 1, 0, 'right');
      this.webSocket.sendCommands({
        id: this.webSocket.id,
        x: 1,
        y: 0,
        direction: 'right',
        type: 'move'
      });
    }
    if (this.map[this.directions["left"]] === true) {
      this.gameEngine.move(this.webSocket.id, -1, 0, 'left');
      this.webSocket.sendCommands({
        id: this.webSocket.id,
        x: -1,
        y: 0,
        direction: 'left',
        type: 'move'
      });
    }
    if (this.map[this.directions["bomb"]] === true) {
      this.gameEngine.dropBomb(this.webSocket.id);
      this.webSocket.sendCommands({
        id: this.webSocket.id,
        type: 'bomb'
      });
    }
    setTimeout(this.loop.bind(this), 1000/12);
  }
}

module.exports = Controller;
