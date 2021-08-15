'use strict';

const httpStatus = require('http-status');

const apiStatus = 'failure';

const errorMap = {
  BadRequest: httpStatus.BAD_REQUEST
};

function getMessage(err) {
  if (err.errors) {
    return Object.keys(err.errors)
      .map(k => err.errors[k].message)
      .join(', ');
  }

  return err.message;
}

function errorHandler(err, req, res) {
  const statusCode = errorMap[err.name] || httpStatus.INTERNAL_SERVER_ERROR;
  const msg = getMessage(err);
  return res.status(statusCode).json({
    apiStatus,
    msg
  });
}

module.exports = {
  errorHandler
};
