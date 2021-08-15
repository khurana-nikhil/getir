'use strict';

const dbModel = require('./db-model');

const collectionName = 'records';

const recordSchema = {
  key: { type: String },
  counts: [Number],
  value: { type: String },
  createdAt: { type: Date }
};

const recordModel = new dbModel(collectionName, recordSchema);

const aggregate = async pipeline => {
  return recordModel.aggregate(pipeline);
};

const createRecord = doc => {
  return recordModel.create(doc);
};

const deleteMany = condition => {
  return recordModel.deleteMany(condition);
};

module.exports = {
  recordModel,
  aggregate,
  createRecord,
  deleteMany
};
