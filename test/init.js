'use strict';

const path = require('path');

function overrideConsoleMethods() {
  /* eslint-disable no-console */
  console.error = function() {};
  console.warn = function() {};
  console.info = function() {};
  console.debug = function() {};
  /* eslint-enable no-console */
}

function setEnvironmentals() {
  process.env.PORT = 9093;
  process.env.NODE_ENV = 'test';
  process.env.MONGO_DBNAME = 'getir-testcase';
}

function getAppRoot() {
  return path.normalize(`${path.resolve(__dirname)}'/..`);
}

function setGlobalPaths(appRoot) {
  global.appRoot = appRoot;
  global.modulesPath = `${appRoot}/src`;
  global.modelsPath = `${appRoot}/src/models`;
  global.testModule = `${appRoot}/test`;
}

function prepareForTests() {
  const appRoot = getAppRoot();
  setEnvironmentals();
  setGlobalPaths(appRoot);
  overrideConsoleMethods();
}

prepareForTests();
