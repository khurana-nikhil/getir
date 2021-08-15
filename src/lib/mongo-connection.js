'use strict';

const mongoose = require('mongoose');

const config = require(`${appRoot}/config/config`);
const { Schema } = mongoose;

/* eslint-disable-next-line */
let connectionInstance;

if (!connectionInstance) {
  const connectionString = config.connectionString;
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  if (config.ENV !== 'test') {
    options = {
      ...options,
      poolSize: 50,
      socketTimeoutMS: 300000,
      keepAlive: 600000,
      connectTimeoutMS: 300000
    };
  }
  connectionInstance = mongoose.createConnection(connectionString, options);

  // error connecting to db
  connectionInstance.on('error', err => {
    if (err) {
      throw err;
    }
  });
  // db connected
  connectionInstance.once('open', () => {
    /* eslint-disable-next-line */
    console.info('MongoDb connected successfully, date is = ' + new Date());
  });
}

// export the db connection
module.exports.connectionInstance = connectionInstance;
module.exports.Schema = Schema;

const logDebug = config.MONGO_LOG_VERBOSE || false;

mongoose.set('debug', logDebug);
