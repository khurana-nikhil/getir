'use strict';

class OutboundSessionTransformer {
  transform(records) {
    return {
      code: 0,
      msg: 'Success',
      records
    };
  }
}

module.exports = {
  OutboundSessionTransformer
};
