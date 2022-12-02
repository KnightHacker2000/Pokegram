const commentSvc = require('../services/commentService');

const getCommentById = async (req, res) => {
  console.log('[Comment -- Getting comment by id]');
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'comment id missing' });
      return;
    }
    const result = await commentSvc.getCommentById(req.params.id);
    if (result === undefined || result === null) {
      console.log('[Comment -- Getting Comment Failed]');
      res.status(404).json({ error: 'bad post id' });
      return;
    }
    console.log('[Comment -- Getting Comment Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Comment -- Getting Comment Failed]');
    res.status(404).json({ error: err.message });
  }
};

const getCommentByPostId = async (req, res) => {
  console.log('[Comment -- Getting Comment by PostId]');
  try {
    if (req.params.postid === undefined) {
      res.status(404).json({ error: 'PostId missing' });
      return;
    }
    const result = await commentSvc.getCommentByPostId(req.params.postid);
    if (result === undefined || result === null) {
      console.log('[Comment -- Getting Comment Failed]');
      res.status(404).json({ error: 'post has no Comment' });
      return;
    }
    console.log('[Comment -- Getting Comment Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Comment -- Getting Comment Failed]');
    res.status(404).json({ error: err.message });
  }
};

const createComment = async (req, res) => {
  console.log('[Comment -- Creating new Comment]');
  if (
    !req.body.postId
    || !req.body.timestamp
    || !req.body.content
    || !req.body.commentorid
  ) {
    console.log('[Comment -- Creating new Comment Failed: invalid body -- missing fields]');
    res.status(404).json({ error: 'missing required Comment field!' });
    return;
  }
  try {
    const result = await commentSvc.createComment(req.body);
    console.log('[Comment -- creating Comment Success]');
    console.log(result);
    res.status(201).json({
      activity: result,
    });
    return;
  } catch (err) {
    console.log('[Comment -- creating Comment Failed]');
    res.status(404).json({ error: err.message });
  }
};

const updateCommentById = async (req, res) => {
  console.log('[Comment -- Updating Comment]');
  try {
    const result = await commentSvc.updateCommentById(req.params.id, req.body);
    console.log('[Comment -- Updating Comment Success]');
    console.log(result);
    res.status(201).json({
      activity: result,
    });
    return;
  } catch (err) {
    console.log('[Comment -- Updating Comment Failed]');
    res.status(404).json({ error: err.message });
  }
};

const deleteCommentById = async (req, res) => {
  console.log('[Comment -- Deleting Comment]');
  try {
    await commentSvc.deleteCommentById(req.params.id);
    console.log('[Comment -- Deleting Comment Success]');
    res.status(200).json({
      message: 'delete success!',
    });
    return;
  } catch (err) {
    console.log('[Comment -- Deleting Comment Failed]');
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getCommentById,
  getCommentByPostId,
  createComment,
  updateCommentById,
  deleteCommentById,
};
