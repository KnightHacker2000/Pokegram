// const { ObjectId } = require('mongodb');
const dbop = require('../db');

let db = null;

const getUserById = async (uid) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const usrList = await db.collection('user').find({ _id: uid }).toArray();
    if (usrList.length === 0) {
      throw new Error('No user found given username!');
    }
    return usrList;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const createNewUser = async (newUser) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    const res = await db.collection('user').insertOne(newUser);
    return res;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

const updateUserById = async (id, updateFields) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    const res = await db.collection('user').updateOne({ _id: id }, { $set: updateFields }); // add or replace field
    return res;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

module.exports = {
  createNewUser,
  updateUserById,
  getUserById,
};
