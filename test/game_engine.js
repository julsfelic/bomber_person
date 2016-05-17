const expect = require('chai').expect;
const GameEngine = require('../lib/game_engine');
const Person = require('../lib/person');
const Map = require('../lib/map');

describe('GameEngine', function() {
  it('is instantiated', function() {
    let person = new Person(0, 0);
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(person, map);

    expect(gameEngine.map.width).to.eq(500);
    expect(gameEngine.person.x).to.eq(0);
  });

  it('can move player forward', function() {
    let person = new Person(0, 0);
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(person, map);

    gameEngine.move(1,0);

    expect(gameEngine.person.x).to.eq(1);
  });

  it('cannot move player into a pillar', function() {
    let person = new Person(0, 0);
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(person, map);

    gameEngine.move(1,1);

    expect(gameEngine.person.x).to.eq(0);
    expect(gameEngine.person.y).to.eq(0);
  });
});
