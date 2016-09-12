/* global describe, it */

const assert = require('assert');
const Rule = require('../Rule');
const cards = require('./fixtures/cards');

function iterateRulesInCardFixture(cardFixtures) {
  const rules = {};

  cardFixtures.forEach((card) => {
    if (Array.isArray(card.rules)) {
      rules[card.name] = card.rules;
    } else {
      rules[card.name] = [card.rules];
    }

    console.log('RUN iterateRulesInCardFixture', rules[card.name]);

    rules[card.name] = rules[card.name].map((ruleString) => {
      const rule = new Rule();
      rule.parse(ruleString);
      return rule;
    });
  });

  return rules;
}

describe('Rule', () => {
  it('should be instantiable', () => {
    const rule = new Rule();
    assert.equal(rule instanceof Rule, true);
  });

  describe.only('#parse', () => {
    it('should parse rule string', () => {
      console.log('pre iterateRulesInCardFixture')
      const rules = iterateRulesInCardFixture(cards);
      const rulesKeys = Object.keys(rules);
      assert.equal(rulesKeys.length, Object.keys(cards).length);
      rulesKeys.forEach((name) => {
        assert.equal(rules[name].length, Object.keys(cards[name].rules).length);
        rules[name].forEach((rule, index) => {
          assert.equal(rule.toString(), );
        });
      });
      console.log('#parse iterateRulesInCardFixture', rules);
      assert.equal(false, true);
    });
  });

  describe('#getText', () => {
    it('should generate text from rule string', () => {
      assert.equal(false, true);
    });
  });

  describe('#activate', () => {
    it('should resolve rule', () => {
      assert.equal(false, true);
    });
  });
});
