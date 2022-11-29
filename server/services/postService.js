const { ObjectId } = require('mongodb');
const dbop = require('../db');

let db = null;

const getPostById = async (postId) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });
    // console.log(post);
    return post;
  } catch (err) {
    // console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const getPostByUsername = async (userName) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    console.log(userName);
    const posts = await db.collection('posts').find({ username: userName }).toArray();
    console.log(posts);
    return posts;
  } catch (err) {
    // console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const getAllPosts = async () => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const posts = await db.collection('posts').find({}).toArray();
    console.log(posts);
    return posts;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err.message);
  }
};

const createPost = async (newPost) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('posts').insertOne(newPost);
    console.log(`Created post with id: ${res.insertedId}`);
    return res.insertedId;
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
};

const updatePostById = async (postId, updateFields) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('posts').updateOne({ _id: new ObjectId(postId) }, { $set: updateFields }); // add or replace field
    console.log(res);
    if (res.matchedCount === 1) {
      const newPost = await db.collection('posts').find({ _id: new ObjectId(postId) }).toArray();
      return newPost[0];
    }
    if (res.matchedCount === 0) {
      throw new Error('Unable to match post record');
    }
  } catch (err) {
    console.log(`error: ${err.message}`);
    throw new Error(err);
  }
  return null;
};

const deletePostById = async (postId) => {
  try {
    if (!db) {
      db = dbop.getDB();
    }
    const res = await db.collection('posts').deleteOne({ _id: new ObjectId(postId) });
    if (res.deletedCount === 1) {
      return;
    }
    if (res.deletedCount === 0) {
      throw new Error('Unable to match post record');
    }
  } catch (err) {
    console.log(`error: ${(err.message)}`);
    throw new Error(err);
  }
};

module.exports = {
  getPostById,
  getPostByUsername,
  getAllPosts,
  createPost,
  updatePostById,
  deletePostById,
};

/*
// main function to execute our code
const main = async () => {
  const conn = await connect();
  //const updatefileds = {commentRefs : []}
  //await getPostById(conn, '63866ffd7137342a8944f054');
  //await updatePostById(conn,'63866ffd7137342a8944f054', updatefileds);
  //await getPostById(conn, '63866ffd7137342a8944f054');
  //await createPost(conn, {});
  await deletePostById(conn, '6386750dfc57115176794343');
  await getAllPosts(conn);

  // posts = await getAllPosts(conn);
  // console.log(posts)
  // addStudent(conn, { name: 'Rachel', major: 'history', email: 'rara@upenn.edu' });
  // await getAllStudents(conn);
  // await getAStudent(conn, '635ad18f799a7c5d0c89d320');
  // await updateStudent(conn, '635ad18f799a7c5d0c89d320', 'CIS');
  // await deleteStudent(conn, '635ad18f799a7c5d0c89d320');
};

main();
*/
