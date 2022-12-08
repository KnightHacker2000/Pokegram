/* eslint-disable no-underscore-dangle */
import PokemonClient from '../client';
import API from '../endpoints';
import Activity from '../models/activity';
import User from '../models/user';
import activityService from './activityService';

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
  // console.log(`${API.SUG}/${UID}`);
  const response = await client.get(`${API.SUG}/${UID}`);
  return response;
};

/**
 * user API endpoint
 * @param userId: user id/ username
*/
const getUserById = async (userId) => {
  // TODO: replace test endpoint
  // const response = await this.client.get(API.USER, userId);
  // console.log(userId);
  const response = await client.get(`${API.USER}/${userId.userId}`);
  const userRes = response.data[0];
  // console.log(userRes);
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

const updateUser = async (id, body) => {
  // TODO: replace test endpoint
  // const response = await this.client.get(API.USER, userId);
  // console.log(userId);
  const response = await client.put(`${API.USER}/${id}`, body);
  return response;
};

/**
 * user-like API endpoint
 * @param user: user object
 * @param postId: user liked post
*/
const addlike = async (user, postId, targetUser) => {
  user.likedPosts.push(postId);
  const response = await client.put(`${API.USER}/${user.id}`, user);
  const tmpAct = new Activity();
  tmpAct.initiatorId = user.id;
  tmpAct.targetId = targetUser;
  tmpAct.activityType = 'Like';
  tmpAct.timestamp = Date.now();
  await activityService.createActivity(JSON.stringify(tmpAct));
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
const followUser = async (currentUser, targetUser) => {
  const user = currentUser;
  user.follows.push(targetUser.id);
  user.numFollows += 1;
  await client.put(`${API.USER}/${user.id}`, user);

  const newTargetUser = targetUser;
  newTargetUser.subscribers.push(currentUser.id);
  newTargetUser.numSubs += 1;
  await client.put(`${API.USER}/${newTargetUser.id}`, newTargetUser);

  const tmpAct = new Activity();
  tmpAct.initiatorId = currentUser.id;
  tmpAct.targetId = targetUser.id;
  tmpAct.activityType = 'Follow';
  tmpAct.timestamp = Date.now();
  await activityService.createActivity(JSON.stringify(tmpAct));
  // TODO: handle response
  return user;
};

/**
 * user-unfollow API endpoint
 * @param currentUser: my user object
 * @param targetId: user I unfollowed
*/
const unfollowUser = async (currentUser, targetUser) => {
  const user = currentUser;
  const tarIndex = user.follows.indexOf(targetUser.id);
  user.follows.splice(tarIndex, 1);
  user.numFollows -= 1;
  await client.put(`${API.USER}/${user.id}`, user);

  const newTargetUser = targetUser;
  const subIndex = targetUser.subscribers.indexOf(currentUser.id);
  newTargetUser.subscribers.splice(subIndex, 1);
  newTargetUser.numSubs -= 1;
  await client.put(`${API.USER}/${newTargetUser.id}`, targetUser);

  const tmpAct = new Activity();
  tmpAct.initiatorId = currentUser.id;
  tmpAct.targetId = targetUser.id;
  tmpAct.activityType = 'Unfollow';
  tmpAct.timestamp = Date.now();
  await activityService.createActivity(JSON.stringify(tmpAct));
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
  getFoSug,
  updateUser
};
