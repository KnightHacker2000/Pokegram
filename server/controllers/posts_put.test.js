const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;

// TEST PUT ENDPOINT
describe('Update a post endpoint integration test', () => {
  let res;
  let db;
  let testpostID; // will store the id of the test post

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    res = await request(webapp).post('/posts').send('username=testforbackendonly&timestamp=Monday&type=video');
    // get the id of the test post
    // eslint-disable-next-line no-underscore-dangle
    testPostID = JSON.parse(res.text).post._id;
    // console.log(`!!!${testPostID}`);
  });

  const clearDatabase = async () => {
    try {
      await db.collection('posts').deleteMany({ username: 'testforbackendonly' });
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
    const resp = await request(webapp).put(`/posts/${testPostID}`).send("type=photo");
    expect(resp.status).toEqual(201);
    expect(resp.type).toBe('application/json');

    // the database was updated
    const updatedPost = await db.collection('posts').findOne({ _id: ObjectId(testPostID) });
    // console.log( `!!!!${JSON.stringify(updatedPost)}`)
    expect(updatedPost.type).toEqual('photo');
  });

  test('missing major 404', async () => {
    res = await request(webapp).put(`/posts/${testpostID}`)
      .send('name=music');
    expect(res.status).toEqual(404);
  });
})