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
    const user = await request(webapp)
      .post('/user')
      .send('id=testforbackendonly&email=test@hotmail.com&fullname=testha&password=testtesttest');
    token = JSON.parse(user.text).token;
    res = await request(webapp)
      .post('/activity')
      .set('Authorization', token)
      .send('initiatorId=testforbackendonly&targetId=testtarget&activityType=Comment&timestamp=testMonday');
    // get the id of the test activity
    // eslint-disable-next-line no-underscore-dangle
    testactivityID = JSON.parse(res.text).activity._id;
    // console.log(`!!!${res.text}`);
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('activity').deleteMany({ initiatorId: 'testforbackendonly' });
      await db.collection('cred').deleteMany({ _id: 'testforbackendonly' });
      await db.collection('user').deleteMany({ _id: 'testforbackendonly' });
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
    const resp = await request(webapp).delete(`/activity/${testactivityID}`).set('Authorization', token);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('activity').findOne({ _id: ObjectId(testactivityID) });
    expect(resp1).toBeNull();
  });

  test('wrong user id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/activity/1').set('Authorization', token);
    expect(resp.status).toEqual(404);
  });

  test('user id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/activity/63738b602fe72e59d4a72ccc').set('Authorization', token);
    expect(resp.status).toEqual(404);
  });
});