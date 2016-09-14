const Effect = require('../../../Effect');
const Target = require('../../../Target');

class Destroy extends Effect {}

Destroy.parameterValidation = {
  target: Target
};

module.exports = Destroy;
