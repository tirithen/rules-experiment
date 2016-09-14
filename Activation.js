const RulePart = require('./RulePart');

class Activation extends RulePart {
  constructor(parameters) {
    super(parameters);
    this.type = 'activation';
  }
}

module.exports = Activation;
