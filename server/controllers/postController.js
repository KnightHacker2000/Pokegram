const postSvc = require('../services/postService');

const getPostByPostId = async (req, res) => {
  console.log('[Post -- Getting post by post id]');
  try {
    if (req.params.postId === undefined) {
      res.status(404).json({ error: 'post id missing' });
      return;
    }
    const result = await postSvc.getPostById(req.params.postId);
    if (result === undefined || result === null) {
      console.log('[Post -- Getting Post Failed]');
      res.status(404).json({ error: 'bad post id' });
      return;
    }
    console.log('[Post -- Getting Post Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Post -- Getting Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

const getPostByUsername = async (req, res) => {
  console.log('[Post -- Getting post by username]');
  try {
    if (req.params.username === undefined) {
      res.status(404).json({ error: 'username missing' });
      return;
    }
    const result = await postSvc.getPostByUsername(req.params.username);
    if (result === undefined || result === null) {
      console.log('[Post -- Getting Post Failed]');
      res.status(404).json({ error: 'user has no posts' });
      return;
    }
    console.log('[Post -- Getting Post Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Post -- Getting Post Failed]');
    res.status(404).json({ error: err.message });
  }
};

const createNewPost = async (req, res) => {
  console.log('[Activity -- Creating new activity]');
  if (
    !req.body.username
    || !req.body.timestamp
    || !req.body.type
    || !req.body.content_url
    || !req.body.numLike
    || !req.body.description
    || !req.body.commentRefs
    || !req.body.users
  ) {
    console.log('[Activity -- Creating new activity Failed: invalid body -- missing fields]');
    res.status(404).json({ error: 'missing required activity field!' });
    return;
  }
  const legalActType = ['Comment', 'Follow', 'Unfollow', 'Like'];
  if (!legalActType.includes(req.body.activityType)) {
    console.log('[Activity -- Creating new activity Failed: invalid body --invalid activity type]');
    res.status(400).json({ error: `${req.body.activityType} is NOT a valid activity type!` });
    return;
  }
  // create new activity object
  const newAct = {
    initiatorId: req.body.initiatorId,
    targetId: req.body.targetId,
    activityType: req.body.activityType,
    timestamp: req.body.timestamp,
  };
  try {
    const result = await postSvc.createActivity(newAct);
    console.log('[Activity -- Creating new activity Success]');
    console.log(`id: ${JSON.stringify(result)}`);
    // add id to new activity and return it
    res.status(201).json({
      activity: { id: result, ...newAct },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log('[Activity -- Creating new activity Failed]');
  }
};

/*
const createNewAct = async (req, res) => {
  console.log('[Activity -- Creating new activity]');
  if (
    !req.body.initiatorId
    || !req.body.targetId
    || !req.body.activityType
    || !req.body.timestamp) {
    console.log('[Activity -- Creating new activity Failed: invalid body -- missing fields]');
    res.status(404).json({ error: 'missing required activity field!' });
    return;
  }
  const legalActType = ['Comment', 'Follow', 'Unfollow', 'Like'];
  if (!legalActType.includes(req.body.activityType)) {
    console.log('[Activity -- Creating new activity Failed: invalid body --
       invalid activity type]');
    res.status(400).json({ error: `${req.body.activityType} is NOT a valid activity type!` });
    return;
  }
  // create new activity object
  const newAct = {
    initiatorId: req.body.initiatorId,
    targetId: req.body.targetId,
    activityType: req.body.activityType,
    timestamp: req.body.timestamp,
  };
  try {
    const result = await actSvc.createActivity(newAct);
    console.log('[Activity -- Creating new activity Success]');
    console.log(`id: ${JSON.stringify(result)}`);
    // add id to new activity and return it
    res.status(201).json({
      activity: { id: result, ...newAct },
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log('[Activity -- Creating new activity Failed]');
  }
};

const updateActivityById = async (req, res) => {
  console.log('[Activity -- Updating activity]');
  try {
    const result = await actSvc.updateActivityById(req.params.actId, req.body);
    console.log('[Activity -- Updating activity Success]');
    console.log(result);
    res.status(201).json({
      activity: result,
    });
    return;
  } catch (err) {
    console.log('[Activity -- Updating activity Failed]');
    res.status(404).json({ error: err.message });
  }
};

const deleteActivityById = async (req, res) => {
  console.log('[Activity -- Deleting activity]');
  try {
    await actSvc.deleteActivityById(req.params.actId);
    console.log('[Activity -- Deleting activity Success]');
    res.status(200).json({
      message: 'delete success!',
    });
    return;
  } catch (err) {
    console.log('[Activity -- Deleting activity Failed]');
    res.status(404).json({ error: err.message });
  }
};
*/

module.exports = {
  getPostByPostId,
  getPostByUsername,
  createNewPost,
};
