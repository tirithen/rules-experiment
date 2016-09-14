const Effect = require('../../../Effect');
const Target = require('../../../Target');

class Destroy extends Effect {}

Destroy.parameters = {
  target: Target
};

module.exports = Destroy;
