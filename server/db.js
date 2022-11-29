// Import MongoDB module
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; 

const url = 'mongodb+srv://musicloud0105:2KkZe29akcojjwKN@cluster0.x6ygpvj.mongodb.net/pokegram?retryWrites=true&w=majority';
let db = null

const connect = async () => {
  try {
    const tmp = (await MongoClient.connect(url, 
      { useNewUrlParser: true, useUnifiedTopology: true })).db();
    // Connected to db
    console.log(`Connected to database: ${tmp.databaseName}`);
    db = tmp
    return tmp;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const getDB = () => {
  return db;
}

const addDummyData = async (db) => {
  try{
      // add activity collection with data
      const hasActCol = await db.listCollections({ name: 'activity' }).hasNext();
      if(!hasActCol) {
        await db.createCollection('activity');
        const dumActivities = [
          {
            "initiatorId": "Reneee",
            "targetId": "Charlie",
            "activityType": "Comment",
            "timestamp": "December 16, 2021 03:24:00"
          },
          {
            "initiatorId": "shuyany",
            "targetId": "Charlie",
            "activityType": "Follow",
            "timestamp": "December 17, 2021 03:24:00"
          },
          {
            "initiatorId": "Reneee",
            "targetId": "Charlie",
            "activityType": "Unfollow",
            "timestamp": "December 18, 2021 03:24:00"
          },
          {
            "initiatorId": "shuyany",
            "targetId": "Charlie",
            "activityType": "Like",
            "timestamp": "December 18, 2021 03:24:00"
          },
        ];
        const res = db.collection('activity').insertMany(dumActivities);
        return res;
      } else {
        return { message: "collection already exists" };
      }

      // add user collection with data
      // const hasUsrCol = await db.listCollections({ name: 'user' }).hasNext();
      // if(!hasUsrCol) {
      //   await db.createCollection('user');
      //   const dumUsers = [
      //     {
      //       "initiatorId": "Reneee",
      //       "targetId": "Charlie",
      //       "activityType": "Comment",
      //       "timestamp": "December 16, 2021 03:24:00"
      //     },
      //     {
      //       "initiatorId": "shuyany",
      //       "targetId": "Charlie",
      //       "activityType": "Follow",
      //       "timestamp": "December 17, 2021 03:24:00"
      //     },
      //     {
      //       "initiatorId": "Reneee",
      //       "targetId": "Charlie",
      //       "activityType": "Unfollow",
      //       "timestamp": "December 18, 2021 03:24:00"
      //     },
      //     {
      //       "initiatorId": "shuyany",
      //       "targetId": "Charlie",
      //       "activityType": "Like",
      //       "timestamp": "December 18, 2021 03:24:00"
      //     },
      //   ];
      //   const res = db.collection('activity').insertMany(dumActivities);
      //   return res;
      // } else {
      //   return { message: "collection already exists" };
      // }
  } catch(err){
    console.log(`error: ${err.message}`);
    throw new Error('Error adding dummy data');
  }
};

// const getActivityByUsername = async (db, username) => {
//   try {
//     const actList = await db.collection('activity').find({targetId: username}).toArray();
//     return actList;
//   } catch(err){
//     console.log(`error: ${err.message}`);
//     throw new Error(err.message);
//   }
// };

// const createActivity = async (db, newActivity) => {
//   try {
//     const res = await db.collection('activity').insertOne(newActivity);
//     // console.log(`Created activity with id: ${res.insertedId}`);
//     return res.insertedId;
//   } catch (err) {
//     console.log(`error: ${err.message}`);
//     throw new Error(err);
//   }
// };

// const updateActivityById = async (db, id, updateFields) => {
//   try {
//     const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)}, { $set: updateFields}); // add or replace field
//     // const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)}, { $unset: {'testSomething.two': ''}}); // Remove field, value doesn't matter
//     // const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)}, { $push: {'testField': 4}}); // add to array field with push
//     // const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)}, { $pull: {'testField': '12'}}); // remove from array field with pull
//     if(res.matchedCount == 1) {
//       const newAct = await db.collection('activity').find({"_id": new ObjectId(id)}).toArray();
//       return newAct[0];
//     }
//     if(res.matchedCount == 0) {
//       throw new Error('Unable to match activity record');
//     }
//   } catch (err) {
//     console.log(`error: ${err.message}`);
//     throw new Error(err);
//   }
// };

// const deleteActivityById = async (db, id) => {
//   try {
//     const res = await db.collection('activity').deleteOne({"_id": new ObjectId(id)}); // delete by id
//     if(res.deletedCount == 1) {
//       return;
//     }
//     if(res.deletedCount == 0) {
//       throw new Error('Unable to match activity record');
//     }
//   } catch (err) {
//     console.log(`error: ${(err.message)}`);
//     throw new Error(err);
//   }
// };

module.exports = {
  getDB,
  connect,
  addDummyData,
  createActivity,
  updateActivityById,
  deleteActivityById
};