'use strict';

class RecordValidator {
  validatePayload(body) {
    const isValidPayload = [
      () => body,
      () => body.startDate,
      () => body.endDate,
      () => body.minCount,
      () => body.maxCount
    ].every(item => !!item());

    if (!isValidPayload) {
      const error = new Error('BAD_REQUEST');
      error.name = 'BadRequest';
      throw error;
    }
    return true;
  }
}

module.exports = {
  RecordValidator
};
