const Block = require('./block');
const Bomb = require('./bomb');
const Explosion = require('./explosion');
const People = require ('./people');

class Tile {
  constructor(x, y, pillar = false) {
    this.x = x;
    this.y = y;
    this.height = 34;
    this.width = 34;
    this.xCoor = x * this.width + this.width / 2;
    this.yCoor = y * this.height + this.height / 2;
    this.contains = {
      pillar: pillar,
      block: false,
      people: false,
      bomb: false,
      explosion: false
    };
    this.occupant = {
      block: null,
      people: null,
      bomb: null,
      explosion: null
    };
  }

  occupied() {
    return this.contains['pillar'] || this.contains['block'] || this.contains['bomb'];
  }

  occupyWith(key, value) {
    this.occupant[key] = value;
    this.contains[key] = true;
  }

  unoccupy(key) {
    this.occupant[key] = null;
    this.contains[key] = false;
  }

  createBlock() {
    let block = new Block(this);
    this.occupyWith('block', block);
    return this;
  }

  createBomb() {
    let bomb = new Bomb(this);
    this.occupyWith('bomb', bomb);
    return this;
  }

  destroyBomb() {
    this.unoccupy('bomb');
    return this;
  }

  createExplosion() {
    let explosion = new Explosion(this);
    this.occupyWith('explosion', explosion);
    return this;
  }

  destroyExplosion() {
    this.unoccupy('explosion');
    this.unoccupy('block');
    // this.destroyPeople();
    return this;
  }

  // createPerson(person) {
  //   if (this.contains['people']) {
  //     this.occupant['people'].set(person);
  //   } else {
  //     this.contains['people'] = true;
  //     this.occupant['people'] = new People(person);
  //   }
  //   return this;
  // }
  //
  // destroyPerson(person) {
  //   if (this.contains['people']) {
  //     this.contains['people'] = false;
  //     this.occupant['people'].destroy(person.id);
  //   }
  // }
  //
  // destroyPeople() {
  //   if (this.contains['people']) {
  //     let people = this.occupant['people'].all();
  //     for (let i = 0; i < people.length; i++) {
  //       this.destroyPerson(people[i]);
  //       people[i].health = people[i].health - 1;
  //     }
  //   }
  // }

  draw(context) {
    let keys = Object.keys(this.occupant);
    for (let i = 0; i < keys.length; i++) {
      let value = this.occupant[keys[i]];
      if (value !== null) {
        value.draw(context);
      }
    }
  }

  onload(context) {
    let keys = Object.keys(this.occupant);
    for (let i = 0; i < keys.length; i++) {
      let value = this.occupant[keys[i]];
      if (value !== null) {
        value.onload(context);
      }
    }
  }

}
module.exports = Tile;
