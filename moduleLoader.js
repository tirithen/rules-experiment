const fs = require('fs');

module.exports = (path) => {
  const modules = {};

  fs.readdirSync(path).forEach((file) => {
    if (file.match(/\.js$/)) {
      const moduleName = file.replace(/\.js$/, '');
      modules[moduleName] = require(`${path}/${moduleName}`);
    }
  });

  return modules;
};
