const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;

describe('Delete a comment endpoint integration test', () => {
  let res;
  let db;
  let testcommentID;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    res = await request(webapp).post('/comments')
      .send('postId=63866ffd7137342a8944f054&timestamp=testMonday&content=greatwork&commentorid=Reneee');
    // get the id of the test comment
    // eslint-disable-next-line no-underscore-dangle
    testcommentID = JSON.parse(res.text).activity;
    // console.log(`!!!${res.text}`);
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('comments').deleteOne({ timestamp: 'testMonday' });

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
    const resp = await request(webapp).delete(`/comments/${testcommentID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // the user is not in the database
    const resp1 = await db.collection('comments').findOne({ _id: ObjectId(testcommentID) });
    expect(resp1).toBeNull();
  });

  test('wrong user id format/exception - response 404', async () => {
    const resp = await request(webapp).delete('/comments/1');
    expect(resp.status).toEqual(404);
  });

  test('user id not in system (correct id format) - response 404', async () => {
    const resp = await request(webapp).delete('/comments/63738b602fe72e59d4a72ccc');
    expect(resp.status).toEqual(404);
  });
});