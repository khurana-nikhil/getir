'use strict';

/**
 * Model gives common functions that are used in other models.
 * @module models/db-model
 * @type {connectionInstance|exports}
 */
const mongoConnection = require(`${appRoot}/src/lib/mongo-connection`);
const dbObj = mongoConnection.connectionInstance;
const { Schema } = mongoConnection;

module.exports = function(collection, DBSchema) {
  this.accessSchema = new Schema(DBSchema);
  this.collectionModel = dbObj.model(collection, this.accessSchema);

  /**
   * to get the sub document of a collation
   * @param1 pipeline [array] pipeline of aggregation
   */
  this.aggregate = async pipeline => {
    const aggregate = this.collectionModel.aggregate(pipeline);
    return aggregate.exec();
  };

  /**
   * Function creates a document, inserts a document in the collection
   * @param data {JSON_obj} the object data to be inserted
   */
  this.create = async data => {
    const conn = this.collectionModel;
    const newRecord = conn(data);
    return newRecord.save();
  };

  /**
   * Function to delete many documents
   * @param conditions {JSON_obj} containing where clause
   */
  this.deleteMany = async conditions => {
    return this.collectionModel.deleteMany(conditions);
  };
};
