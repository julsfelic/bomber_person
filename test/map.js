const expect = require('chai').expect;
const Map = require('../lib/map');

describe('Map', function() {
  let map = new Map(300, 500);

  it('has a height', function() {
    expect(map.height).to.eq(300);
  });

  it('has a width', function() {
    expect(map.width).to.eq(500);
  });

  it('has an upper boundary', function() {
    expect(map.boundaryHeightTop).to.eq(34);
  });

  it('has a lower boundary', function() {
    expect(map.boundaryHeightBottom).to.eq(266);
  });

  it('is inbound', function() {
    expect(map.inbounds(150, 250)).to.eq(true);
  });

  it('is not inbound', function() {
    expect(map.inbounds(300, 500)).to.eq(false);
  });

  it('is occupied', function() {
    expect(map.occupied(1, 1)).to.eq(true);
  });

  it('is not occupied', function() {
    expect(map.occupied(0, 0)).to.eq(false);
  });

  it('is occupied when not exist', function() {
    expect(map.occupied(1000, 1000)).to.eq(true);
  });
});
