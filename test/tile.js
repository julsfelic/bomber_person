const expect = require('chai').expect;
const Tile = require('../lib/tile.js');

describe('Tile', function() {
  it('has x and y coordinates', function() {
    let tile = new Tile(1, 1);

    expect(tile.x).to.eq(1);
    expect(tile.y).to.eq(1);
  });

  it('has height and width', function() {
    let tile = new Tile();

    expect(tile.height).to.eq(34);
    expect(tile.width).to.eq(34);
  });

  it('has xCoor and yCoor', function() {
    let tile = new Tile(1, 4);

    expect(tile.xCoor).to.eq(17 + (1 * 34));
    expect(tile.yCoor).to.eq(17 + (4 * 34));
  });

  it('has a default occupied of false', function() {
    let tile = new Tile();

    expect(tile.occupied()).to.eq(false);
  });
});
