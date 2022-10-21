import PokemonClient from '../client';
import API from '../endpoints';
import User from '../models/user';

// const UserService = async () => {
const client = new PokemonClient();

/**
 * login API endpoint -- generates random id
 * @param none
*/
const login = async () => {
  let id = '';
  for (let i = 0; i < 5; i += 1) {
    id += Math.floor(Math.random() * 10).toString();
  }
  // console.log(id);
  const newSession = {
    sessionId: id
  };
  // console.log(newSession);
  const response = await client.post(`${API.LOGIN}`, newSession);
  return response;
};

/**
 * register user API endpoint
 * @param none
*/
const register = async (body) => {
  const response = await client.post(`${API.USER}`, body);
  return response;
};

/**
 * user API endpoint
 * @param userId: user id/ username
*/
const getUserById = async (userId) => {
  // TODO: replace test endpoint
  // const response = await this.client.get(API.USER, userId);
  const response = await client.get(`${API.USER}/${userId.userId}`);
  const user = new User(
    response.id,
    response.email,
    response.username,
    response.avatar,
    response.numPosts,
    response.likedPosts,
    response.follows,
    response.numFollows,
    response.subscribers,
    response.numSubs,
    response.fullname
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
  user.likedPosts.splice(pIndex);
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
};

export default {
  getUserById,
  login,
  register,
  addlike,
  removeLike,
  followUser,
  unfollowUser
};
