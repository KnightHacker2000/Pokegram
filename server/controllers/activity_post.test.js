// import supertest
const request = require('supertest');
// import the function to close the mongodb connection
const { closeMongoDBConnection, connect } = require('../db');

// import the express server
const webapp = require('../server');

// connection to the DB
let mongo;

describe('activity /activity enpoint tests', () => {
  let db; // the db
  let response; // the response from our express server
  let token;
  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();
    const user = await request(webapp)
      .post('/user')
      .send('id=testforbackendonly&email=test@hotmail.com&fullname=testha&password=testtesttest');
    token = JSON.parse(user.text).token;
    // send the request to the API and collect the response
    response = await request(webapp)
      .post('/activity')
      .set('Authorization', token)
      .send('initiatorId=testforbackendonly&targetId=testtarget&activityType=Comment&timestamp=testMonday');
  });
  /**
 * removes all testing data from the DB
 */
  const clearDatabase = async () => {
    try {
      const result = await db.collection('activity').deleteMany({ initiatorId: 'testbackend' });
      await db.collection('cred').deleteMany({ _id: 'testforbackendonly' });
      await db.collection('user').deleteMany({ _id: 'testforbackendonly' });
      console.log('result', result);
    } catch (err) {
      console.log('error', err.message);
    }
  };

  /**
 * After running the tests, we need to remove any test data from the DB
 * We need to close the mongodb connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await clearDatabase();
      await mongo.close(); // the test  file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });  
  test('The new activity is in the database', async () => {
    const insertedactivity = await db.collection('activity').findOne({ initiatorId: 'testforbackendonly' });
    expect(insertedactivity.targetId).toEqual('testtarget');
  });

  test('missing a field 404', async () => {
    const res = await request(webapp)
      .post('/activity')
      .set('Authorization', token)
      .send('username=testuser');
    expect(res.status).toEqual(404);
  });
});
