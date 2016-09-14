const placeholderRegExp = /{[\w\-]+}/g;
const openingBracketRegExp = /^\s*{\s*/;
const closingBracketRegExp = /\s*}\s*$/;

function trimBrackets(string) {
  return string.replace(openingBracketRegExp, '').replace(closingBracketRegExp, '');
}

function populate(string, map = new Map()) {
  return string.replace(placeholderRegExp, (placeholder) => {
    let result = '';
    const value = map.get(trimBrackets(placeholder));

    if (typeof value === 'object' && value.toString instanceof Function) {
      result = value.toString();
    } else {
      result = value;
    }

    return result;
  });
}

module.exports = populate;
