const RulePart = require('./RulePart');

class Activation extends RulePart {
  constructor() {
    super();
    this.type = 'activation';
  }
}

module.exports = Activation;
