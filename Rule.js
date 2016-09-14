const populate = require('./populate');

const quoteRegExp = /"/g;
const parameterRegExp = /\w+\s*=\s*("[^"]+"|\w+)/g;
const rulePartRegExp = /\{\s*(\w+)\s*:\s*(\w+)\s+([^\}]+)\s*\}/;
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
      (match, partType, partName, partParameters) => {
        const Constructor = this.rulePartConstructors.get(partName);
console.log('Constructor', Constructor, this.rulePartConstructors)
        const parameters = this.parseRulePartParameters(partParameters);
        const rulePart = new Constructor(parameters);

        if (rulePart.type !== partType) {
          throw new Error(`RulePart instance must be of type ${partType}`);
        }

        this.set(rulePart.id, rulePart);

        return `{${rulePart.id}}`;
      }
    );
  }

  parseRulePartParameters(string) {
    const parameters = new Map();
    console.log('string', string)
console.log('parameters', string.trim().match(parameterRegExp));
    string.trim().match(parameterRegExp).forEach((parameter) => {
      const parts = parameter.trim().split('=');
      parts[1] = parts[1].replace(quoteRegExp, '');
      if (parts[1].match(isNumericRegExp)) {
        parts[1] = parseFloat(parts[1]);
      }
      parameters.set(parts[0], parts[1]);
    });

    return parameters;
  }

  toString() {
    return populate(this.template, this.ruleParts);
  }
}

module.exports = Rule;
