const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;

describe('Delete an activity endpoint integration test', () => {
  let res;
  let db;
  let testactivityID;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    res = await request(webapp).post('/activity')
      .send('initiatorId=testbackend&targetId=testtarget&activityType=Comment&timestamp=testMonday');
    // get the id of the test activity
    // eslint-disable-next-line no-underscore-dangle
    testactivityID = JSON.parse(res.text).activity._id;
    // console.log(`!!!${res.text}`);
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('activity').deleteMany({ initiatorId: 'testbackend' });

      console.log('info', result);
    } catch (err) {
      console.log('error', err.message);
    }
  };
  /**
 * Delete all test data from the DB
 * Close all open connections
 */
  afterAll(async () => {
    await clearDatabase();
    try {
      await mongo.close();
      await closeMongoDBConnection(); // mongo client started when running express.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint response: status code, type and content', async () => {
    // successful deletion returns 200 status code
    const resp = await request(webapp).delete(`/activity/${testactivityID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('activity').findOne({ _id: ObjectId(testactivityID) });
    expect(resp1).toBeNull();
  });

  test('wrong user id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/activity/1');
    expect(resp.status).toEqual(404);
  });

  test('user id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/activity/63738b602fe72e59d4a72ccc');
    expect(resp.status).toEqual(404);
  });
});