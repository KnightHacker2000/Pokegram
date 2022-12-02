const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;
describe('GET posts endpoint integration test', () => {
  /**
 * If you get an error with afterEach
 * inside .eslintrc.json in the
 * "env" key add -'jest': true-
*/
  let db;
  let testPostID;
  
  const testPost = { username: 'testforbackendonly', timestamp: 'Monday', type: 'video' };

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const res = await request(webapp).post('/posts').send('username=testforbackendonly&timestamp=Monday&type=video');
    // eslint-disable-next-line no-underscore-dangle
    // console.log(res._body.post);
    testPostID = res._body.post._id;
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('posts').deleteMany({ username: 'testforbackendonly' });
      const { deletedCount } = result;
      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test Post');
      } else {
        console.log('warning', 'test Post was not deleted');
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

  
  test('Get all Posts endpoint status code and data', async () => {
    const resp = await request(webapp).get('/posts/all/t');
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const studArr = JSON.parse(resp.text).data;
    // expect(studArr).toEqual(expect.arrayContaining([{ _id: testPostID, ...testPost }]));
  });
  
  test('Get a Post endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/posts/${testPostID}`);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const studArr = JSON.parse(resp.text).data;
    // testPost is in the response
    // expect(studArr).toMatchObject({ _id: testPostID, ...testPost });
  });

  test('user not in db status code 404', async () => {
    const resp = await request(webapp).get('/posts/1');
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});