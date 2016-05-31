const GameEngine = require('./game_engine');
const People = require('./people');
const Controller = require('./controller');
const Graphic = require ('./graphic');
const Map = require('./map');
const WebSocketConnection = require('./ws');
const Lobby = require('./lobby');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const map = new Map(435, 512);
const graphic = new Graphic ([], context);
const people = new People(
  [
    { id: 1,
      x: 1,
      y: 1,
      path: "/player-down-",
      context: context,
      direction: "down"
    },
    { id: 2,
      x: 13,
      y: 11,
      path: "/player-black-up-",
      context: context,
      direction: "up"
    },
    { id: 3,
      x: 13,
      y: 1,
      path: "/player-blue-down-",
      context: context,
      direction: "down"
    },
    { id: 4,
      x: 1,
      y: 11,
      path: "/player-red-up-",
      context: context,
      direction: "up"
    }
  ]
);
const ws = new WebSocketConnection();
const gameEngine = new GameEngine(people, map, graphic);
const controllerOne = new Controller({
  id: 1,
  commands: {
    '38': 'up',
    '39': 'right',
    '40': 'down',
    '37': 'left',
    '32': 'bomb'
  },
  gameEngine: gameEngine,
  webSocket: ws
});
const controllerTwo = new Controller({
  id: 2,
  commands: {
    '87': 'up',
    '68': 'right',
    '83': 'down',
    '65': 'left',
    '67': 'bomb'
  },
  gameEngine: gameEngine,
  webSocket: ws,
  webSwitch: true
});
const lobby = new Lobby(ws, gameEngine, controllerOne, controllerTwo);
lobby.selectRoom();

const newGame = (e) => {
  e.preventDefault();
  location.reload();
}

const newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', function(e) {
  newGame(e);
}, false);
