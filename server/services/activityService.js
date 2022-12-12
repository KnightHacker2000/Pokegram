const { ObjectId } = require('mongodb');
const dbop = require('../db');

let db = null;

const getActivityByUsername = async (username) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const actList = await db.collection('activity').find({ targetId: username }).toArray();
    return actList;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const createActivity = async (newActivity) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('activity').insertOne(newActivity);
    // console.log(`Created activity with id: ${res.insertedId}`);
    return res.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

// TODO: update fields (actType) value check; actId param existence check
const updateActivityById = async (id, updateFields) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('activity').updateOne({ _id: new ObjectId(id) }, { $set: updateFields }); // add or replace field
    // const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)},
    // { $unset: {'testSomething.two': ''}}); // Remove field, value doesn't matter
    // const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)},
    // { $push: {'testField': 4}}); // add to array field with push
    // const res = await db.collection('activity').updateOne({"_id": new ObjectId(id)},
    // { $pull: {'testField': '12'}}); // remove from array field with pull
    if (res.matchedCount === 1) {
      const newAct = await db.collection('activity').find({ _id: new ObjectId(id) }).toArray();
      return newAct[0];
    }
    if (res.matchedCount === 0) {
      throw new Error('Unable to match activity record');
    }
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
  return null;
};

// TODO: actId param existence check
const deleteActivityById = async (id) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('activity').deleteOne({ _id: new ObjectId(id) }); // delete by id
    if (res.deletedCount === 1) {
      return;
    }
    if (res.deletedCount === 0) {
      throw new Error('Unable to match activity record');
    }
  } catch (err) {
    console.log(`error: ${(err.message)}`);
    throw new Error(err);
  }
};

module.exports = {
  getActivityByUsername,
  createActivity,
  updateActivityById,
  deleteActivityById,
};
