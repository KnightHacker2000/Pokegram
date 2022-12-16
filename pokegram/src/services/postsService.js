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
  // console.log(postId);
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
    pos.users,
    pos.hide
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
      pos.users,
      pos.hide
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
    // console.log(pos);
    if (pos.hide === false) {
      const newPost = new Posts(
        pos._id,
        pos.username,
        new Date(pos.timestamp),
        pos.type,
        pos.content_url,
        pos.numLike,
        pos.description,
        pos.commentRefs,
        pos.users,
        pos.hide
      );
      return newPost;
    }
    return null;
  });
  // console.log(postsLst);
  const results = postsLst.filter((element) => element !== null);
  return results;
};

/**
 * register user API endpoint
 * @param none
*/
const createPost = async (body) => {
  const jsonbody = JSON.parse(body);
  const response = await client.post(`${API.POSTS}`, jsonbody);
  return response;
};

const uploadtoS3 = async (body) => {
  // console.log('entered uploadtoS3 front-to-backend');
  const formData = new FormData();
  formData.append(`${body.name}`, body);
  // console.log(...formData);
  const res = await client.posts3(`${API.POSTS}/uploads3`, formData);
  /*
  const res = await axios.post(
    'http://localhost:8080/posts/uploads3',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: (sessionStorage.getItem('app-token') !== null) ?
         sessionStorage.getItem('app-token') : null
      }
    }
  ).then((response) => response.data)
    .catch((error) => {
      reAuthenticate(error);
      throw (error);
    });
  */
  return res;
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
  deletePost,
  uploadtoS3
};
