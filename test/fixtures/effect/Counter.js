const Effect = require('../../../Effect');
const Creature = require('../target/Creature');
const Enchantment = require('../target/Enchantment');

class Counter extends Effect {}

Counter.parameters = {
  target: [Creature, Enchantment]
};

module.exports = Counter;
