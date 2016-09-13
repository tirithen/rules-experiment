const uuid = require('uuid').v4;

class RulePart {
  constructor(parameters) {
    parameters.forEach((value, name) => {
      this[name] = value;
    });

    if (!this.id) {
      this.id = uuid();
    }
  }
}

module.exports = RulePart;
