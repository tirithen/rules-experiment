const RulePart = require('./RulePart');

class Target extends RulePart {
  constructor(parameters) {
    super(parameters);
    this.type = 'target';
  }
}

module.exports = Target;
