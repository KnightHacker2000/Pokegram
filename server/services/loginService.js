const { ObjectId } = require('mongodb');

const dbop = require('../db');

let db = null;

const createNewSession = async () => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    let id = '';
    for (let i = 0; i < 5; i += 1) {
      id += Math.floor(Math.random() * 10).toString();
    }
    // console.log(id);
    const newSession = {
      sessionId: id,
    };
    const res = await db.collection('session').insertOne(newSession);
    newSession.id = res.insertedId;
    return newSession;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

const authenticate = async (id, password) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    const res = await db.collection('cred').find({ _id: id, pass: password }).toArray();
    if (res.length === 0) {
      throw new Error('Not Found');
    }
    return;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

const deleteSessionById = async (id) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('session').deleteOne({ _id: new ObjectId(id) }); // delete by id
    if (res.deletedCount === 1) {
      console.log(res);
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

const clearSessions = async () => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    await db.collection('session').deleteMany({}); // delete by id
    return;
  } catch (err) {
    console.log(`error: ${(err.message)}`);
    throw new Error(err);
  }
};

module.exports = {
  createNewSession,
  deleteSessionById,
  clearSessions,
  authenticate,
};
