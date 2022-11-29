const { ObjectId } = require('mongodb');
const dbop = require('../db');

let db = null;

const getCommentById = async (CommentId) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const comment = await db.collection('comments').findOne({ _id: new ObjectId(CommentId) });
    console.log(comment);
    return comment;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const getCommentByPostId = async (postId) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const comments = await db.collection('comments').find({ postId: new ObjectId(postId) }).toArray();
    console.log(comments);
    return comments;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const getAllcomments = async () => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const comments = await db.collection('comments').find({}).toArray();
    console.log(comments);
    return comments;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const createComment = async (newComment) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('comments').insertOne(newComment);
    console.log(`Created Comment with id: ${res.insertedId}`);
    return res.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

const updateCommentById = async (commentId, updateFields) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    console.log(updateFields);
    const res = await db.collection('comments').updateOne({ _id: new ObjectId(commentId) }, { $set: updateFields }); // add or replace field
    console.log(res);
    if (res.matchedCount === 1) {
      const newComment = await db.collection('comments').find({ _id: new ObjectId(commentId) }).toArray();
      return newComment[0];
    }
    if (res.matchedCount === 0) {
      throw new Error('Unable to match Comment record');
    }
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
  return null;
};

const deleteCommentById = async (commentId) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) });
    if (res.deletedCount === 1) {
      return;
    }
    if (res.deletedCount === 0) {
      throw new Error('Unable to match Comment record');
    }
  } catch (err) {
    console.log(`error: ${(err.message)}`);
    throw new Error(err);
  }
};

module.exports = {
  getCommentById,
  getCommentByPostId,
  getAllcomments,
  createComment,
  updateCommentById,
  deleteCommentById,
};

/*
// main function to execute our code
const main = async () => {
  const conn = await connect();
  const updatefileds = {referredUser: []}
  await getCommentById(conn, '63867ae4243c537d59e65b69');
  await updateCommentById(conn,'63867ae4243c537d59e65b69', updatefileds);
  await getCommentById(conn, '63867ae4243c537d59e65b69');
  await createComment(conn, {
    "timestamp": "November 05, 2021 14:21:00",
    "content": "I love this post again",
    "referredUser": [],
    "postId": new ObjectId('6386706ce29a26c92ba4b959')
  });
  //await deleteCommentById(conn, '6386750dfc57115176794343');
  //await getAllcomments(conn);
  //await getCommentByPostId(conn, '63866ffd7137342a8944f054');
};

main();
*/
