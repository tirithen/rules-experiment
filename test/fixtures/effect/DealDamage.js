const Effect = require('../../../Effect');
const Creature = require('../target/Creature');
const Player = require('../target/Player');

class DealDamage extends Effect {}

DealDamage.parameterValidation = {
  target: [Player, Creature],
  amount: Number
};

DealDamage.template = 'deals {amount} damage to target {target}';

module.exports = DealDamage;
