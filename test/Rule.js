/* global describe, it */

const assert = require('assert');
const Rule = require('../Rule');
const RulePart = require('../RulePart');
const cardsFixtures = require('./fixtures/cards');
const moduleLoader = require('../moduleLoader');

const rulePartConstructors = new Map([
  ...moduleLoader('./test/fixtures/activation'),
  ...moduleLoader('./test/fixtures/effect'),
  ...moduleLoader('./test/fixtures/target')
]);

cardsFixtures.forEach((cardFixture, index) => {
  if (!Array.isArray(cardFixture.output)) {
    cardsFixtures[index].output = [cardsFixtures[index].output];
  }

  if (!Array.isArray(cardFixture.rules)) {
    cardsFixtures[index].rules = [cardsFixtures[index].rules];
  }
});

function iterateRulesInCardFixture(cardFixtures) {
  const rules = [];

  cardFixtures.forEach((cardFixture, index) => {
    rules[index] = cardFixture.rules.map((ruleString) => {
      return new Rule(ruleString, rulePartConstructors);
    });
  });

  return rules;
}

describe('Rule', () => {
  it('should be instantiable', () => {
    const rule = new Rule();
    assert.equal(rule instanceof Rule, true);
  });

  describe('#parse', () => {
    it('should parse all rule strings from fixture', () => {
      assert.equal(true, false);
    });
  });

  describe.only('#getText', () => {
    it('should generate valid static text', () => {
      const rule = new Rule('This is a rule');
      assert.equal(rule.getText(), 'This is a rule');
    });

    it('should generate valid text with rule parts', () => {
      const rule = new Rule('{effect:DealDamage amount=3 target=Player}.');
      assert.equal(rule.getText(), 'This is a rule');
    });

    it('should generate valid text with rule parts', () => {
      class TextParameter extends RulePart {}
      const constructors = new Map([TextParameter]);
      const rule = new Rule('{effect:TextParameter text="testing with some text"}.', constructors);
      assert.equal(rule.getText(), 'Text parameter testing  rule');
    });

    it('should generate valid texts from all card fixtures', () => {
      const rules = iterateRulesInCardFixture(cardsFixtures);
      const rulesKeys = Object.keys(rules);
      assert.equal(rulesKeys.length, Object.keys(cardsFixtures).length);
      rulesKeys.forEach((rule, index) => {
        const cardFixture = cardsFixtures[index];
        const cardRules = rules[index];
        assert.equal(cardRules.length, Object.keys(cardFixture.rules).length);
        cardRules.forEach((cardRule, cardRuleIndex) => {
          assert.equal(cardRule.getText(), cardFixture.output[cardRuleIndex]);
        });
      });
    });
  });

  describe('#activate', () => {
    it('should resolve rule', () => {
      assert.equal(false, true);
    });
  });
});
