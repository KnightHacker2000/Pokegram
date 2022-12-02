/* eslint-disable no-underscore-dangle */
import PokemonClient from '../client';
import API from '../endpoints';
import Activity from '../models/activity';
import Comments from '../models/comment';
import activityService from './activityService';
import postsService from './postsService';

const client = new PokemonClient();

/**
 * post API endpoint
 * @param postId: postId
*/
const getCommentBypostId = async (postId) => {
  console.log('entered get comment by postid');
  const response = await client.get(`${API.COMMENTS}/post/${postId}`);
  // const data = response.filter((comm) => comm.postId === postId);
  // console.log(data);
  const commentsLst = response.data.map((comment) => {
    const newComment = new Comments(
      comment._id,
      comment.postId,
      new Date(comment.timestamp),
      comment.content,
      comment.referredUser,
      comment.commentorid
    );
    // console.log(newComment);
    return newComment;
  });
  console.log(commentsLst);
  return commentsLst;
};

/**
 * create comment API endpoint
 * @param none
*/
const createComment = async (body) => {
  console.log(JSON.parse(body));
  const response = await client.post(`${API.COMMENTS}`, JSON.parse(body));
  const newBody = JSON.parse(body);
  const post = await postsService.getPostsById(newBody.postId);
  const tmpAct = new Activity();
  tmpAct.initiatorId = newBody.commentorid;
  tmpAct.targetId = post.username;
  tmpAct.activityType = 'Comment';
  tmpAct.timestamp = Date.now();
  await activityService.createActivity(JSON.stringify(tmpAct));
  return response;
};

const updateComment = async (cid, body) => {
  // console.log(body);
  const response = await client.put(`${API.COMMENTS}/${cid}`, JSON.parse(body));
  return response;
};

/**
 * delete comment API endpoint
 * @param id
*/
const deleteComment = async (commentId) => {
  // console.log(body);
  const response = await client.delete(`${API.COMMENTS}/${commentId}`);
  return response;
};

/**
 * post API endpoint
 * @param postId: postId
*/
const getCommentByCommentId = async (cid) => {
  const response = await client.get(`${API.COMMENTS}/${cid}`);
  const comment = response.data;
  const newComment = new Comments(
    comment._id,
    comment.postId,
    new Date(comment.timestamp),
    comment.content,
    comment.referredUser,
    comment.commentorid
  );
  // console.log(newComment);
  return newComment;
};

export default {
  getCommentBypostId,
  createComment,
  updateComment,
  deleteComment,
  getCommentByCommentId
};
