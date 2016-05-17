const expect = require('chai').expect;
const Person = require('../lib/person');

describe('Person', function() {


  it('has a location', function() {
    let person = new Person(0, 0);
    expect(person.x).to.eq(0);
    expect(person.y).to.eq(0);
  });

  it('can move', function () {
    let person = new Person(0, 0);
    person.move(1, 0);
    expect(person.x).to.eq(1);
    expect(person.y).to.eq(0);
  });

});
