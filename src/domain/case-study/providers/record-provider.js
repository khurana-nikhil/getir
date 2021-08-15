'use strict';

const { recordStorageFactory } = require('../storage');

const defaultRepo = () => {
  return {
    recordRepository: recordStorageFactory.repository
  };
};

class RecordProvider {
  constructor({ recordRepository } = defaultRepo()) {
    this.recordRepository = recordRepository;
  }

  async getRecords(body) {
    try {
      return this.recordRepository.getRecords(body);
    } catch (err) {
      // logger.error(`err in getting records : ${err}`);
      throw err;
    }
  }
}

module.exports = {
  RecordProvider
};
