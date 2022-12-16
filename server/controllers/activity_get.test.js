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
    const user = await request(webapp)
      .post('/user')
      .send('id=testforbackendonly&email=test@hotmail.com&fullname=testha&password=testtesttest');
    token = JSON.parse(user.text).token;
    const res = await request(webapp)
      .post('/activity')
      .set('Authorization', token)
      .send('initiatorId=testforbackendonly&targetId=testtarget&activityType=Comment&timestamp=testMonday');
    // console.log(res._body.activity);
    testactivityID = JSON.parse(res.text).activity.targetId;
    // console.log(`!!!${testactivityID}`);
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('activity').deleteMany({ initiatorId: 'testforbackendonly' });
      await db.collection('cred').deleteMany({ _id: 'testforbackendonly' });
      await db.collection('user').deleteMany({ _id: 'testforbackendonly' });
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
    const resp = await request(webapp).get(`/activity/${testactivityID}`).set('Authorization', token);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const studArr = JSON.parse(resp.text).data;
    // testactivity is in the response
    // expect(studArr).toMatchObject({ _id: testactivityID, ...testactivity });
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/activity/hahahaha').set('Authorization', token);
    // expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
  });
});