const populate = require('./populate');
const RulePart = require('./RulePart');

const quoteRegExp = /"/g;
const parameterRegExp = /\w+\s*=\s*("[^"]+"|\w+)/g;
const rulePartRegExp = /\{\s*(\w+)\s*:\s*(\w+)(\s+([^\}]+))?\s*\}/;
const isNumericRegExp = /^\d+(\.\d+)?$/;

class Rule extends Map {
  constructor(string = '', rulePartConstructors = new Map()) {
    super();
    this.ruleString = string;
    this.template = '';
    this.rulePartConstructors = rulePartConstructors;
    this.parseRuleString();
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

    string.trim().match(parameterRegExp).forEach((parameter) => {
      const parts = parameter.trim().split('=');

      if (parts[1].match(quoteRegExp)) {
        parts[1] = parts[1].replace(quoteRegExp, '');
      } else if (parts[1].match(isNumericRegExp)) {
        parts[1] = parseFloat(parts[1]);
      } else if (this.isRulePartOrArrayWithRuleParts(parts[1])) {
        parts[1] = this.convertRulePartStringsToConstructorArray(parts[1]);
      } else {
        throw new Error('Malformed RulePart attribute in:', string);
      }

      parameters.set(parts[0], parts[1]);
    });

    return parameters;
  }

  isRulePartOrArrayWithRuleParts(values) {
    let result = true;

    if (!Array.isArray(values)) {
      values = [values];
    }

    values.forEach((value) => {
      if (result && !this.rulePartConstructors.has(value)) {
        result = false;
      }
    });

    return result;
  }

  convertRulePartStringsToConstructorArray(values) {
    if (!Array.isArray(values)) {
      values = [values];
    }

    return values.map((value) => {
      const Constructor = this.rulePartConstructors.get(value);

      if (!(Constructor instanceof RulePart)) {
        throw new Error(`Unable to find RulePart constructor "${value}"`);
      }

      return Constructor;
    });
  }

  toString() {
    return populate(this.template, this.ruleParts);
  }
}

module.exports = Rule;
