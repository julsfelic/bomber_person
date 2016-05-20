const expect = require('chai').expect;


const Controller = require('../lib/controller');
const People = require('../lib/people');
const Map = require('../lib/map');
const GameEngine = require('../lib/game_engine');
const Graphic = require('../lib/graphic');

describe('Controller', function() {
  it('can be instantiated', function() {
    let people = new People([{id: 1, x: 1, y: 1, context: context}, {id: 2, x: 13, y: 11, context: context}]);
    let map = new Map(300, 500);
    let graphic = new Graphic({}, []);
    let gameEngine = new GameEngine(people, map, graphic);
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
