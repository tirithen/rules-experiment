const Effect = require('../../../Effect');
const Creature = require('../target/Creature');
const Enchantment = require('../target/Enchantment');

class Counter extends Effect {}

Counter.parameterValidation = {
  target: [Creature, Enchantment]
};

module.exports = Counter;
