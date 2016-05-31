const expect = require('chai').expect;
const sinon = require('sinon');

const Map = require('../lib/map');
const Block = require('../lib/block');

describe('Map', function() {

  it('has a height', function() {
    let map = new Map(300, 500);

    expect(map.height).to.eq(300);
  });

  it('has a width', function() {
    let map = new Map(300, 500);

    expect(map.width).to.eq(500);
  });

  it('has an upper boundary', function() {
    let map = new Map(300, 500);

    expect(map.boundaryHeightTop).to.eq(34);
  });

  it('has a lower boundary', function() {
    let map = new Map(300, 500);

    expect(map.boundaryHeightBottom).to.eq(266);
  });

  it('is inbound', function() {
    let map = new Map(300, 500);

    expect(map.inbounds(1, 1)).to.eq(true);
  });

  it('is not inbound', function() {
    let map = new Map(300, 500);

    expect(map.inbounds(-1, 2)).to.eq(false);
  });

  it('is occupied', function() {
    let map = new Map(300, 500);

    expect(map.occupied(2, 2)).to.eq(true);
  });

  it('is not occupied', function() {
    let map = new Map(300, 500);

    expect(map.occupied(1, 1)).to.eq(false);
  });

  it('is occupied when not exist', function() {
    let map = new Map(300, 500);

    expect(map.occupied(1000, 1000)).to.eq(true);
  });

  context('#createGrid()', function() {
    it('creates an array that has tiles', function() {
      let map = new Map(300, 500);

      expect(map.grid.length).to.eq(15);
      expect(map.grid[0].length).to.eq(13);
      expect(map.grid[0][0].occupied()).to.eq(true);
      expect(map.grid[1][1].occupied()).to.eq(false);
    });
  });
});
