const RulePart = require('./RulePart');

class Target extends RulePart {
  constructor() {
    super();
    this.type = 'target';
  }
}

module.exports = Target;
