const expect = require('chai').expect;

const Controller = require('../lib/controller');
const GameEngine = require('../lib/game_engine');

describe('Controller', function() {

  it('can be instantiated', function() {
    let gameEngineStub = {};
    let ws = {};
    let commands = {
      '38': 'up',
      '39': 'right',
      '40': 'down',
      '37': 'left',
      '32': 'bomb'
    };
    let controller = new Controller({
      id: 1,
      commands: commands,
      gameEngine: gameEngineStub,
      webSocket: ws
    });

    expect(controller.keyStrokes).to.eq(commands);
    expect(controller.directions['up']).to.eq('38');
    expect(controller.map['38']).to.eq(false);
    expect(controller.webSocket).to.eq(ws);
    expect(controller.webSwitch).to.eq(undefined);
    expect(controller.gameEngine).to.eq(gameEngineStub);
  });
});
