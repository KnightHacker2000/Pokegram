const usrSvc = require('../services/userService');
const loginSvc = require('../services/loginService');

const createNewUser = async (req, res) => {
  console.log('[User -- Registration/Creating new user]');
  if (
    !req.body.id
    || !req.body.email
    || !req.body.fullname
    || !req.body.password) {
    console.log('[User -- Creating new user Failed: invalid body -- missing fields]');
    res.status(404).json({ error: 'missing required user field!' });
    return;
  }

  // create new user object
  const newUser = {
    _id: req.body.id,
    email: req.body.email,
    avatar: 'avatar' in req.body
      ? req.body.avatar : '',
    follows: [],
    numFollows: 0,
    subscribers: [],
    numSubs: 0,
    fullname: req.body.fullname,
    likedPosts: [],
    numPosts: 0,
    blacklists: []
  };

  try {
    const result = await usrSvc.createNewUser(
      newUser,
      { _id: req.body.id, pass: req.body.password },
    );
    console.log('[User -- Creating new User Success]');
    console.log(`id: ${JSON.stringify(result)}`);
    const token = await loginSvc.createNewSession(req.body.id);
    
    res.status(201).json({
      user: newUser,
      token
    });
  } catch (err) {
    if (err.message.indexOf('11000') !== -1) {
      res.status(409).json({ error: `A user already exists with username '${req.body.id}'` });
    } else {
      res.status(404).json({ error: err.message });
    }
    console.log('[User -- Creating new User Failed]');
  }
};

const updateUserById = async (req, res) => {
  console.log('[User -- Updating user]');
  try {
    const result = await usrSvc.updateUserById(req.params.uid, req.body);
    console.log('[User -- Updating user Success]');
    console.log(result);
    res.status(201).json({
      activity: result,
    });
    return;
  } catch (err) {
    console.log('[User -- Updating user Failed]');
    res.status(404).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    if (req.params.uid === undefined) {
      res.status(404).json({ error: 'user id missing' });
      return;
    }

    const result = await usrSvc.getUserById(req.params.uid);
    if (result === undefined) {
      console.log('[User -- Getting user Failed]');
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    console.log('[User -- Getting user Success]');
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[User -- Getting user Failed]');
    res.status(404).json({ error: err.message });
  }
};

const getFoSug = async (req, res) => {
  try {
    if (req.params.uid === undefined) {
      res.status(404).json({ error: 'user id missing' });
      return;
    }

    const result = await usrSvc.getFoSug(req.params.uid);
    if (result === undefined) {
      console.log('[User -- Getting follow suggestions]');
      res.status(404).json({ error: 'bad user id' });
      return;
    }
    console.log('[User -- Getting follow suggestions Success]');
    console.log(result);
    res.status(200).json({ data: result });
    return;
  } catch (err) {
    console.log('[User -- Getting user Failed]');
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createNewUser,
  updateUserById,
  getUserById,
  getFoSug
};
