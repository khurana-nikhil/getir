/* eslint-disable max-lines-per-function */
'use strict';

require(`${testModule}/routes/helper`);
const recordFactory = require(`${testModule}/factories/record`);
const recordStub = require(`${testModule}/stubs/record`);

const httpStatus = require('http-status');

describe.only('Records', () => {
  let db;
  let createdRecord;
  beforeEach(async done => {
    createdRecord = await recordFactory.addRecords(recordStub.createRecord);
    done();
  });

  afterEach(async done => {
    await recordFactory.deleteAll();
    done();
  });

  describe('filter Records route', () => {
    it('it should return 404 status', done => {
      agent
        .get('/case-study/v1/filter-records')
        .set({ Accept: 'application/json, text/plain, */*' })
        .end(async (err, res) => {
          try {
            expect(res.status).toEqual(httpStatus.NOT_FOUND);
            done();
          } catch (err) {
            done(err);
          }
        });
    });

    it('it should return 400 bad request', done => {
      agent
        .post('/case-study/v1/filter-records')
        .set({ Accept: 'application/json, text/plain, */*' })
        .end(async (err, res) => {
          try {
            expect(res.status).toEqual(httpStatus.BAD_REQUEST);
            // expect(res.body).to.be.an('object');
            // expect(Array.isArray(res.body.records).toBeTruthy);
            done();
          } catch (err) {
            done(err);
          }
        });
    });

    it('it should return 200', done => {
      agent
        .post('/case-study/v1/filter-records')
        .send({
          startDate: '2016-01-26',
          endDate: '2021-02-02',
          minCount: 100,
          maxCount: 3000
        })
        .set({ Accept: 'application/json, text/plain, */*' })
        .end(async (err, res) => {
          try {
            expect(res.status).toEqual(httpStatus.OK);
            expect(res.body.msg).toEqual('Success');
            expect(Array.isArray(res.body.records).toBeTruthy);
            done();
          } catch (err) {
            done(err);
          }
        });
    });
  });
});
