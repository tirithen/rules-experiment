const uuid = require('uuid').v4;
const populate = require('./populate');
const verifyAllAreDecendantsOf = require('./verifyAllAreDecendantsOf');
const arrayOfConstructorsToString = require('./arrayOfConstructorsToString');

class RulePart extends Map {
  constructor(parameters = new Map()) {
    super();

    if (!(this.constructor.parameterValidation instanceof Object) && parameters.size > 0) {
      throw new Error(
        `Constructor ${this.constructor.name} does not take any arguments`
      );
    }

    if (!this.constructor.template) {
      this.constructor.template = '';
    }

    if (!this.id) {
      this.id = uuid();
    }

    this.setWithoutValidation = this.set;
    this.set = (name, value) => {
      this.validateParameter(name, value);
      this.setWithoutValidation(name, value);
    };

    parameters.forEach((value, name) => {
      this.set(name, value);
    });
  }

  validateParameter(name, parameter) {
    const expectedType = this.constructor.parameterValidation[name];
    if (expectedType === String) {
      if (typeof parameter !== 'string') {
        throw new Error(
          `Constructor ${this.constructor.name} requires parameter "${name}" to be a string`
        );
      }
    } else if (expectedType === Number) {
      if (typeof parameter !== 'number') {
        throw new Error(
          `Constructor ${this.constructor.name} requires parameter "${name}" to be a number`
        );
      }
    } else if (expectedType === Boolean) {
      if (parameter !== true && parameter !== false) {
        throw new Error(
          `Constructor ${this.constructor.name} requires parameter ` +
          `"${name}" to be true or false`
        );
      }
    } else if (Array.isArray(expectedType) && RulePart.isPrototypeOf(expectedType[0])) {
      if (!verifyAllAreDecendantsOf(parameter, expectedType)) {
        throw new Error(
          `Constructor ${this.constructor.name} requires parameter ` +
          `"${name}" to be one of ${arrayOfConstructorsToString(expectedType)} ` +
          `but was given ${arrayOfConstructorsToString(parameter)}`
        );
      }
    } else if (RulePart.isPrototypeOf(expectedType)) {
      if (parameter !== expectedType && !expectedType.isPrototypeOf(parameter)) {
        throw new Error(
          `Constructor ${this.constructor.name} requires parameter ` +
          `"${name}" to be a ${expectedType.name} ` +
          `but was given ${parameter.name}`
        );
      }
    } else {
      throw new Error(
        `Parameter "${name}" is of the unsupported type ${parameter.constructor.name}`
      );
    }
  }

  toString() {
    return populate(this.constructor.template, this);
  }
}

module.exports = RulePart;
