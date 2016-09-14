const Effect = require('../../../Effect');
const Creature = require('../target/Creature');
const Player = require('../target/Player');

class DealDamage extends Effect {}

DealDamage.parameters = {
  target: [Player, Creature],
  amount: Number
};

module.exports = DealDamage;
