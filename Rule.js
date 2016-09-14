const populate = require('./populate');
const RulePart = require('./RulePart');

const quoteRegExp = /"/g;
const squareBracketsOrSpaceRegExp = /[\[\]\s]/g;
const parameterRegExp = /^\w+\s*=\s*("[^"]+"|\w+)$/;
const spaceRegExp = /\s+/;
const rulePartRegExp = /\{\s*(\w+)\s*:\s*(\w+)(\s+([^\}]+))?\s*\}/;
const isNumericRegExp = /^\d+(\.\d+)?$/;
const referrsToConstructorsRegExp = /^\s*\[?\s*[\w\s,]+\s*\]?\s*$/;

class Rule extends Map {
  constructor(string = '', rulePartConstructors = new Map(), data = new Map()) {
    super();
    this.ruleString = string;
    this.template = '';
    this.rulePartConstructors = rulePartConstructors;
    this.parseRuleString();
    data.forEach((value, name) => {
      this.set(name, value);
    });
  }

  parseRuleString() {
    this.template = this.ruleString.replace(
      rulePartRegExp,
      (match, partType, partName, parametersSection, partParameters) => {
        const Constructor = this.rulePartConstructors.get(partName);

        if (!(Constructor instanceof Function)) {
          throw new Error(`RulePart constructor named "${partName}" was not found`);
        }

        let parameters;
        if (partParameters) {
          parameters = this.parseRulePartParameters(partParameters);
        }

        const rulePart = new Constructor(parameters);
        if (rulePart.type !== partType) {
          throw new Error(`RulePart instance must be of type "${rulePart.type}"`);
        }

        this.set(rulePart.id, rulePart);

        return `{${rulePart.id}}`;
      }
    );
  }

  parseRulePartParameters(string) {
    const parameters = new Map();

    string.trim().split(spaceRegExp).forEach((parameter) => {
      if (!parameter.match(parameterRegExp)) {
        throw new Error(`Malformed RulePart attribute in: ${string}`);
      }

      const parts = parameter.split('=');

      if (parts[1].match(quoteRegExp)) {
        parts[1] = parts[1].replace(quoteRegExp, '');
      } else if (parts[1].match(isNumericRegExp)) {
        parts[1] = parseFloat(parts[1]);
      } else if (parts[1].match(referrsToConstructorsRegExp)) {
        parts[1] = this.convertRulePartStringsToConstructorArray(parts[1]);
      } else {
        throw new Error(`Malformed RulePart attribute in: ${string}`);
      }

      parameters.set(parts[0], parts[1]);
    });

    return parameters;
  }

  convertRulePartStringsToConstructorArray(value) {
    const constructors = value.replace(squareBracketsOrSpaceRegExp, '').split(',');
    return constructors.map((name) => {
      const Constructor = this.rulePartConstructors.get(name);
      if (!(RulePart.isPrototypeOf(Constructor))) {
        throw new Error(`Unable find decendent RulePart constructor "${name}"`);
      }
      return Constructor;
    });
  }

  toString() {
    return populate(this.template, this);
  }
}

module.exports = Rule;
