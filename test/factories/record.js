'use strict';
const Record = require(`${modelsPath}/record`);

const addRecords = async record => {
  return Record.createRecord(record);
};

const deleteAll = db => {
  return Record.deleteMany();
};

module.exports = {
  addRecords,
  deleteAll
};
