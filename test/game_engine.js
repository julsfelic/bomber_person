const expect = require('chai').expect;
const GameEngine = require('../lib/game_engine');
const Person = require('../lib/person');
const Map = require('../lib/map');

describe('GameEngine', function() {
  it('is instantiated', function() {
    let playerOne = new Person(1, 0, 0);
    let playerTwo = new Person(2, 12, 10);
    let people = {1: playerOne, 2: playerTwo};
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(people, map);

    expect(gameEngine.map.width).to.eq(500);
    expect(gameEngine.people[1].x).to.eq(0);
  });

  it('can move player forward', function() {
    let playerOne = new Person(1, 0, 0);
    let playerTwo = new Person(2, 12, 10);
    let people = {1: playerOne, 2: playerTwo};
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(people, map);

    gameEngine.move(1, 1, 0);

    expect(gameEngine.people[1].x).to.eq(1);
  });

  it('cannot move player into a pillar', function() {
    let playerOne = new Person(1, 0, 0);
    let playerTwo = new Person(2, 12, 10);
    let people = {1: playerOne, 2: playerTwo};
    let map = new Map(300, 500);
    let gameEngine = new GameEngine(people, map);

    gameEngine.move(1, 1, 1);

    expect(gameEngine.people[1].x).to.eq(0);
    console.log(gameEngine.people[1]);
    expect(gameEngine.people[1].y).to.eq(0);
  });
});
