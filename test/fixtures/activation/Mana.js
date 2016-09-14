const Activation = require('../../../Activation');

class Mana extends Activation {}

Mana.parameterValidation = {
  amount: String
};

module.exports = Mana;
