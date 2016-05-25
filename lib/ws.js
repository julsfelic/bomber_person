class WebSocketConnection {

  constructor() {
    this.id = null;
  }

  setWebSocket(path) {
    this.ws = new WebSocket("ws://" + "localhost:9000" + "/socket/" + path);
    this.ws.onerror = function(event) {
      console.debug(event);
    };
  }

  choosePlayer(num) {
    let that = this;
    let players = function() {
      that.id = this.id.split('-')[1];
      that.sendCommands({
        id: that.id,
        type: "player"
      });
    };
    for (var i = 0; i < num; i++) {
      document.getElementById('player-' + (i + 1)).addEventListener('click', players);
    }
  }

  sendCommands(commands) {
    this.ws.send(JSON.stringify(commands));
  }

  receiveCommands(callback) {
    let commands = {};
    this.ws.onmessage = function(event) {
      commands = JSON.parse(event.data);
      if (commands.type === "player") {
        document.getElementById('player-' + commands.id).style.display = "none";
      } else {
        callback(commands);
      }
    };
  }
}

module.exports = WebSocketConnection;
