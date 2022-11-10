import PokemonClient from '../client';
import API from '../endpoints';
import Comments from '../models/comment';

const client = new PokemonClient();

/**
 * post API endpoint
 * @param postId: postId
*/
const getCommentBypostId = async (postId) => {
  const response = await client.get(`${API.COMMENTS}`);
  const data = response.filter((comm) => comm.postId === postId);
  // console.log(data);
  const commentsLst = data.map((comment) => {
    const newComment = new Comments(
      comment.id,
      comment.postId,
      new Date(comment.timestamp),
      comment.content,
      comment.referredUser,
      comment.commentorid
    );
    // console.log(newComment);
    return newComment;
  });
  // console.log(commentsLst);
  return commentsLst;
};

/**
 * create comment API endpoint
 * @param none
*/
const createComment = async (body) => {
  // console.log(body);
  const response = await client.post(`${API.COMMENTS}`, body);
  return response;
};

const updateComment = async (body) => {
  // console.log(body);
  const response = await client.put(`${API.COMMENTS}/${body.id}`, body);
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
  const comment = await client.get(`${API.COMMENTS}/${cid}`);
  const newComment = new Comments(
    comment.id,
    comment.postId,
    new Date(comment.timestamp),
    comment.content,
    comment.referredUser,
    comment.commentorid
  );
  console.log(newComment);
  return newComment;
};

export default {
  getCommentBypostId,
  createComment,
  updateComment,
  deleteComment,
  getCommentByCommentId
};
