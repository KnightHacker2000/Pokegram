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

const getFoSug = async (uid) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    let currUser = await db.collection('user').find({ _id: uid }).toArray();
    if (currUser.length === 0) {
      throw new Error('Invalid username!');
    }
    currUser = currUser[0]
    const myFoSet = new Set(currUser.follows)
    const foSug = []
    if (myFoSet.size < 3) {
      return foSug;
    }
    const allUsers = await db.collection('user').find({_id: {$ne: uid}}).toArray();
    // console.log(allUsers);
    console.log(myFoSet);
    for (user of allUsers) {
      if (myFoSet.has(user._id)) {
        // console.log('already has '+user._id);
        continue;
      }
      let matched = 0
      for (fo of user.follows) {
        // console.log(fo);
        if (myFoSet.has(fo)) {
          // console.log('matched');
          matched += 1;
          if (matched >= 3) {
            foSug.push(user._id);
            break;
          }
        }
        // console.log('notmatched');
      }
    }

    return foSug;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const createNewUser = async (newUser, cred) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    const res = await db.collection('user').insertOne(newUser);
    await db.collection('cred').insertOne(cred);
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
  getFoSug
};
