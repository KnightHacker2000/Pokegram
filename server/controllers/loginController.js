const loginSvc = require('../services/loginService');

const authAndSession = async (req, res) => {
  console.log('[Login -- Authenticating and creating new user session]');
  try {
    // check if body is legal
    if (
      !req.body.id
      || !req.body.password) {
      console.log('[Login -- Authentication Failed: invalid body -- missing fields]');
      res.status(404).json({ error: 'missing required credential field!' });
      return;
    }

    // TODO: remove explicitly passed password
    await loginSvc.authenticate(req.body.id, req.body.password);
    const result = await loginSvc.createNewSession();
    console.log('[Login -- Authenticating and creating new user session Success]');
    res.status(201).json(result);
    return;
  } catch (err) {
    if (err.message.indexOf('Not Found') !== -1) {
      res.status(401).json({ error: 'Password or Username incorrect!!' });
    } else {
      res.status(404).json({ error: err.message });
    }
    console.log('[Login -- Authenticating and creating new user session Failed]');
  }
};

const clearSessions = async (req, res) => {
  console.log('[Logout -- Deleting all user session]');
  try {
    const result = await loginSvc.clearSessions();
    console.log('[Logout -- Deleting all user sessions Success]');
    res.status(201).json(result);
    return;
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log('[Login -- Deleting all user sessions Failed]');
  }
};

const deleteSessionById = async (req, res) => {
  console.log('[Logout -- Deleting session]');
  try {
    await loginSvc.deleteSessionById(req.params.id);
    console.log('[Logout -- Deleting session Success]');
    res.status(200).json({
      message: 'delete success!',
    });
    return;
  } catch (err) {
    console.log('[Logout -- Deleting session Failed]');
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  authAndSession,
  deleteSessionById,
  clearSessions,
};
