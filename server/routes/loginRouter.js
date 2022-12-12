const { Router } = require('express');

const loginRouter = Router();
const loginController = require('../controllers/loginController');

loginRouter.post('/', loginController.newSession);

module.exports = loginRouter;
