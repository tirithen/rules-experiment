const RulePart = require('./RulePart');

class Effect extends RulePart {
  constructor() {
    super();
    this.type = 'effect';
  }
}

module.exports = Effect;
