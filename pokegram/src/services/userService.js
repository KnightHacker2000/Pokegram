/* eslint-disable no-underscore-dangle */
import PokemonClient from '../client';
import API from '../endpoints';
import User from '../models/user';

// const UserService = async () => {
const client = new PokemonClient();
let currSession = null;

/**
 * login API endpoint -- generates random id
 * @param none
*/
const login = async (body) => {
  try {
    const response = await client.post(API.LOGIN, JSON.parse(body));
    currSession = response;
    return response;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

/**
 * logout API endpoint -- clear all session ids
 * @param none
*/
const logout = async () => {
  await client.delete(`${API.LOGIN}/${currSession.id}`);
  // const sessionsIdsArray = (sessions.map((session) => session.id));
  // console.log(sessionsIdsArray);
  // sessionsIdsArray.forEach(async (id) => client.delete(`${API.LOGIN}/${id}`));
  return '200';
};

/**
 * register user API endpoint
 * @param none
*/
const register = async (body) => {
  try {
    const response = await client.post(`${API.USER}`, JSON.parse(body));
    return response;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * foSug API endpoint
 * @param UID
*/
const getFoSug = async (UID) => {
  const response = await client.get(`${API.SUG_TEST}/${UID.id}`);
  return response;
};

/**
 * user API endpoint
 * @param userId: user id/ username
*/
const getUserById = async (userId) => {
  // TODO: replace test endpoint
  // const response = await this.client.get(API.USER, userId);
  console.log('in user service, getting user');
  // console.log(userId);
  const response = await client.get(`${API.USER}/${userId.userId}`);
  const userRes = response.data[0];
  console.log(userRes);
  const user = new User(
    userRes._id,
    userRes.email,
    userRes.avatar,
    userRes.numPosts,
    userRes.likedPosts,
    userRes.follows,
    userRes.numFollows,
    userRes.subscribers,
    userRes.numSubs,
    userRes.fullname
  );
  // console.log(user);
  return user;
};

/**
 * user-like API endpoint
 * @param user: user object
 * @param postId: user liked post
*/
const addlike = async (user, postId) => {
  console.log(user);
  user.likedPosts.push(postId);
  const response = await client.put(`${API.USER}/${user.id}`, user);
  return response;
};

/**
 * user-like API endpoint
 * @param user: user object
 * @param postId: user liked post
*/
const removeLike = async (user, postId) => {
  const pIndex = user.likedPosts.indexOf(postId);
  user.likedPosts.splice(pIndex, 1);
  const response = await client.put(`${API.USER}/${user.id}`, user);
  return response;
};

/**
 * user-follow API endpoint
 * @param currentUser: my user object
 * @param targetId: user I followed
*/
const followUser = async (currentUser, targetId) => {
  const user = currentUser;
  user.follows.push(targetId);
  user.numFollows += 1;
  await client.put(`${API.USER}/${user.id}`, user);

  const targetUser = await client.get(`${API.USER}/${targetId}`);
  targetUser.subscribers.push(currentUser.id);
  targetUser.numSubs += 1;
  await client.put(`${API.USER}/${targetId}`, targetUser);
  // TODO: handle response
  return user;
};

/**
 * user-unfollow API endpoint
 * @param currentUser: my user object
 * @param targetId: user I unfollowed
*/
const unfollowUser = async (currentUser, targetId) => {
  const user = currentUser;
  const tarIndex = user.follows.indexOf(targetId);
  user.follows.splice(tarIndex, 1);
  user.numFollows -= 1;
  await client.put(`${API.USER}/${user.id}`, user);

  const targetUser = await client.get(`${API.USER}/${targetId}`);
  const subIndex = targetUser.subscribers.indexOf(currentUser.id);
  targetUser.subscribers.splice(subIndex, 1);
  targetUser.numSubs -= 1;
  await client.put(`${API.USER}/${targetId}`, targetUser);
  // TODO: handle response
  return user;
};

export default {
  getUserById,
  login,
  register,
  addlike,
  removeLike,
  followUser,
  unfollowUser,
  logout,
  getFoSug
};
