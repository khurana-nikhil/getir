'use strict';

const path = require('path');
const fs = require('fs');

function pathIsDirectory(newPath) {
  return fs.lstatSync(newPath).isDirectory();
}

function skipLoading(file) {
  return file.indexOf('.js') < 0 || file.indexOf('index.js') > -1;
}

function loadRoute(route, app) {
  return require(route)(app);
}

function loadRoutes(app, entryPoint = __dirname) {
  const walk = (newPath, depth = 0) => {
    const items = fs.readdirSync(newPath);
    items.forEach(entry => {
      const currentPath = path.join(path.resolve(newPath), entry);
      if (pathIsDirectory(currentPath)) {
        walk(currentPath, depth + 1);
      } else {
        const skipRoute = skipLoading(currentPath);
        if (skipRoute) {
          return;
        }
        loadRoute(currentPath, app);
      }
    });
  };
  walk(entryPoint, 0);
}

module.exports.loadRoutes = loadRoutes;
