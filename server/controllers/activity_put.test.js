const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a activity endpoint integration test', () => {
  let res;
  let db;
  let testactivityID; // will store the id of the test activity

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    res = await request(webapp).post('/activity')
      .send('initiatorId=testbackend&targetId=testtarget&activityType=Comment&timestamp=testMonday');
    // get the id of the test activity
    // eslint-disable-next-line no-underscore-dangle
    testactivityID = JSON.parse(res.text).activity._id;
    // console.log(`!!!${testactivityID}`);
  });

  const clearDatabase = async () => {
    try {
      await db.collection('activity').deleteMany({ initiatorId: 'testbackend' });
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
      await closeMongoDBConnection(); // mongo client that started server.
    } catch (err) {
      return err;
    }
  });

  test('Endpoint status code and response async/await', async () => {
    const resp = await request(webapp).put(`/activity/${testactivityID}`).send("activityType=Like");
    expect(resp.status).toEqual(201);
    expect(resp.type).toBe('application/json');

    // the database was updated
    const updatedactivity = await db.collection('activity').findOne({ _id: ObjectId(testactivityID) });
    // console.log( `!!!!${JSON.stringify(updatedactivity)}`)
    expect(updatedactivity.activityType).toEqual('Like');
  });

  test('missing major 404', async () => {
    res = await request(webapp).put(`/activity/1`)
      .send('name=music');
    expect(res.status).toEqual(404);
  });
})