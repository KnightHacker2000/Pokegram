const loginSvc = require('../services/loginService');


const newSession = async (req, res) => {
  console.log('[Login -- Creating new login session]');
  try {
    // check if username is provided
    if (!req.body.id) {
      console.log('[Login -- Creating new token Failed: invalid body -- missing username]');
      res.status(404).json({ error: 'missing required username field!' });
      res.end();
    }

    // check if password is provided
    if (!req.body.password) {
      console.log('[Login -- Creating new login session Failed: invalid body -- missing password]');
      res.status(404).json({ error: 'missing required password field!' });
      res.end();
    }
    if (await loginSvc.checkPassword(req.body.id, req.body.password)) {
      // sign jwt token send to frontend
      const token = await loginSvc.createNewSession(req.body.id);
      console.log('[Login -- Creating new token Success]');
      res.status(201).json(token);
    } else {
      console.log('[Login -- Creating new login session Failed: failed authentication]');
      res.status(404).json({ error: 'failed authentication' });
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err.message });
    console.log('[Login -- Creating new token Failed]');
  }
};

// const clearSessions = async (req, res) => {
//   console.log('[Logout -- Deleting all user session]');
//   try {
//     const result = await loginSvc.clearSessions();
//     console.log('[Logout -- Deleting all user sessions Success]');
//     res.status(201).json(result);
//     return;
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//     console.log('[Login -- Deleting all user sessions Failed]');
//   }
// };

// const deleteSessionById = async (req, res) => {
//   console.log('[Logout -- Deleting session]');
//   try {
//     await loginSvc.deleteSessionById(req.params.id);
//     console.log('[Logout -- Deleting session Success]');
//     res.status(200).json({
//       message: 'delete success!',
//     });
//     return;
//   } catch (err) {
//     console.log('[Logout -- Deleting session Failed]');
//     res.status(404).json({ error: err.message });
//   }
// };

module.exports = {
  newSession,
};
