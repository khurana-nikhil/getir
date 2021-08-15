'use strict';

const express = require('express');
const httpStatus = require('http-status');

const { errorHandler } = require(`${modulesPath}/lib/errors`);

const router = express.Router();
const ApiClient = require(`${modulesPath}/domain/case-study/api-client`);
const client = new ApiClient();

module.exports = function(app) {
  router.post('/filter-records', async (req, res) => {
    const incomingPayload = req.body || {};
    client
      .getRecords(incomingPayload)
      .then(data => {
        return res.status(httpStatus.OK).json(data);
      })
      .catch(err => {
        errorHandler(err, req, res);
      });
  });

  app.use('/case-study/v1', router);
};
