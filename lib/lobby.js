class Lobby {
  constructor(webSocket, gameEngine, localController, webController) {
    this.webSocket = webSocket;
    this.gameEngine = gameEngine;
    this.localController = localController;
    this.webController = webController;
  }

  selectRoom() {
    let onPress = function (e) {
      let path = e.currentTarget.id.split("-")[1];
      this.webSocket.setWebSocket(path);
      this.gameEngine.start();
      this.localController.bindEvents();
      this.webController.bindEvents();
      this.hideLobby();
    };

    for (let i = 1; i < 10; i++){
      let path = 'room-' + i;
      let roomButton = document.getElementById(path);
      roomButton.addEventListener('click', onPress.bind(this));
    }
  }

  hideLobby() {
    let lobby = document.getElementById('lobby');
    let window = document.getElementById('game-window');
    window.style.display = "inline";
    lobby.style.display = "none";
    this.webSocket.choosePlayer(4);
  }
}

module.exports = Lobby;
