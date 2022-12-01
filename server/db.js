// Import MongoDB module
const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb+srv://musicloud0105:2KkZe29akcojjwKN@cluster0.x6ygpvj.mongodb.net/pokegram?retryWrites=true&w=majority';
let dbCon = null;
let MongoConnection;

const connect = async () => {
  try {
    MongoConnection = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ));
    // Connected to db
    console.log(`Connected to database: ${MongoConnection.db().databaseName}`);
    dbCon = MongoConnection.db();
    return MongoConnection;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

const getDB = () => dbCon;

const addDummyData = async (db) => {
  const res = [];
  try {
    // add activity collection with data
    const hasActCol = await db.listCollections({ name: 'activity' }).hasNext();
    if (!hasActCol) {
      await db.createCollection('activity');
      const dumActivities = [
        {
          initiatorId: 'Reneee',
          targetId: 'Charlie',
          activityType: 'Comment',
          timestamp: 'December 16, 2021 03:24:00',
        },
        {
          initiatorId: 'shuyany',
          targetId: 'Charlie',
          activityType: 'Follow',
          timestamp: 'December 17, 2021 03:24:00',
        },
        {
          initiatorId: 'Reneee',
          targetId: 'Charlie',
          activityType: 'Unfollow',
          timestamp: 'December 18, 2021 03:24:00',
        },
        {
          initiatorId: 'shuyany',
          targetId: 'Charlie',
          activityType: 'Like',
          timestamp: 'December 18, 2021 03:24:00',
        },
      ];
      const actRes = db.collection('activity').insertMany(dumActivities);
      res.push(actRes);
    }

    // add user collection with data
    const hasUsrCol = await db.listCollections({ name: 'user' }).hasNext();
    if (!hasUsrCol) {
      await db.createCollection('user');
      const dumUsers = [
        {
          _id: 'Charlie',
          email: 'charlie@hotmail.com',
          avatar: '../../images/pikachu.jpg',
          numPosts: 0,
          likedPosts: [],
          follows: [
            'Reneee',
            'shuyany',
          ],
          numFollows: 2,
          subscribers: [
            'Reneee',
          ],
          numSubs: 1,
          fullname: 'Charlie Cheng',
        },
        {
          _id: 'Reneee',
          email: 'Shuyan@hotmail.com',
          avatar: '../../images/pikachu.jpg',
          numPosts: 0,
          likedPosts: [],
          follows: [
            'Charlie',
          ],
          numFollows: 1,
          subscribers: [
            'Charlie',
          ],
          numSubs: 1,
          fullname: 'Reneee Yu',
        },
        {
          _id: 'shuyany',
          email: 'reneeamao@hotmail.com',
          avatar: '../../images/pikachu.jpg',
          numPosts: 0,
          likedPosts: [],
          follows: [],
          numFollows: 0,
          subscribers: [
            'Charlie',
          ],
          numSubs: 1,
          fullname: 'Rachel Yuan',
        },
      ];
      const usrRes = db.collection('user').insertMany(dumUsers);
      res.push(usrRes);
    }

    // add session collection with NO data
    const hasSesCol = await db.listCollections({ name: 'session' }).hasNext();
    if (!hasSesCol) {
      await db.createCollection('session');
    }

    if (res.length === 0) {
      return { message: 'collections already exists' };
    }
    return res;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error('Error adding dummy data');
  }
};

module.exports = {
  getDB,
  connect,
  addDummyData,
  closeMongoDBConnection,
};
