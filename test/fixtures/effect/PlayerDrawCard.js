const Effect = require('../../../Effect');
const Player = require('../target/Player');

class PlayerDrawCard extends Effect {}

PlayerDrawCard.parameters = {
  target: Player,
  amount: Number
};

module.exports = PlayerDrawCard;
