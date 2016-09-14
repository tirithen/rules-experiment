function arrayOfConstructorsToString(constructors) {
  if (!Array.isArray(constructors)) {
    constructors = [constructors];
  }
  return constructors.map(constructor => constructor.name).join(', ');
}

module.exports = arrayOfConstructorsToString;
