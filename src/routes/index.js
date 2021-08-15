'use strict';

const routeLoader = require(`${appRoot}/src/lib/recursive-route-loader`);

module.exports = function(app) {
  routeLoader.loadRoutes(app, __dirname);
};
