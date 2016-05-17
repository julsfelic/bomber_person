const expect = require('chai').expect;
const Tile = require('../lib/tile.js');

describe('Tile', function() {
  it('has a default height', function() {
    let tile = new Tile();

    expect(tile.height).to.eq(34);
  });

  it('has a default width', function() {
    let tile = new Tile();

    expect(tile.width).to.eq(34);
  });

  it('has coordinates', function() {
    let tile = new Tile(1, 4);
    expect(tile.xCoor).to.eq(17 + 1*34);
    expect(tile.yCoor).to.eq(17 + 4*34);
  });
});
