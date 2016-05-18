const expect = require('chai').expect;
const sinon = require('sinon');

const GameEngine = require('../lib/game_engine');
const Person = require('../lib/person');
const Map = require('../lib/map');

describe('GameEngine', function() {
  var playerOne = new Person({ id: 1, x: 0, y: 0, image: 'test.png' });
  var playerTwo = new Person({ id: 2, x: 12, y: 10, image: 'test.png' });
  var map = new Map(300, 500);

  it('is instantiated', function() {
    let people = { 1: playerOne, 2: playerTwo };
    let gameEngine = new GameEngine(people, map);

    expect(gameEngine.map.width).to.eq(500);
    expect(gameEngine.people[1].x).to.eq(0);
  });

  it('can move player forward', function() {
    var context = { clearRect: function() {}, drawImage: function() {} };
    var mock = sinon.mock(context);
    mock.expects('clearRect').once().returns(true);
    mock.expects('drawImage').once().returns(true);
    let playerOne = new Person({ id: 1, x: 1, y: 1, image: 'test.png', context: context });
    let playerTwo = new Person({ id: 2, x: 12, y: 10, image: 'test.png', context: context });
    let people = { 1: playerOne, 2: playerTwo };
    let gameEngine = new GameEngine(people, map);

    gameEngine.move(1, 1, 0);

    expect(gameEngine.people[1].x).to.eq(2);
  });

  it('cannot move player into a pillar', function() {
    let people = { 1: playerOne, 2: playerTwo };
    let gameEngine = new GameEngine(people, map);

    gameEngine.move(1, 2, 2);

    expect(gameEngine.people[1].x).to.eq(0);
    expect(gameEngine.people[1].y).to.eq(0);
  });
});
