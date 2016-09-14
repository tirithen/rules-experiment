const Activation = require('../../../Activation');
const Creature = require('../target/Creature');
const Enchantment = require('../target/Enchantment');

class Sacrifice extends Activation {}

Sacrifice.parameters = {
  target: [Creature, Enchantment]
};

module.exports = Sacrifice;
