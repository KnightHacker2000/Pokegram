/* eslint-disable no-underscore-dangle */
import PokemonClient from '../client';
import API from '../endpoints';
import Posts from '../models/post';

// const UserService = async () => {
const client = new PokemonClient();

/**
 * post API endpoint
 * @param param: post id
*/
const getPostsById = async (postId) => {
  console.log(postId);
  const response = await client.get(`${API.POSTS}/${postId}`);
  const pos = response.data;
  // const posts = response.posts;
  const newPost = new Posts(
    pos._id,
    pos.username,
    new Date(pos.timestamp),
    pos.type,
    pos.content_url,
    pos.numLike,
    pos.description,
    pos.commentRefs,
    pos.users
  );
  return newPost;
};

/**
 * post API endpoint
 * @param userId: user id/ username
*/
const getPostsByUserName = async (userName) => {
  const response = await client.get(`${API.POSTS}/user/${userName}`);
  // const posts = response.posts;
  const postsLst = response.data.map((pos) => {
    const newPost = new Posts(
      pos._id,
      pos.username,
      new Date(pos.timestamp),
      pos.type,
      pos.content_url,
      pos.numLike,
      pos.description,
      pos.commentRefs,
      pos.users
    );
    return newPost;
  });
  return postsLst;
};

/**
 * post API endpoint
*/
const getAllPosts = async () => {
  const response = await client.get(`${API.POSTS}/all/t`);
  // console.log(response);
  // const posts = response.posts;
  const postsLst = response.data.map((pos) => {
    const newPost = new Posts(
      pos._id,
      pos.username,
      new Date(pos.timestamp),
      pos.type,
      pos.content_url,
      pos.numLike,
      pos.description,
      pos.commentRefs,
      pos.users
    );
    return newPost;
  });
  return postsLst;
};

/**
 * register user API endpoint
 * @param none
*/
const createPost = async (body) => {
  const response = await client.post(`${API.POSTS}`, JSON.parse(body));
  return response;
};

/**
 * update post API endpoint
 * @param none
*/
const updatePost = async (pid, body) => {
  // console.log(body);
  const response = await client.put(`${API.POSTS}/${pid}`, JSON.parse(body));
  return response;
};

/**
 * delete post API endpoint
 * @param id
*/
const deletePost = async (postId) => {
  // console.log(body);
  const response = await client.delete(`${API.POSTS}/${postId}`);
  return response;
};

export default {
  getPostsById,
  getPostsByUserName,
  getAllPosts,
  createPost,
  updatePost,
  deletePost
};
