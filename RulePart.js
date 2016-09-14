const uuid = require('uuid').v4;
const populate = require('./populate');

class RulePart extends Map {
  constructor(template, parameters = new Map()) {
    super([...parameters]);

    this.template = template;

    if (!this.get('id')) {
      this.set('id', uuid());
    }
  }

  toString() {
    return populate(this.template, this);
  }
}

module.exports = RulePart;
