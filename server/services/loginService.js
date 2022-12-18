const { ObjectId } = require('mongodb');
const { KEYS } = require('../config');;
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs')

const dbop = require('../db');

let db = null;

const createNewSession = async (id) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    const token = jwt.sign({uid: id}, KEYS.secret, {expiresIn: 300});
    return token;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

const checkPassword = async (id, password) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    const res = await db.collection('cred').find({ _id: id}).toArray();
    if (res.length === 0) {
      return false;
    }
    const val = await bcrypt.compare(password, res[0].pass);
    return val;    
  } catch (err) {
    console.log(`error: ${err}`);
    throw new Error(err);
  }
};


const authenticate = async (token) => {
  if (!db) {
    db = dbop.getDB();
  }
  try {
    console.log(token);
    if (token === null) {
      return false;
    }
    const decoded = jwt.verify(token, KEYS.secret);
    // find user name and return session token
    const res = await db.collection('user').find({ _id: decoded.uid}).toArray();
    if (res.length === 0) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(`error: ${err.message}`);
    return false;
  }
};

// const deleteSessionById = async (id) => {
//   try {
//     if (!db) {
//       db = dbop.getDB();
//     }
//     const res = await db.collection('session').deleteOne({ _id: new ObjectId(id) }); // delete by id
//     if (res.deletedCount === 1) {
//       console.log(res);
//       return;
//     }
//     if (res.deletedCount === 0) {
//       throw new Error('Unable to match activity record');
//     }
//   } catch (err) {
//     console.log(`error: ${(err.message)}`);
//     throw new Error(err);
//   }
// };

// const clearSessions = async () => {
//   try {
//     if (!db) {
//       db = dbop.getDB();
//     }
//     await db.collection('session').deleteMany({}); // delete by id
//     return;
//   } catch (err) {
//     console.log(`error: ${(err.message)}`);
//     throw new Error(err);
//   }
// };

module.exports = {
  createNewSession,
  // deleteSessionById,
  // clearSessions,
  checkPassword,
  authenticate,
};
