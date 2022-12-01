import PokemonClient from '../client';
import API from '../endpoints';
import Posts from '../models/post';

// const UserService = async () => {
const client = new PokemonClient();

/**
 * post API endpoint
 * @param param: post id
*/
const getPostsById = async (param) => {
  const pos = await client.get(`${API.POSTS}/${param.postId}`);
  // const posts = response.posts;
  const newPost = new Posts(
    pos.id,
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
  const postsLst = response.map((pos) => {
    const newPost = new Posts(
      pos.id,
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
  // const posts = response.posts;
  const postsLst = response.map((pos) => {
    const newPost = new Posts(
      pos.id,
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
  // console.log(body);
  const response = await client.post(`${API.POSTS}`, body);
  return response;
};

/**
 * update post API endpoint
 * @param none
*/
const updatePost = async (body) => {
  // console.log(body);
  const response = await client.put(`${API.POSTS}/${body.id}`, body);
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
