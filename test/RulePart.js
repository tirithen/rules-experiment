/* global describe, it */

const assert = require('assert');
const RulePart = require('../RulePart');

describe('RulePart', () => {
  it('should be instantiable', () => {
    const rulePart = new RulePart();
    assert.equal(rulePart instanceof RulePart, true);
  });

  it('should get a unique id', () => {
    const rulePart = new RulePart();
    assert.equal(typeof rulePart.get('id'), 'string');
  });

  describe('#toString', () => {
    it('should populate the template', () => {
      const map = new Map();
      map.set('amount', 4);
      map.set('unit', 'kg');
      const rule = new RulePart('The carrot weight is {amount} {unit}.', map);
      assert.equal(rule.toString(), 'The carrot weight is 4 kg.');
    });
  });
});
