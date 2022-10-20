import PokemonClient from '../client';
import API from '../endpoints';
import Posts from '../models/post';

// const UserService = async () => {
const client = new PokemonClient();

/**
 * post API endpoint
 * @param userId: user id/ username
*/
const getPostsById = async (userId) => {
  const response = await client.get(`${API.POSTS}/${userId.userId}`);
  // const posts = response.posts;
  const postsLst = response.map((pos) => {
    const newPost = new Posts(
      pos.id,
      pos.username,
      new Date(pos.timestamp),
      pos.content_url,
      pos.type,
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
  const response = await client.get(`${API.POSTS}`);
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

export default {
  getPostsById,
  getAllPosts,
  createPost
};
