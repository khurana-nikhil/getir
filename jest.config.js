'use strict';

module.exports = {
  testEnvironment: 'node',
  testRegex: '((\\.|/*.)(spec))\\.js?$',
  moduleNameMapper: {
    '^@root(.*)$': '<rootDir>/$1',
    '^@modules(.*)$': '<rootDir>/src$1'
  },
  setupFiles: ['./test/init.js']
};
