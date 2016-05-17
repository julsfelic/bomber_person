const expect = require('chai').expect
const Controller = require('../lib/controller');
const Person = require('../lib/person');
const Map = require('../lib/map');
const GameEngine = require('../lib/game_engine');

describe('Controller', function() {
  it('can be instantiated', function() {
    let person = new Person(0,0);
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(person, map);
    let controller = new Controller(1, {
      'up': 38,
      'right': 39,
      'down': 40,
      'left': 37,
      'bomb': 77
    }, gameEngine);

    expect(controller.id).to.eq(1);
    expect(controller.keyStrokes.down).to.eq(40);
    expect(controller.keyLog['up']).to.eq(false);
    expect(controller.gameEngine.person.x).to.eq(0);
    expect(controller.gameEngine.map.width).to.eq(500);
  });
});
