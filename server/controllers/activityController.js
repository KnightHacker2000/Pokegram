const actSvc = require('../services/activityService');

const getActByTarget = async (req, res) => {
  console.log('[Activity -- Getting activity by target userId]');
  try {
    if (req.params.targetId === undefined) {
      res.status(404).json({ error: 'target id missing' });
      return;
    }
    const result = await actSvc.getActivityByUsername(req.params.targetId);
    if (result === undefined) {
      console.log('[Activity -- Getting activity Failed]');
      res.status(404).json({ error: 'bad target id' });
      return;
    }
    console.log('[Activity -- Getting activity Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[Activity -- Getting activity Failed]');
    res.status(404).json({ error: err.message });
  }
};

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
    console.log('[Activity -- Creating new activity Failed: invalid body -- invalid activity type]');
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

module.exports = {
  getActByTarget,
  createNewAct,
  updateActivityById,
  deleteActivityById,
};
