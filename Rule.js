const quoteRegExp = /"/;
const rulePartRegExp = /{\s*(\w+)\s*:\s*(\w+)\s+([^}]+)\s*}/;

class Rule {
  constructor(string, rulePartConstructors = new Map()) {
    this.rulePartConstructors = rulePartConstructors;
    this.ruleParts = new Map();
    this.ruleTemplateString = '';
    this.parseRuleString(string);
  }

  parseRuleString(string) {
    this.ruleTemplateString = string.replace(rulePartRegExp, (matches) => {
      const rulePartName = matches[2];
      const Constructor = this.rulePartConstructors.get(rulePartName);
      const parameters = this.parseRulePartParameters(matches[3]);
      const rulePart = new Constructor(parameters);

      this.ruleParts.set(rulePart.id, rulePart);

      return `{${rulePart.id}}`;
    });
  }

  parseRulePartParameters(string) {
    const parameters = new Map();

    string.trim().split(/\s+/).forEach((pair) => {
      if () {

      }
    });

    return parameters;
  }

  getText() {

  }
}
