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
});
