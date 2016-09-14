const RulePart = require('./RulePart');

class Effect extends RulePart {
  constructor(parameters) {
    super(parameters);
    this.type = 'effect';
  }
}

module.exports = Effect;
