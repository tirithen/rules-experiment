const fs = require('fs');

module.exports = (path) => {
  const modules = new Map();

  fs.readdirSync(path).forEach((file) => {
    if (file.match(/\.js$/)) {
      const moduleName = file.replace(/\.js$/, '');
      modules.set(moduleName, require(`${path}/${moduleName}`));
    }
  });

  return modules;
};
