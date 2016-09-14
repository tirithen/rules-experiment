const Effect = require('../../../Effect');
const Player = require('../target/Player');

class PlayerDrawCard extends Effect {}

PlayerDrawCard.parameterValidation = {
  target: Player,
  amount: Number
};

module.exports = PlayerDrawCard;
