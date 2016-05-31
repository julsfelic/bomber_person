const expect = require('chai').expect;
const sinon = require('sinon');

const Block = require('../lib/block');

describe('Block', function() {

  it('has properties', function() {
    // mock tile object
    let tile = {
      x: 1,
      y: 1,
      height: 38,
      width: 38
    };

    // mock Image
    sinon.stub(Block.prototype, 'createImage').returns({ src: '../assets/block.png'});

    let block = new Block(tile);

    expect(block.x).to.eq(1);
    expect(block.y).to.eq(1);
    expect(block.height).to.eq(38);
    expect(block.width).to.eq(38);
    expect(block.xCoor).to.eq(57);
    expect(block.yCoor).to.eq(57);
    expect(block.image.src).to.eq('../assets/block.png');
  });

});
