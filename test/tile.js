const expect = require('chai').expect;
const sinon = require('sinon');

const Tile = require('../lib/tile');
const Bomb = require('../lib/bomb')
const Explosion = require('../lib/explosion');

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

  it('has a default contains object', function() {
    let tile = new Tile();
    let expected = {
      pillar: false,
      block: false,
      people: false,
      bomb: false,
      explosion: false
    };

    expect(tile.contains).to.deep.equal(expected);
  });

  it('can take a pillar boolean on initialize', function() {
    let tile = new Tile(1, 1, true);
    let expected = {
      pillar: true,
      block: false,
      people: false,
      bomb: false,
      explosion: false
    };

    expect(tile.contains).to.deep.equal(expected);
  });

  it('has a default occupant object', function() {
    let tile = new Tile();
    let expected = {
      block: null,
      people: null,
      bomb: null,
      explosion: null
    };

    expect(tile.occupant).to.deep.equal(expected);
  });

  it('has a default occupied of false', function() {
    let tile = new Tile();

    expect(tile.occupied()).to.eq(false);
  });

  it('returns true if occupied', function() {
    let tile = new Tile();
    tile.contains.bomb = true;

    expect(tile.occupied()).to.eq(true);
  });

  it('can occupy a tile', function() {
    let tile = new Tile();

    expect(tile.occupied()).to.eq(false);

    tile.occupyWith('bomb', {});

    expect(tile.occupied()).to.eq(true);
  });

  it('can unoccupy a tile', function() {
    let tile = new Tile();

    tile.occupyWith('bomb', {});
    tile.unoccupy('bomb');

    expect(tile.occupied()).to.eq(false);
  });

  it('can create a block', function() {
    let tile = new Tile();

    let returnObj = tile.createBlock();

    expect(tile.occupied()).to.eq(true);
    expect(tile.contains.block).to.eq(true);
    expect(returnObj).to.be.an.instanceof(Tile);
  });

  it('can create a bomb', function() {
    sinon.stub(Bomb.prototype, 'createImage').returns({ src: '../assets/block.png'});
    let tile = new Tile();

    let returnObj = tile.createBomb();

    expect(tile.occupied()).to.eq(true);
    expect(tile.contains.bomb).to.eq(true);
    expect(returnObj).to.be.an.instanceof(Tile);
  });

  it('can destroy a bomb', function() {
    let tile = new Tile();

    tile.createBomb();
    let returnObj = tile.destroyBomb();

    expect(tile.occupied()).to.eq(false);
    expect(tile.contains.bomb).to.eq(false);
    expect(returnObj).to.be.an.instanceof(Tile);
  });

  it('can create an explosion', function() {
    sinon.stub(Explosion.prototype, 'createImage').returns({ src: '../assets/block.png'});
    let tile = new Tile();

    let returnObj = tile.createExplosion();

    expect(tile.occupied()).to.eq(false);
    expect(tile.contains.explosion).to.eq(true);
    expect(returnObj).to.be.an.instanceof(Tile);
  });

  it('can destroy an explosion', function() {
    let tile = new Tile();

    tile.createExplosion();
    let returnObj = tile.destroyExplosion();

    expect(tile.occupied()).to.eq(false);
    expect(tile.contains.explosion).to.eq(false);
    expect(returnObj).to.be.an.instanceof(Tile);
  });

});
