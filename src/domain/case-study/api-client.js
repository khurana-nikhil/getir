'use strict';

const { recordProvider } = require('./providers');
const { recordValidator } = require('./validators');
const { outboundSessionTransformer } = require('./transformers');

class ApiClient {
  constructor() {}

  async getRecords(body = {}) {
    try {
      recordValidator.validatePayload(body);
      const data = await recordProvider.getRecords(body);
      return outboundSessionTransformer.transform(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ApiClient;
