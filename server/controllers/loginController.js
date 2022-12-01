const loginSvc = require('../services/loginService');

const createNewSession = async (req, res) => {
  console.log('[Login -- Creating new user session]');
  try {
    const result = await loginSvc.createNewSession();
    console.log('[Login -- Creating new user session Success]');
    res.status(201).json(result);
    return;
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log('[Login -- Creating new user session Failed]');
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
  createNewSession,
  deleteSessionById,
  clearSessions,
};
