const expect = require('chai').expect

const Controller = require('../lib/controller');
const Person = require('../lib/person');
const Map = require('../lib/map');
const GameEngine = require('../lib/game_engine');

describe('Controller', function() {
  it('can be instantiated', function() {
    let playerOne = new Person({id: 1, x: 0, y: 0, image: 'test.png'});
    let playerTwo = new Person({id: 2, x: 12, y: 10, image: 'test.png'});
    let people = { 1: playerOne, 2: playerTwo };
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(people, map);
    let controller = new Controller(1, {
      '38': 'up',
      '39': 'right',
      '40': 'down',
      '37': 'left',
      '77': 'bomb'
    }, gameEngine);

    expect(controller.id).to.eq(1);
    expect(controller.keyStrokes[40]).to.eq('down');
    expect(controller.gameEngine.people[1].x).to.eq(0);
    expect(controller.gameEngine.map.width).to.eq(500);
  });
});
