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

  it('should throw error when RulePart is missing', () => {
    assert.throws(() => {
      const rule = new Rule('{type:IDoNotExist} some text after.');
      rule.toString();
    }, /RulePart constructor named "IDoNotExist" was not found/);
  });

  it('should throw error when RulePart found is of the wrong type', () => {
    assert.throws(() => {
      const rule = new Rule('{wrongType:DealDamage} some text after.', rulePartConstructors);
      rule.toString();
    }, /RulePart instance must be of type "effect"/);
  });

  it('should throw error when RulePart parameter is missing', () => {
    assert.throws(() => {
      const rule = new Rule('{effect:DealDamage} some text after.', rulePartConstructors);
      rule.toString();
    }, /RulePart parameter "amount" is missing/);
  });

  describe('#toString', () => {
    it('should generate valid static text', () => {
      const rule = new Rule('This is a rule');
      assert.equal(rule.toString(), 'This is a rule');
    });

    it('should generate valid text with rule parts as number and instance', () => {
      const rule = new Rule('{effect:DealDamage amount=3 target=Player}.', rulePartConstructors);
      assert.equal(rule.toString(), 'Lightning Bolt deals 3 damage to target player.');
    });

    it.skip('should generate valid text with rule parts as text', () => {
      class TextParameter extends RulePart {}
      const singleRulePartConstructor = new Map([TextParameter]);
      const rule = new Rule(
        'Now with {effect:TextParameter text="testing with some text"} rule.',
        singleRulePartConstructor
      );
      assert.equal(rule.toString(), 'Now with text parameter testing with some text rule.');
    });

    it.skip('should generate valid texts from all card fixtures', () => {
      const rules = iterateRulesInCardFixture(cardsFixtures);
      const rulesKeys = Object.keys(rules);
      assert.equal(rulesKeys.length, Object.keys(cardsFixtures).length);
      rulesKeys.forEach((rule, index) => {
        const cardFixture = cardsFixtures[index];
        const cardRules = rules[index];
        assert.equal(cardRules.length, Object.keys(cardFixture.rules).length);
        cardRules.forEach((cardRule, cardRuleIndex) => {
          assert.equal(cardRule.toString(), cardFixture.output[cardRuleIndex]);
        });
      });
    });
  });

  describe.skip('#activate', () => {
    it('should resolve rule', () => {
      assert.equal(false, true);
    });
  });
});
