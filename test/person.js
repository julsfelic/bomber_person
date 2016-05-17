const expect = require('chai').expect;
const Person = require('../lib/person');
const Map = require('../lib/map');

describe('Person', function() {


  it('has a location', function() {
    let map = new Map(300, 500);
    let person = new Person([0, 0], map);
    expect(person.x).to.eq(0);
    expect(person.y).to.eq(0);
  });

  it('can move', function () {
    let map = new Map(300, 500);
    let person = new Person([0, 0], map);
    person.move(1, 0);
    expect(person.x).to.eq(1);
    expect(person.y).to.eq(0);
  });

});
