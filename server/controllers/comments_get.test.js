const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../db');
const webapp = require('../server');

let mongo;
describe('GET comments endpoint integration test', () => {
  let db;
  let testcommentID;
  let token;
  
  const testcomment = { postId: '63866ffd7137342a8944f054', timestamp: 'testMonday', content: 'greatwork', commentorid: 'Reneee' };

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
    const user = await request(webapp)
      .post('/user')
      .send('id=testforbackendonly&email=test@hotmail.com&fullname=testha&password=testtesttest');
    token = JSON.parse(user.text).token;
    const res = await request(webapp)
      .post('/comments')
      .set('Authorization', token)
      .send('postId=63866ffd7137342a8944f054&timestamp=testMonday&content=greatwork&commentorid=Reneee');
    // eslint-disable-next-line no-underscore-dangle
    // console.log(res._body.comment);
    testcommentID = JSON.parse(res.text).activity;
    // console.log(`!!!${res.text}`);
  });

  const clearDatabase = async () => {
    try {
      const result = await db.collection('comments').deleteMany({ timestamp: 'testMonday' });
      await db.collection('cred').deleteMany({ _id: 'testforbackendonly' });
      await db.collection('user').deleteMany({ _id: 'testforbackendonly' });
      const { deletedCount } = result;
      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted test comment');
      } else {
        console.log('warning', 'test comment was not deleted');
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

  
  test('Get comments by postid endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/comments/post/63866ffd7137342a8944f054`).set('Authorization', token);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const studArr = JSON.parse(resp.text).data;
    // expect(studArr).toEqual(expect.arrayContaining([{ _id: testcommentID, ...testcomment }]));
  });
  
  test('Get a comment endpoint status code and data', async () => {
    const resp = await request(webapp).get(`/comments/${testcommentID}`).set('Authorization', token);
    expect(resp.status).toEqual(200);
    expect(resp.type).toBe('application/json');
    // const studArr = JSON.parse(resp.text).data;
    // testcomment is in the response
    // expect(studArr).toMatchObject({ _id: testcommentID, ...testcomment });
  });

  test('comment not in db status code 404', async () => {
    const resp = await request(webapp).get('/comments/1').set('Authorization', token);
    expect(resp.status).toEqual(404);
    expect(resp.type).toBe('application/json');
  });
});