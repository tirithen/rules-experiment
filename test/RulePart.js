/* global describe, it */

const assert = require('assert');
const RulePart = require('../RulePart');
const Target = require('../Target');
const Player = require('./fixtures/target/Player');
const Creature = require('./fixtures/target/Creature');
const Mammal = require('./fixtures/target/Mammal');

describe('RulePart', () => {
  it('should be instantiable', () => {
    const rulePart = new RulePart();
    assert.equal(rulePart instanceof RulePart, true);
  });

  it('should get a unique id', () => {
    const rulePart = new RulePart();
    assert.equal(typeof rulePart.id, 'string');
  });

  it('should throw error when passing parameters to a RulePart that does not take any', () => {
    const parameters = new Map();
    parameters.set('likes', 'Banana');
    assert.throws(() => {
      const rulePart = new RulePart(parameters);
      assert.equal(typeof rulePart.id, 'string');
    }, /Constructor RulePart does not take any arguments/);
  });

  it('should throw error if trying to use an unsupported type for parameter', () => {
    class RulePartWithParameters extends RulePart {}
    RulePartWithParameters.parameterValidation = { first: NaN };
    const parameters = new Map();
    parameters.set('first', new Date());
    assert.throws(() => {
      const rulePart = new RulePartWithParameters(parameters);
      assert.equal(typeof rulePart.id, 'string');
    }, /Parameter "first" is of the unsupported type Date/);
  });

  it('should not throw error when rule part is constructed with valid parameters', () => {
    class RulePartWithParameters extends RulePart {}
    RulePartWithParameters.parameterValidation = {
      first: Number,
      second: String,
      third: Boolean,
      fourth: Player,
      fifth: [Player, Creature],
      sixth: [Player, Creature],
      seventh: [Target]
    };

    const parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 'hej');
    parameters.set('third', false);
    parameters.set('fourth', Player);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Creature, Player, Mammal]);
    parameters.set('seventh', Mammal);
    assert.doesNotThrow(() => {
      const rulePart = new RulePartWithParameters(parameters);
      assert.equal(typeof rulePart.id, 'string');
    }, Error);
  });

  it('should throw error when a rule part is constructed with invalid parameters', () => {
    class RulePartWithParameters extends RulePart {}
    RulePartWithParameters.parameterValidation = {
      first: Number,
      second: String,
      third: Boolean,
      fourth: Player,
      fifth: [Player, Creature],
      sixth: [Player, Creature],
      seventh: [Player, Mammal]
    };

    function assertThrows(parameters) {
      assert.throws(() => {
        const rulePart = new RulePartWithParameters(parameters);
        assert.equal(typeof rulePart.id, 'string');
      }, /Constructor RulePartWithParameters requires parameter/);
    }

    let parameters = new Map();
    parameters.set('first', '2');
    parameters.set('second', 'hej');
    parameters.set('third', false);
    parameters.set('fourth', Player);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Player, Creature]);
    parameters.set('seventh', [Mammal]);
    assertThrows(parameters);

    parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 3);
    parameters.set('third', false);
    parameters.set('fourth', Player);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Player, Creature]);
    parameters.set('seventh', [Mammal]);
    assertThrows(parameters);

    parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 'hej');
    parameters.set('third', 43);
    parameters.set('fourth', Player);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Player, Creature]);
    parameters.set('seventh', [Mammal]);
    assertThrows(parameters);

    parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 'hej');
    parameters.set('third', false);
    parameters.set('fourth', Creature);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Player, Creature]);
    parameters.set('seventh', [Mammal]);
    assertThrows(parameters);

    parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 'hej');
    parameters.set('third', false);
    parameters.set('fourth', Player);
    parameters.set('fifth', RulePartWithParameters);
    parameters.set('sixth', [Player, Creature]);
    parameters.set('seventh', [Mammal]);
    assertThrows(parameters);

    parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 'hej');
    parameters.set('third', false);
    parameters.set('fourth', Player);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Player, Creature, RulePartWithParameters]);
    parameters.set('seventh', [Mammal]);
    assertThrows(parameters);

    parameters = new Map();
    parameters.set('first', 2);
    parameters.set('second', 'hej');
    parameters.set('third', false);
    parameters.set('fourth', Player);
    parameters.set('fifth', Creature);
    parameters.set('sixth', [Player, Creature]);
    parameters.set('seventh', [Creature]);
    assertThrows(parameters);
  });

  describe('#toString', () => {
    it('should populate the template', () => {
      const map = new Map();
      map.set('amount', 4);
      map.set('unit', 'kg');
      class Carrots extends RulePart {}
      Carrots.parameterValidation = { amount: Number, unit: String };
      Carrots.template = 'The carrot weight is {amount} {unit}.';
      const rulePart = new Carrots(map);
      assert.equal(rulePart.toString(), 'The carrot weight is 4 kg.');
    });
  });
});
