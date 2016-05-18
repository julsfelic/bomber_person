const expect = require('chai').expect;
const sinon = require('sinon');

const Person = require('../lib/person');

describe('Person', function() {
  var person = new Person({ id: 1, x: 0, y: 0, image: 'test.png' });

  it('can initialize', function() {
    expect(person.x).to.eq(0);
    expect(person.y).to.eq(0);
    expect(person.id).to.eq(1);
  });

  it('can move', function () {
    var context = { clearRect: function() {}, drawImage: function() {} };
    var mock = sinon.mock(context);
    mock.expects('clearRect').once().returns(true);
    mock.expects('drawImage').once().returns(true);
    let person = new Person({
      id: 1,
      x: 0,
      y: 0,
      image: 'test.png',
      context: context
    });

    person.move(1, 0);

    expect(person.x).to.eq(1);
    expect(person.y).to.eq(0);
  });
});
