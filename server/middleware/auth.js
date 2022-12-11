const loginSvc = require('../services/loginService')

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  const ret = await loginSvc.authenticate(token);
  if (!ret) {
    res.status(401).json({ error: 'failed authentication' });
    res.end();
  } else {
    next();
  }
}

module.exports = auth;
