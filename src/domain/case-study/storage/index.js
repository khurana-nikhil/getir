'use strict';

const {
  RepositoryFactory
} = require(`${modulesPath}/lib/factories/repository-factory`);
const { RecordRepository } = require('./record-repository');
const recordStorageFactory = new RepositoryFactory(RecordRepository);

module.exports = {
  recordStorageFactory,
  RecordRepository
};
