const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;
describe('GET activity endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testactivityID;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const res = await request(webapp).post('/activity')
      .send('initiatorId=testbackend&targetId=testtarget&activityType=Comment&timestamp=testMonday');
    // eslint-disable-next-line no-underscore-dangle
    // console.log(res._body.activity);
    testactivityID = JSON.parse(res.text).activity.targetId;
    // console.log(`!!!${testactivityID}`);
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('activity').deleteMany({ initiatorId: 'testbackend' });
      const { deletedCount } = result;
      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test activity');
      } else {
        console.log('warning', 'test activity was not deleted');
      }
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
  
  test('Get a activity endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/activity/${testactivityID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const studArr = JSON.parse(resp.text).data;
    // testactivity is in the response
    // expect(studArr).toMatchObject({ _id: testactivityID, ...testactivity });
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/activity/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});