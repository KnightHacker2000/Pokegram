const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a post endpoint integration test', () => {
  let res;
  let db;
  let testcommentID; // will store the id of the test post
  let token;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const user = await request(webapp)
      .post('/user')
      .send('id=testforbackendonly&email=test@hotmail.com&fullname=testha&password=testtesttest');
    token = JSON.parse(user.text).token;
    res = await request(webapp)
      .post('/comments')
      .set('Authorization', token)
      .send('postId=63866ffd7137342a8944f054&timestamp=testMonday&content=greatwork&commentorid=Reneee');
    // get the id of the test post
    // eslint-disable-next-line no-underscore-dangle
    testcommentID = JSON.parse(res.text).activity;
    // console.log(`!!!${testcommentID}`);
  });

  const clearDatabase = async () => {
    try {
      await db.collection('comments').deleteOne({ timestamp: 'testMonday' });
      await db.collection('cred').deleteMany({ _id: 'testforbackendonly' });
      await db.collection('user').deleteMany({ _id: 'testforbackendonly' });
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
    const resp = await request(webapp).put(`/comments/${testcommentID}`).set('Authorization', token).send("content=notbad");
    expect(resp.status).toEqual(201);
    expect(resp.type).toBe('application/json');

    // the database was updated
    const updatedcomment = await db.collection('comments').findOne({ _id: ObjectId(testcommentID) });
    // console.log( `!!!!${JSON.stringify(updatedPost)}`)
    expect(updatedcomment.content).toEqual('notbad');
  });

  test('missing 404', async () => {
    res = await request(webapp)
      .put(`/comments/1`)
      .set('Authorization', token)
      .send('ha');
    expect(res.status).toEqual(404);
  });
})