'use strict';

const path = require('path');
const constants = require('./constants');

exports.APP_PORT = process.env.PORT || constants.DEFAULT_APP_PORT;
const MONGO_PORT = process.env.MONGO_PORT || constants.DEFAULT_MONGO_PORT;
const MONGO_HOST = process.env.MONGO_HOST || `localhost:${MONGO_PORT}`;
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'getir-case-study';
exports.connectionString =
  process.env.MONGO_URI || `mongodb://${MONGO_HOST}/${MONGO_DBNAME}`;

exports.MONGO_LOG_VERBOSE = false;

global.appRoot = path.normalize(`${path.resolve(__dirname)}/..`);
global.modulesPath = `${appRoot}/src`;
global.modelsPath = `${modulesPath}/models`;
