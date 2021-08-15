'use strict';

global.app = {};
global.server = {};
global.agent = {};
global.config = {};

beforeAll(() => {
  const supertest = require('supertest');
  const { app, server } = require(`${appRoot}/server.js`);
  const config = require(`${appRoot}/config/config.js`);
  const agent = supertest.agent(app);
  global.config = config;
  global.app = app;
  global.server = server;
  global.agent = agent;
});

afterAll(async () => {
  if (process.env.NODE_ENV == 'test') {
    const {
      connectionInstance: connection
    } = require(`${appRoot}/src/lib/mongo-connection`);
    const collections = await connection.collections;
    for (const collectionName of Object.keys(collections)) {
      const collection = connection.collections[collectionName];
      await collection.drop();
    }
    connection.close();
  }
  server.close();
});
