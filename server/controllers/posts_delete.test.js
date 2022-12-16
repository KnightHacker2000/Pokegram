const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;

describe('Delete a post endpoint integration test', () => {
  let res;
  let db;
  let testPostID;
  let token;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const user = await request(webapp)
      .post('/user')
      .send('id=testforbackendonly&email=test@hotmail.com&fullname=testha&password=testtesttest');
    token = JSON.parse(user.text).token;
    res = await request(webapp)
      .post('/posts')
      .set('Authorization', token)
      .send('username=testforbackendonly&timestamp=Monday&type=video');
    // get the id of the test post
    // eslint-disable-next-line no-underscore-dangle
    testPostID = JSON.parse(res.text).post._id;
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('posts').deleteOne({ username: 'testforbackendonly' });
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
    const resp = await request(webapp).delete(`/posts/${testPostID}`).set('Authorization', token);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('posts').findOne({ _id: ObjectId(testPostID) });
    expect(resp1).toBeNull();
  });

  test('wrong user id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/posts/1').set('Authorization', token);
    expect(resp.status).toEqual(404);
  });

  test('user id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/posts/63738b602fe72e59d4a72ccc').set('Authorization', token);
    expect(resp.status).toEqual(404);
  });
});